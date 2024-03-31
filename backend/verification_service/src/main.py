import requests as requestsLib
from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin
import uuid
from . import scraper_handler
import threading
from pandas import DataFrame
# from prescriber_code import *
from io import StringIO, BytesIO
from multiprocessing import Process

from .code_pdf_server import *

app = Flask(__name__)
cors = CORS(app)
PORT = 5000

app.config["DEBUG"] = True  # Restart on changes
app.config["PORT"] = PORT
processing = {}
# https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request


def generate_id():
    return str(uuid.uuid4())


@app.route("/api/upload", methods=["POST"])
@cross_origin()
def verify():
    print(request.data)
    print(request.files)
    print(request.form)
    print(request.headers)
    file_data = request.files
    if not file_data:
        return {"message": "No file uploaded"}, 400, {"Content-Type": "application/json"}

    file_data = file_data["file"]

    id = generate_id()
    processing[id] = {'file': file_data, 'status': 'pending', 'result': None}

    thread = threading.Thread(
        target=scraper_handler.handle, args=(file_data.read(), id),
        daemon=True)
    thread.start()


    return {"id": id}, 200, {"Content-Type": "application/json"}


@app.route("/api/status/<id>", methods=["GET"])
@cross_origin()
def status(id):
    if id not in processing:
        return {"message": "No such request"}, 400, {"Content-Type": "application/json"}

    status = scraper_handler.check_status(id)

    # Temporary quick-fix for updating state to completed
    if type(status) is DataFrame:
        processing[id]['status'] = "completed"
        processing[id]['result'] = status
        status = "completed"

    return {"status": status}, 200, {"Content-Type": "application/json"}


@app.route("/api/download/<id>", methods=["GET"])
@cross_origin()
def download(id):
    if id not in processing:
        return {"message": "No such request"}, 400, {"Content-Type": "application/json"}
    if processing[id]['status'] != "completed":
        return {"message": "Request not completed yet"}, 400, {"Content-Type": "application/json"}
    result_data = processing[id]['result']
    del processing[id]
    return result_data.to_json(index=False, orient="records"), 200, {"Content-Type": "text/csv"}

@app.route("/api/cancel/<id>", methods=["POST"])
@cross_origin()
def cancel(id):
    if id not in processing:
        return {"message": "No such request"}, 400, {"Content-Type": "application/json"}
    if processing[id]['status'] == "completed":
        return {"message": "Request already completed"}, 400, {"Content-Type": "application/json"}
    try:
        # Close it in the scraper_handler
        scraper_handler.close_request(id)

        del processing[id]
        return {"message": "Request cancelled"}, 200, {"Content-Type": "application/json"}
    except Exception as e:
        print(e)
        return {"message": "Error cancelling request"}, 400, {"Content-Type": "application/json"}
    
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

@app.route('/api/generatePdf', methods=['POST'])
def generate_pdf():
    code = request.json.get('code')
    # output_path = request.json.get('output_path')
    output_path = "./"    

    if not code or not output_path:
        return jsonify({'error': 'Invalid code or output path'}), 400

    page = create_pdf(code, output_path)
    # Get page buffer
    pdf = page.getpdfdata()

    return pdf, 200, {"Content-Type": "application/pdf"}

# API endpoint to export/save all PDFs for the verified prescribers
# ? DISABLED: This is not needed for the current implementation

# @app.route('/api/exportPdfs/<id>', methods=['POST'])
# def generateAllPdfs(id):
#     full_columns = ["First Name", "Last Name", "Province", "Regulatory College", "License #", "Status", "Code"]
#     expected_data = [
#                 ["Emily","Ho","ON","Toronto Uni","232","VERIFIED", "ON-EH001"],
#                 ["Morgan","Lao","BC","British Columbia Uni","23123","INACTIVE", "BABAB"],
#                 ["Lance","Talban","SK","Saskatchewan Uni","12323","VERIFIED", "SK-LT001"],
#             ] 
#     df = pd.DataFrame(expected_data, columns=full_columns)
            
    
#     # status = scraper_handler.check_status(id)
#     # if type(status) is not DataFrame:
#     #     return {"message": "Invalid data or columns"}, 400, {"Content-Type": "application/json"}
#     status = df
#     response = generate_verified_pdfs(status, "./")
    
#     # return buffer from response
#     return response, 200, {"Content-Type": "application/zip"}    

# API endpoint to export the csv file with the new data
@app.route('/api/export/<id>', methods=['GET'])
def export_file(id):
    # file = request.json.get('file')
    file_type = request.args.get('file_type') or 'csv'
    if file_type not in ['csv', 'xlsx']:
        return {"message": "Invalid file type. Please specify 'csv' or 'xlsx'."}, 400, {"Content-Type": "application/json"}

    # call the function generate_verified_pdfs(df, output_path) to generate the PDFs
    # print(generate_verified_pdfs(df, ""))
    status = scraper_handler.check_status(id)
    if type(status) is not DataFrame:
        return {"message": "Invalid data or columns"}, 400, {"Content-Type": "application/json"}
    # Set content_type to a default value
    buffer = StringIO()
    if file_type == 'csv':
        new_data_to_csv(buffer, status)
        content_type = "text/csv"
    else:
        buffer = BytesIO()
        new_data_to_xlsx(buffer, status)
        content_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    
    buffer.seek(0)
    result = status.to_dict(orient='records') 
    return buffer.read(), 200, {"Content-Type": content_type}

# Retrieve the prescriber codes
@app.route('/api/prescriber-codes', methods=['GET'])
def get_prescriber_codes():
    codes = get_prescriber_codes_from_db()
    # Keep only code and status
    return_data = [] 
    for code in list(codes):
        return_data.append({str(k): str(v) for k, v in code.items() if k in ["code", "status", "firstName", "lastName", "_id"]})
    return jsonify(return_data)

@app.route('/api/prescriber-codes/active/<code>', methods=['GET'])
def get_prescriber_code(code):
    license = request.args.get('license')
    # status = request.args.get('status')
    if not license or not code: return jsonify({'error': 'Invalid license or code'}), 400
    
    query = {"code": str(code), "license": str(license), "status": "VERIFIED", "unassigned": True}
    # if status: query["status"] = str(status)

    code = get_prescriber_codes_from_db(query)
    # Get num responses
    count = len(list(code.clone()))
    if not code or count == 0: return jsonify({'error': 'Code not found'}), 404

    code = {str(k): str(v) for k, v in code[0].items()}
    code.pop("_id")
    return jsonify(code)

@app.route("/api/prescriber-codes/<code>", methods=["POST"])
def update_prescriber_code(code):
    status = request.json.get('status')
    if not status:
        return jsonify({'error': 'Invalid status'}), 400

    num_updates = update_prescriber_code_status(code, status)
    return jsonify({'message': 'Updated status', 'count': str(num_updates.modified_count)}), 200

@app.route("/api/prescriber-codes/<id>", methods=["DELETE"])
def delete_prescriber_code(id):
    num_deletes = delete_prescriber_code_inner(id)
    return jsonify({'message': 'Deleted code', 'count': str(num_deletes.deleted_count)}), 200

def register_service(service_name, service_url):
    print(f"Sending register request | {service_name} at {service_url}")
    return requestsLib.post("http://localhost:3130/service-registry/register", json={"serviceName": service_name, "serviceUrl": service_url})



print("Starting Verification Service on port", app.config["PORT"])
register_service("verification-service", f"http://127.0.0.1:{app.config['PORT']}")


app.run(port=PORT, debug=True)
