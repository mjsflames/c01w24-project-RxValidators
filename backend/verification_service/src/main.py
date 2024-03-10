from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import uuid
import scraper_handler
import threading
from pandas import DataFrame
import requests

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["DEBUG"] = True  # Restart on changes
PORT = 5000
reqs = {

}
# https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request


def generate_id():
    return str(uuid.uuid4())


@app.route("/")
def hello_world():
    return "<p>Verification Service Running</p>"


@app.route("/*", methods=["POST", "GET", "PUT", "DELETE", "PATCH"])
@cross_origin()
def catch_all():
    return {"message": "No such route"}, 404, {"Content-Type": "application/json"}


@app.route("/api/upload", methods=["POST"])
@cross_origin()
def verify():
    file_data = request.files
    if not file_data:
        return {"message": "No file uploaded"}, 400, {"Content-Type": "application/json"}

    file_data = file_data["file"]

    id = generate_id()
    reqs[id] = {'file': file_data, 'status': 'pending', 'result': None}

    thread = threading.Thread(
        target=scraper_handler.handle, args=(file_data.read(), id))
    thread.start()

    return {"id": id}, 200, {"Content-Type": "application/json"}


@app.route("/api/status/<id>", methods=["GET"])
@cross_origin()
def status(id):
    # id = request.args.get("id")
    if id not in reqs:
        return {"message": "No such request"}, 400, {"Content-Type": "application/json"}

    status = scraper_handler.check_status(id)
    # Temporary quick-fix for updating state to completed
    if type(status) is DataFrame:
        reqs[id]['status'] = "completed"
        reqs[id]['result'] = status
        status = "completed"

    return {"status": status}, 200, {"Content-Type": "application/json"}


@app.route("/api/download/<id>", methods=["GET"])
@cross_origin()
def download(id):
    if id not in reqs:
        return {"message": "No such request"}, 400, {"Content-Type": "application/json"}
    if reqs[id]['status'] != "completed":
        return {"message": "Request not completed yet"}, 400, {"Content-Type": "application/json"}
    result_data = reqs[id]['result']
    del reqs[id]
    return result_data.to_json(index=False, orient="records"), 200, {"Content-Type": "text/csv"}


def register_service(service_name, service_url):
    print(f"Sending register request | {service_name} at {service_url}")
    return requests.post("http://localhost:3130/service-registry/register", json={"serviceName": service_name, "serviceUrl": service_url})


print("Starting Verification Service on port", PORT)
register_service("verification_service", f"http://localhost:{PORT}")
if __name__ == "__main__":
    app.run(port=PORT, debug=True)
