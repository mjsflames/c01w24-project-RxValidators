import requests
import json

def cmq_spider(last_name, license_no):
    url = "https://www.cmq.org/api/directory"
    payload = json.dumps({
        "language": "en",
        "method": "searchPhysicians",
        "number": license_no,
        "lastname": last_name,
        "firstname": "",
        "city": "",
        "specialtyId": 0,
        "unlisted": False
    })
    headers = {
        'content-type': 'application/json',
        'Cookie': 'undefined'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    data = json.loads(response.text)

    if len(rows) == 0:
        return "NOT FOUND"

    if len(rows) == 1:
        return get_physician_status(data[0]['physicianId'])

    if len(rows) > 1:
        return "NOT FOUND"

    print(physician_data)

def get_physician_status():
    payload = json.dumps({
        "language": "en",
        "method": "getPhysicianDetails",
        "physicianId": physician_id
    })
    response = requests.request("POST", url, headers=headers, data=payload)

    physician_details = json.loads(response.text)
    status = physician_details['status']

    print(status)
