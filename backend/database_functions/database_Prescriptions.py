# pylint: disable=all [for testers who installed pylint in their environment]
from flask import Flask, request, jsonify, Response, abort
import pymongo
import pandas as pd
from bson.json_util import dumps, loads
from bson import ObjectId
from pymongo import MongoClient
import database as dbfunc
from flask_cors import CORS, cross_origin
import requests as requestsLib
import uuid

app = Flask(__name__)
client = MongoClient('mongodb://127.0.0.1:27017/')  # Connect to your MongoDB
db_name = "test_db"
db = client[db_name]
collection_name = "prescription" #add a component called prescription
collection = db[collection_name]

PORT = 5001
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["DEBUG"] = True
app.config['PORT'] = PORT

required_prescription_fields = [
    "date", 
    "patient_initials", 
    "prescriber_code", 
    "comments", 
    "parks_canada_checkbox", 
    "status", 
    "pdf_link"
]



# https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request


def generate_id():
    return str(uuid.uuid4())

@app.route("/api/getPrescriptions/<username>", methods=["GET"])
@cross_origin()
def getPrescriptions(username):
  prescriptions = dbfunc.getAllPrescriptions(username)
  print("sending...")
  print(prescriptions)
  return prescriptions

@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.json  # Assuming the data is sent as JSON

    # Validate the incoming data
    if not all(field in data for field in required_prescription_fields):
        missing_fields = [field for field in required_prescription_fields if field not in data]
        return jsonify({"error": "Missing required fields", "missing": missing_fields}), 400
    
    # Extract the 'date' and 'prescriber_code' from the request data
    date = data.get('date')
    prescriber_code = data.get('prescriber_code')

    # Check if a prescription with the same date and prescriber_code already exists
    existing_prescription = collection.find_one({"date": date, "prescriber_code": prescriber_code})
    if existing_prescription:
        # If a prescription exists, return an error
        return jsonify({"error": "A prescription with the given date and prescriber code already exists"}), 409 
    
    # Validate and process data as needed
    collection.insert_one(data)
    return jsonify({"message": "Data saved successfully"}), 200


@app.route('/list-prescriptions', methods=['GET'])
def list_prescriptions():
    # Fetch all documents in the collection
    prescriptions_cursor = collection.find({})
    
    # Convert cursor to list and then serialize to JSON string using dumps
    prescriptions_list = list(prescriptions_cursor)
    prescriptions_json = dumps(prescriptions_list)
    
    # Return the JSON string as a response
    # Flask's jsonify is not used here because dumps already returns a JSON string
    # which includes handling of ObjectId and other BSON types
    return prescriptions_json, 200, {'Content-Type': 'application/json'}


@app.route('/search-prescriptions', methods=['GET'])
def search_prescriptions():
    data = request.json
    # Extract query parameters
    date = data.get('date')
    prescriber_code = data.get('prescriber_code')
    
    if not date or not prescriber_code:
        return jsonify({"error": "date and prescriber code both needed to search."}), 400
    
    # Query the database
    results = collection.find_one({"date": date, "prescriber_code": prescriber_code})

    return Response(dumps(results), mimetype='application/json'), 200


@app.route('/update-prescription', methods=['POST'])
def update_prescription():
    data = request.json  # Assuming the data is sent as JSON

    # Extract query parameters
    date = data.get('date')
    prescriber_code = data.get('prescriber_code')

    # Ensure the necessary fields are provided
    if not date or not prescriber_code:
        return jsonify({"error": "Missing date or prescriber_code in request"}), 400

    # Check if the fields to be updated are within the allowed fields, excluding 'date' and 'prescriber_code'
    update_fields = set(data.keys()) - {'date', 'prescriber_code'}
    if not update_fields.issubset(required_prescription_fields):
        invalid_fields = update_fields - set(required_prescription_fields)
        return jsonify({"error": "Invalid fields in update request", "invalid_fields": list(invalid_fields)}), 400

    # Build the update operation, excluding 'date' and 'prescriber_code' from the update
    update_data = {k: v for k, v in data.items() if k not in ['date', 'prescriber_code']}
    update_operation = {"$set": update_data}

    try:
        # Perform the update
        result = collection.find_one_and_update(
            {"date": date, "prescriber_code": prescriber_code},  # Query
            update_operation,  # Update
            return_document=True  # Return the updated document
        )

        if result:
            return jsonify({"message": "Prescription updated successfully"}), 200
        else:
            return jsonify({"message": "No prescription found matching the criteria"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/delete/<oid>', methods=['DELETE'])
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


@app.route('/deleteAll', methods=['DELETE'])
def delete_all_prescriptions():
    result = collection.delete_many({})  # Empty filter matches all documents
    
    if result.deleted_count == 0:
        return jsonify({"message": "No prescriptions found to delete"}), 404
    
    return jsonify({"message": "All prescriptions deleted successfully", "deleted_count": result.deleted_count}), 200


def register_service(service_name, service_url):
    print(f"Sending register request | {service_name} at {service_url}")
    return requestsLib.post("http://localhost:3130/service-registry/register", json={"serviceName": service_name, "serviceUrl": service_url})


print("Starting Prescription Service on port", app.config["PORT"])
register_service("prescription-service", f"http://127.0.0.1:{app.config['PORT']}")

if __name__ == '__main__':
    app.run(debug=True, port=PORT) #Tested manually using Postman
