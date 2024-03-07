from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import uuid
import scraper_handler
import threading
from pandas import DataFrame
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["DEBUG"] = True  # Restart on changes
PORT = 5000
requests = {

}
# https://stackoverflow.com/questions/10434599/get-the-data-received-in-a-flask-request


def generate_id():
    return str(uuid.uuid4())


@app.route("/")
def hello_world():
    return "<p>Verification Service Running</p>"


@app.route("/api/upload", methods=["POST"])
@cross_origin()
def verify():
    file_data = request.files
    if not file_data:
        return {"message": "No file uploaded"}, 400, {"Content-Type": "application/json"}

    file_data = file_data["file"]

    id = generate_id()
    requests[id] = {'file': file_data, 'status': 'pending', 'result': None}

    thread = threading.Thread(
        target=scraper_handler.handle, args=(file_data.read(), id))
    thread.start()

    return {"id": id}, 200, {"Content-Type": "application/json"}


@app.route("/api/status/<id>", methods=["GET"])
@cross_origin()
def status(id):
    # id = request.args.get("id")
    if id not in requests:
        return {"message": "No such request"}, 400, {"Content-Type": "application/json"}

    status = scraper_handler.check_status(id)
    # Temporary quick-fix for updating state to completed
    if type(status) is DataFrame:
        requests[id]['status'] = "completed"
        requests[id]['result'] = status
        status = "completed"

    return {"status": status}, 200, {"Content-Type": "application/json"}


@app.route("/api/download/<id>", methods=["GET"])
@cross_origin()
def download(id):
    if id not in requests:
        return {"message": "No such request"}, 400, {"Content-Type": "application/json"}
    if requests[id]['status'] != "completed":
        return {"message": "Request not completed yet"}, 400, {"Content-Type": "application/json"}
    result_data = requests[id]['result']
    del requests[id]
    return result_data.to_json(index=False, orient="records"), 200, {"Content-Type": "text/csv"}


if __name__ == "__main__":
    app.run(port=PORT, debug=True)
