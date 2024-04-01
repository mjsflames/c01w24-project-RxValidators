from flask import Flask, request, jsonify, abort, make_response
from bson.json_util import dumps, loads
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import requests as requestsLib
import uuid
import bcrypt
from bson.objectid import ObjectId


server_IP = "127.0.0.1:27017"
client = MongoClient(f"mongodb://{server_IP}")
db_name = "test_db"
collection_name = "authentication"
db = client[db_name]
collection = db[collection_name]

PORT = 5005
app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["DEBUG"] = True
app.config["PORT"] = PORT

required_authentication_fields = [
    "username",
    "password",
    # "role",
]

prescribers_collection = db["prescribers"]

connections = []

# https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request

# Routes
# /register - POST (username, password, role)
# /login - GET (username, password, role)
# /logout - GET (username, password)


def generate_id():
    return str(uuid.uuid4())


def user_exists(username):
    return collection.count_documents({"username": username}) > 0


def validate_inputs(func):
    def wrapper(*args, **kwargs):
        data = request.json
        if not all(field in data for field in required_authentication_fields):
            missing_fields = [
                field for field in required_authentication_fields if field not in data
            ]
            return (
                jsonify(
                    {"error": "Missing required fields", "missing": missing_fields}
                ),
                400,
            )
        return func(*args, **kwargs)

    wrapper.__name__ = func.__name__  # HOTFIX: Map overwriting fix
    return wrapper


@app.route("/register", methods=["POST"])
@cross_origin()
@validate_inputs
def create_user_account():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        role = data.get("role")

        # Additional Fields
        # print(data)

        # Encrypting Password
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode(), salt)

        data["password"] = hashed_password

        if user_exists(username) != 0:
            return (
                jsonify({"error": f"A user with username:{username} already exists"}),
                409,
            )

        collection.insert_one(data)
        if role == "admin":
            db.command(
                "createUser",
                username,
                pwd=password,
                roles=[
                    {"role": "userAdminAnyDatabase", "db": "admin"},
                    {"role": "readWriteAnyDatabase", "db": "admin"},
                ],
            )
        elif role == "prescriber":
            db.command(
                "createUser",
                str(username),
                pwd=str(password),
                roles=[{"role": "readWrite", "db": "test_db"}],
            )
            # Remove prescriber from prescribers collection
            prescribers_collection.delete_one(
                {"code": username, "unassigned": True, "status": "VERIFIED"}
            )
        elif role == "patient":
            db.command(
                "createUser",
                str(username),
                pwd=str(password),
                roles=[{"role": "read", "db": "test_db"}],
            )
        else:
            return (
                jsonify(
                    {
                        "error": f"Invalid role:{role} is neither admin, prescriber, or patient"
                    }
                ),
                400,
            )
        return jsonify({"message": f"{role} created and registered successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def test_database_operation(collection):
    collection.find_one()


@app.route("/login", methods=["POST"])
@validate_inputs
@cross_origin()
def authenticate_user():
    try:
        data = request.json

        username = data.get("username")
        password = data.get("password")
        # role = data.get("role")
        # user = collection.find_one({"username": username, "role": role})
        # username should be unique.
        user = collection.find_one({"username": username})
        if not user:
            return (
                jsonify(
                    {
                        "message": f" User: {username} with role: {user['role']} does not exist"
                    }
                ),
                404,
            )

        if not bcrypt.hashpw(password.encode(), user["password"]) == user["password"]:
            return jsonify({"message": f"Unauthorized: password incorrect"}), 401

        cur_db_name = "test_db"
        cur_collection_name = "prescription"
        cur_client = MongoClient(
            server_IP,
            username=username,
            password=password,
            authSource=cur_db_name,
            authMechanism="SCRAM-SHA-256",
        )
        # cur_client = MongoClient(f"mongodb://{username}:{password}@{server_IP}/{db_name}")
        cur_db = cur_client[cur_db_name]
        cur_collection = cur_db[cur_collection_name]
        test_database_operation(cur_collection)
        connections.append(cur_client)
        # print(">>USER", user)

        # Strip password
        user.pop("password")
        # Stringify id
        user["_id"] = str(user["_id"])

        # Store token as cookie
        token = generate_id()
        res = make_response(
            jsonify({"message": "Authentication Success", "data": dumps(user)}), 200
        )
        res.set_cookie("rxa-token", token)
        return res

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/logout", methods=["GET"])
@cross_origin()
def close_client_connection(mongoClient):
    try:
        mongoClient.close()
        connections.remove(mongoClient)
        res = make_response(jsonify({"message": "Logout Success"}), 200)
        res.set_cookie("rxa-token", "", expires=0)
        return res

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/getUserID/<username>", methods=["GET"])
@cross_origin()
def getPatientPrescriptions(username):

    try:
        user = collection.find_one({"email": username})

        return user, 200, {"Content-Type": "application/json"}

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/listUsers", methods=["GET"])
@cross_origin()
def list_all_users():
    # This function should only be accessible by admins
    try:
        all_users = collection.find({})

        user_list = list(all_users)
        users_json = dumps(user_list)

        return users_json, 200, {"Content-Type": "application/json"}

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/listPatients", methods=["GET"])
@cross_origin()
def list_patients():
    # This function should only be accessible by admins
    try:
        all_users = collection.find({"role": "patient"})

        user_list = list(all_users)
        for user in user_list:
            user["_id"] = str(user["_id"])
        users_json = dumps(user_list)

        return users_json, 200, {"Content-Type": "application/json"}

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/listPrescribers", methods=["GET"])
@cross_origin()
def list_prescribers():
    # This function should only be accessible by admins
    try:
        all_users = collection.find({"role": "prescriber"})

        user_list = list(all_users)
        for user in user_list:
            user["_id"] = str(user["_id"])
        users_json = dumps(user_list)

        return users_json, 200, {"Content-Type": "application/json"}

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def get_role(username):
    if not user_exists(username):
        return ""
    user = collection.find_one({"username": username})
    return user["role"]


@app.route("/updateUser/<string:oid>", methods=["PATCH"])
@cross_origin()
def update_user(oid):
    try:
        data = request.get_json()
        if "_id" in data:
            del data["_id"]

        update_query = {"$set": data}
        print(data)

        result = collection.update_one({"_id": ObjectId(oid)}, update_query)


        if result.modified_count > 0:
            return jsonify({"message": "User updated successfully"}), 200
        else:
            return jsonify({"message": "No user found"}), 404

    except Exception as e:
        return jsonify({"error": e}), 500


@app.route("/removeUser/<username>", methods=["DELETE"])
@cross_origin()
def remove_user(username):
    # This function should only be accessible by admins
    try:
        if get_role(username) == "admin":
            return (
                jsonify({"message": "Unauthorized: cannot delete admin accounts"}),
                401,
            )

        result = collection.delete_one({"username": username})

        if result.deleted_count == 0:
            return jsonify({"message": "User does not exist"}), 404

        # This command removes the user from the mongodb user list
        db.command("dropUser", username)

        return jsonify({"message": f"User:{username} deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/health")
@cross_origin()
def health_check():  # ? API Gateway health check
    return {"message": "OK"}, 200, {"Content-Type": "application/json"}


def register_service(service_name, service_url):
    print(f"Sending register request | {service_name} at {service_url}")
    return requestsLib.post(
        "http://localhost:3130/service-registry/register",
        json={"serviceName": service_name, "serviceUrl": service_url},
    )


print("Starting Authentication Service on port", app.config["PORT"])
register_service("authentication-service", f"http://127.0.0.1:{app.config['PORT']}")


if __name__ == "__main__":
    app.run(debug=True, port=PORT)
