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



if __name__ == "__main__":
    app.run(port=PORT, debug=True)
