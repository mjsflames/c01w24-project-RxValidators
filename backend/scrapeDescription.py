import requests
from bs4 import BeautifulSoup
from flask import Flask, request
from flask_cors import CORS, cross_origin
import requests as requestsLib

PORT = 5002
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["DEBUG"] = True
app.config['PORT'] = PORT

@app.route('/call-python-function')
@cross_origin()
def call_python_function():
    websiteURL = request.args.get('websiteURL')  # Get websiteURL from query parameters
    print(websiteURL)
    if not websiteURL:
        return {"error": "Website URL not provided"}, 400
    
    response = requests.get(websiteURL)

    soup = BeautifulSoup(response.content, "html.parser")
    paragraph = soup.find("p", class_="readmore")

    if paragraph: text = paragraph.get_text()
    else: text = "No description found, but you can visit this website for more information:"
        
    return {"text": text}, 200, {"Content-Type": "application/json"}

def register_service(service_name, service_url):
    print(f"Sending register request | {service_name} at {service_url}")
    return requestsLib.post("http://localhost:3130/service-registry/register", json={"serviceName": service_name, "serviceUrl": service_url})

print("Starting Green Resources Service on port", app.config["PORT"])
register_service("green-res-service", f"http://127.0.0.1:{app.config['PORT']}")

if __name__ == '__main__':
    app.run(debug=True, port=PORT) #Tested manually using Postman
