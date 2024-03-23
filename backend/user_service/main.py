import requests as requestsLib
from pymongo import MongoClient
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import uuid
from bson.json_util import dumps, loads

client = MongoClient('mongodb://127.0.0.1:27017/')  # Connect to your MongoDB

app = Flask(__name__)
cors = CORS(app)
PORT = 5003
app.config["CORS_HEADERS"] = "Content-Type"
app.config["DEBUG"] = True  # Restart on changes
app.config["PORT"] = PORT

db_name = "test_db"
db = client[db_name]
prescriber_collection = db["prescribers"]
user_collection = db["users"]


# !!! TEMPORARY: Migrate to Auth Service or rename Auth Service to User Service.



@app.route("/api/save-prescriber-codes", methods=["POST"])
@cross_origin()
def save_prescriber_codes():
    data = request.json
    codes = data.get("codes")

    if not codes:
        return {"error": "Missing required fields"}, 400, {"Content-Type": "application/json"}
    
    skipped = 0
    for code in codes: 
        # Check prescriber code exists
        if prescriber_collection["unassigned"].find_one({"code": code}): 
            print("Prescriber code already exists")
            skipped += 1
            continue

        # Check if prescriber already registered by key
        if prescriber_collection.find_one({"code": code}):
            print("Prescriber already registered")
            skipped += 1
            continue

        prescriber_collection["unassigned"].insert_one({"code": code})

    return {"message": f"Skipped {skipped} out of {len(codes)}"}, 200, {"Content-Type": "application/json"}

@app.route("/api/unassigned-prescriber-codes", methods=["GET"])
@cross_origin()
def get_unnasigned_prescriber_codes():
    # Get all or specific
    data = request.args
    codes = ["None"]
    if data.get("code"):
        code = data.get("code")
        codes = prescriber_collection["unassigned"].find_one({"code": code})
    else:
        codes = prescriber_collection["unassigned"].find()

    return {"codes": [c["code"] for c in codes]}, 200, {"Content-Type": "application/json"}

@app.route("/api/prescriber-codes", methods=["GET"])
@cross_origin()
def get_prescriber_codes():
    # Get all or specific
    data = request.args
    codes = ["None"]
    if data.get("code"):
        code = data.get("code")
        codes = prescriber_collection.find_one({"code": code})
    else:
        codes = prescriber_collection.find()

    return {"codes":  dumps(codes)}, 200, {"Content-Type": "application/json"}

@app.route("/api/register-prescriber", methods=["POST"])
@cross_origin()
def register_prescriber():
    data = request.json
    code = data.get("code")
    province = data.get("province")
    status = data.get("status")
    licensing_college = data.get("licensing_college")
    license_number = data.get("license_number")
    disabled = False

    query = {"code": code, "status": status, "province": province, "licensing_college": licensing_college, "license_number": license_number, "disabled": disabled}
    if not code or not province or not status or not licensing_college or not license_number:
        return {"error": "Missing required fields"}, 400, {"Content-Type": "application/json"}
    
    # Check if prescriber already registered by key
    if not prescriber_collection["unassigned"].find_one({"code": code}):
        return {"error": "Could not find open prescriber code: " + str(code)}, 400, {"Content-Type": "application/json"}
    
    prescriber_collection.insert_one(query)

    return {"message": "Prescriber registered"}, 200, {"Content-Type": "application/json"}

@app.route("/api/user", methods=["POST"])
@cross_origin()
def register_user():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    role = data.get("role")

    query = {username, password, email, role}
    if not username or not password or not email or not role:
        return {"error": "Missing required fields"}, 400, {"Content-Type": "application/json"}
    
    # Check if user already registered by key
    if user_collection.find_one({username: username}):
        return {"error": "User already registered"}, 400, {"Content-Type": "application/json"}
    
    user_collection.insert_one({username: query})

    return {"message": "User registered"}, 200, {"Content-Type": "application/json"}

@app.route("/api/user", methods=["GET"])
@cross_origin()
def get_user():
    data = request.args
    username = data.get("username")
    user = []
    if not username:
        user = user_collection.find()
    else:
        user = user_collection.find_one({"username": username})

    return {"user": dumps(user)}, 200, {"Content-Type": "application/json"}


@app.route("/health")
@cross_origin()
def health_check(): # ? API Gateway health check
    return {"message": "OK"}, 200, {"Content-Type": "application/json"}

#############################################
# Prescriptions

# @app.route("/api/getPrescriptions/<username>", methods=["GET"])
# @cross_origin()
# def getPrescriptions(username):
#   prescriptions = database.getAllPrescriptions(username)
#   return prescriptions

##############################################

def register_service(service_name, service_url):
    print(f"Sending register request | {service_name} at {service_url}")
    return requestsLib.post("http://localhost:3130/service-registry/register", json={"serviceName": service_name, "serviceUrl": service_url})



print("Starting User Service on port", app.config["PORT"])
register_service("user-service", f"http://127.0.0.1:{app.config['PORT']}")

if __name__ == "__main__":
    app.run(port=PORT, debug=True)
