# pylint: disable=all [for testers who installed pylint in their environment]
from flask import Flask, request, jsonify, Response, abort
from bson.json_util import dumps, loads
from bson import ObjectId
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
import requests as requestsLib
import uuid
import copy

app = Flask(__name__)
client = MongoClient("mongodb://127.0.0.1:27017/")  # Connect to your MongoDB
db_name = "test_db"
db = client[db_name]
collection_name = "prescription"  # add a component called prescription
collection = db[collection_name]

PORT = 5001
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
app.config["DEBUG"] = True
app.config["PORT"] = PORT

template_PR = {
    "date": None,
    "patient_initials": None,
    "prescriber_code": None,
    "comments": None,
    "status": None,
    "pdf_link": None,
    "discoveryPass": None,
    "patient_email": None,
    "patient": {
        "date": None,
        "patient_initials": None,
        "prescriber_code": None,
        "discoveryPass": None,
        "patient_email": None,
        "status": None,
    },
    "prescriber": {
        "date": None,
        "patient_initials": None,
        "prescriber_code": None,
        "discoveryPass": None,
        "patient_email": None,
        "status": None,
    },
}

PR_NOT_LOGGED = "Pr not logged yet"
PA_NOT_LOGGED = "Pa not logged yet"
COMPLETE = "Complete"
PR_LOGGED = "Pr Logged"
PA_LOGGED = "Pa Logged"
BOTH_LOGGED = "Both Logged with Discovery Pass"
COMPLETE_WITH_DP = "Complete with Discovery Pass"

# required_PAT_prescription_fields = [
#     "date",
#     "patient_initials",
#     "prescriber_code",
#     "discoveryPass",
#     "user",
# ]
# required_PR_prescription_fields = [
#     "date",
#     "patient_initials",
#     "prescriber_code",
#     "discoveryPass",
#     "user",
# ]


# https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request


def newPR():
    return copy.deepcopy(template_PR)


def generate_id():
    return str(uuid.uuid4())

def getFromCursor(cursor):
    res = []
    for p in cursor:
      p['_id'] = str(p['_id'])
      res.append(p)
    return res

@app.route("/api/getPatientPrescriptions/<username>", methods=["GET"])
@cross_origin()
def getPatientPrescriptions(username):
    prescriptions = collection.find({"patient_email": username})
    return getFromCursor(prescriptions)

@app.route("/api/getPresPrescriptions/<username>", methods=["GET"])
@cross_origin()
def getPresPrescriptions(username):
    prescriptions = collection.find({"prescriber_code": username})
    return getFromCursor(prescriptions)

@app.route("/api/submit-form", methods=["POST"])
def submit_form():

    data = request.json  # Assuming the data is sent as JSON
    print(data)  ###

    def validateFields(data, req_fields):

        filtered_fields = [field for field in req_fields if field != "status"]

        if not all(field in data for field in filtered_fields):
            missing_fields = [field for field in filtered_fields if field not in data]
            print(missing_fields)
            return (
                jsonify(
                    {"error": "Missing required fields", "missing": missing_fields}
                ),
                400,
            )

    if "user" in data and data["user"] == "patient":
        if error := validateFields(data, template_PR["patient"]):
            return error
        if "comments" in data:
            return (jsonify({"error": "patient cant assign comments"}),400,)
    elif "user" in data and data["user"] == "prescriber":
        if error := validateFields(data, template_PR["prescriber"]):
            return error
    else:
        return (
            jsonify({"error": "Missing user type"}),
            403,
        )

    prescription = newPR()

    date = data.get("date")
    prescriber_code = data.get("prescriber_code")
    patient_initials = data.get("patient_initials")
    patient_email = data.get("patient_email")
    discoveryPass = data.get("discoveryPass")
    filter_fields = {"date": date,
                     "prescriber_code": prescriber_code,
                     "patient_initials": patient_initials,
                     "discoveryPass": discoveryPass,
                     "patient_email": patient_email}
    result = collection.find_one(filter_fields)

    for key, value in data.items():
        if key != "user":
            prescription[key] = value
            if key in template_PR[data["user"]]:
                prescription[data["user"]][key] = value

    if result is None:
        if data["user"] == "patient":
            prescription["status"] = PR_NOT_LOGGED
            prescription["patient"]["status"] = PR_NOT_LOGGED
        elif data["user"] == "prescriber":
            prescription["status"] = PA_NOT_LOGGED
            prescription["prescriber"]["status"] = PA_NOT_LOGGED
        collection.insert_one(prescription)
        return (jsonify({"message": "Data posted successfully"}), 200)

    if (result["status"] == PR_NOT_LOGGED and data["user"] == "patient") or (result["status"] == PA_NOT_LOGGED and data["user"] == "prescriber") or result["status"] == BOTH_LOGGED or result["status"] == COMPLETE:
        return (
            jsonify({"error": "Prescription exists"}),
            401,
        )

    for key, value in data.items():
        if key != "user" and key in template_PR[data["user"]]:
            result[data["user"]][key] = value #Append to the Existing Prescription

    if data["discoveryPass"] == "No":
        result["status"] = COMPLETE
        result["prescriber"]["status"] = COMPLETE
        result["patient"]["status"] = COMPLETE

    elif data["discoveryPass"] == "Yes":
        result["status"] = BOTH_LOGGED
        result["prescriber"]["status"] = PA_LOGGED
        result["patient"]["status"] = PR_LOGGED

    else:
        return (
            jsonify({"error": "Invalid Discovery Pass input, please choose Yes/No."}),
            400,
        )

    update = {"$set": result}
    collection.update_one(filter_fields, update)
    return (jsonify({"message": "Data posted successfully"}), 200)


@app.route("/api/list-prescriptions", methods=["GET"])
def list_prescriptions():
    # Fetch all documents in the collection
    prescriptions_cursor = collection.find({})

    # Convert cursor to list and then serialize to JSON string using dumps
    prescriptions_list = list(prescriptions_cursor)
    prescriptions_json = dumps(prescriptions_list)

    # Return the JSON string as a response
    # Flask's jsonify is not used here because dumps already returns a JSON string
    # which includes handling of ObjectId and other BSON types
    return prescriptions_json, 200, {"Content-Type": "application/json"}


@app.route("/api/search-prescriptions", methods=["GET"])
def search_prescriptions():
    data = request.json
    # Extract query parameters
    date = data.get("date")
    prescriber_code = data.get("prescriber_code")

    if not date or not prescriber_code:
        return (
            jsonify({"error": "date and prescriber code both needed to search."}),
            400,
        )

    # Query the database
    results = collection.find_one({"date": date, "prescriber_code": prescriber_code})

    return Response(dumps(results), mimetype="application/json"), 200

# DONT USE IT TO DELETE A PRESCRIPTION
# Updates to status are allowed for status not auto-generated
@app.route("/api/update-prescription/<oid>", methods=["POST"])
def update_prescription(oid):
    data = request.json

    try:
        if "_id" in data:
            del data["_id"]
        update_operation = {"$set": data}
        updated_result = collection.find_one_and_update({"_id": ObjectId(oid)}, update_operation)

        if updated_result:
            return jsonify({"message": "Prescription updated successfully"}), 200

    except Exception as e:
        print("error", e)
        return jsonify({"error": str(e)}), 500

    return jsonify({"message": "An unexpected error occurred"}), 500


@app.route("/api/delete/<oid>", methods=["DELETE"])
def delete_prescription(oid):
    try:
        result = collection.delete_one({"_id": ObjectId(oid)})

        if result.deleted_count == 0:
            # If no documents were deleted, the ObjectId was not found
            abort(404, description="Prescription not found")

        return jsonify({"message": "Prescription deleted successfully"}), 200
    except Exception as e:
        # Handles cases like invalid ObjectId format
        abort(400, description=str(e))


@app.route("/api/deleteAll", methods=["DELETE"])
def delete_all_prescriptions():
    result = collection.delete_many({})  # Empty filter matches all documents

    if result.deleted_count == 0:
        return jsonify({"message": "No prescriptions found to delete"}), 404

    return (
        jsonify(
            {
                "message": "All prescriptions deleted successfully",
                "deleted_count": result.deleted_count,
            }
        ),
        200,
    )


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


print("Starting Prescription Service on port", app.config["PORT"])
register_service("prescription-service", f"http://127.0.0.1:{app.config['PORT']}")

if __name__ == "__main__":
    app.run(debug=True, port=PORT)  # Tested manually using Postman