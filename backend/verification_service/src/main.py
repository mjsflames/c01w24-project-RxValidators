from flask import Flask, request
from flask_cors import CORS, cross_origin
import uuid

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["DEBUG"] = True # Restart on changes

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
    data = request.form
    file_data = request.files
    if not file_data:
        return {"message": "No file uploaded"}, 400, {"Content-Type": "application/json"}

    file_data = file_data["file"]

    id = generate_id()
    requests[id] = {'file': file_data, 'status': 'pending', 'result': None}

    return {"id": id}, 200, {"Content-Type": "application/json"}

@app.route("/api/status/<id>", methods=["GET"])
@cross_origin()
def status(id):
    # id = request.args.get("id")
    if id not in requests:
        return {"message": "No such request"}, 400, {"Content-Type": "application/json"}
    
    status = requests[id]['status']
    
    # Temporarily shift status' on call
    if requests[id]['status'] == 'pending':
        requests[id]['status'] = 'processing'
    elif requests[id]['status'] == 'processing':
       requests[id]['status'] = 'done'

    return {"status": status}, 200, {"Content-Type": "application/json"}