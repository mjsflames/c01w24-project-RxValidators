import time
import requests
import argparse

server = "localhost:5000"


upload_url = f"http://{server}/api/upload"
status_url = f"http://{server}/api/status/"
download_url = f"http://{server}/api/download/"

parser = argparse.ArgumentParser(description="RxValidator CLI")
parser.add_argument("--file", "-f", help="Path to the file to be uploaded")
args = parser.parse_args()

file_path = args.file

print(f"Uploading file: {file_path}")
print(f"Upload URL: {upload_url}")

# Upload the file
files = {'file': open(file_path, 'rb')}
response = requests.post(upload_url, files=files)
response_data = response.json()
id = response_data["id"]
print(f"File uploaded, id: {id}")

# Wait every three seconds
status = None

while True:
    # Check status
    print(f"Checking status for id: {id}")
    response = requests.get(status_url + id)
    response_data = response.json()
    status = response_data["status"]
    print(f"Status: {status}")
    if status == "completed":
        break
    else:
        time.sleep(3)

# Download
if status == "completed":
    print(f"Downloading result for id: {id}")
    response = requests.get(download_url + id)
    response_data = response.json()
    print(response_data)
else:
    print("File not processed yet")
