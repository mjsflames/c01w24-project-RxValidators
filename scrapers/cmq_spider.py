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

    if len(data) == 0:
        return "NOT FOUND"

    if len(data) == 1:
        return get_physician_status(url, headers, data[0]['physicianId'])

    if len(data) > 1:
        return "NOT FOUND"

def get_physician_status(url, headers, physician_id):
    payload = json.dumps({
        "language": "en",
        "method": "getPhysicianDetails",
        "physicianId": physician_id
    })
    response = requests.request("POST", url, headers=headers, data=payload)

    physician_details = json.loads(response.text)
    status = physician_details['status'].lower()

    if 'active' in status:
        return "VERIFIED"
    else:
        return "INACTIVE"
