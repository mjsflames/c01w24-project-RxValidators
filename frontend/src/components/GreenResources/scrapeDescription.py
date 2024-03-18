import requests
from bs4 import BeautifulSoup
from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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

    if paragraph:
        text = paragraph.get_text()
    else:
        text = "Paragraph not found."
        
    return {"text": text}, 200, {"Content-Type": "application/json"}

if __name__ == '__main__':
    app.run(debug=True)
