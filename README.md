# c01w24-project-RxValidators
***By: Emily Ho, Lance Talban, Michelle Zhu, Danny Yang, Renat Hossain, Xing Yu Zhou, Kangjie Wu***



# Launch the Program

**Supported for Linux and Win32.**

Download all the dependencies for all projects in the monorepo by running the following at root folder: `npm i`

To launch the Frontend, API Gateway, and Microservices in development mode: `npm run dev`


# API Gateway | Service Registry

(Assuming API Gateway is located at **localhost:3130**)

On microservice startup:

```
POST http://localhost:3130/service-registry/register
DATA: {serviceName, serviceUrl}
```

Each microservice must have:

```
GET {SERVICE_URL}/service/health
RESPONSE 200 OK
```

# Verification Service

If errors occur, either you are running OS specific lines or you are not running the lines within the `verification_service` directory

**NOTE**: The verification service is unstable when running on a Windows operating system. Unexpected behaviour occurs since Scrapy (and consequently scrapyscript) relies on sending/receiving signals to handle tasks such as reading the data through the pipeline. We setup verification service API using Flask. Since Flask is a synchronous framework, we needed to run the scraping-related code in a separate thread in order for the API to return a response while it is processing the job. In Windows, Python is unable to send signals outside of the main thread: "*signal only works in main thread*". In turn, scrapy will successfully scrape the data but is unable to send a signal for the program to read the pipeline, resulting in multiple failures. With a limited time frame, we attempted to resolve the multiprocessing issue by using the FastAPI asynchronous framework and have scraping running as a background task — it was unsuccessful. However, in Linux, multiprocessing is handled through forking which allows the signals to be fired successfully. When deployed, this service would be running in a Linux OS and would hence mitigate this problem.

### Automatic

Run the following, it prepares a virtual environment, installs dependencies, and then starts the Flask server on `localhost:5000`:

For Linux/MacOS:
`bash setup_verification_service_env.sh`

For Windows:
You must manually run Flask on elevated permissions, I could not

1. `.\setup_verification_service_env.bat`
2. `flask --app ./src/main run` (\*)

(\*) Run this in elevated permissions, I found most success using Administrator: Windows Powershell.

After initial setup, you can use the arg: `--skip-dependencies` to stop checking for dependency updates.
e.g `.\setup_verification_service_env.bat --skip-dependencies`

### Manual Setup (non-venv)

Ensure the following dependencies are installed:

    pip install flask
    pip install flask_cors
    pip install pandas
    pip install tqdm
    pip install scrapy
    pip install selenium
    pip install bs4
    pip install asyncio
    pip install scrapyscript

Then run:
`flask --app ./src/main run`

# Run the Example

A quick demonstration can be found as `test/cli_runner.py` (Ensure that the Flask server is operational, see above.)

Run the following:
`python test/cli_runner.py -f test/DATA.csv`

The program will perform the following:

1. Send a request to the Flask server with the file given in the argument.
2. Every three seconds, ask the server for a status.
3. When the server returns a completed status, we request to download the dataframe in JSON format.

# Run with Frontend

Go into the `frontend` folder and run the following:
(Only once) to install the dependencies
`npm i`

Then run: `npm run dev`

# Physician Verification Process

It utilizes web scraping techniques to gather information from official websites of medical boards and verify the licensing status of physicians. Currently, it supports the following websites:

-   [College of Physicians and Surgeons of British Columbia](https://www.cpsbc.ca/public/registrant-directory)
-   [College of Physicians and Surgeons of Ontario](https://doctors.cpso.on.ca/?search=general)
-   [College of Physicians and Surgeons of Saskatchewan](https://www.cps.sk.ca/imis)
-   [College of Physicians and Surgeons of Manitoba](https://member.cpsm.mb.ca/member/profilesearch)
-   [College of Physicians & Surgeons of Prince Edward Island](https://cpspei.alinityapp.com/client/publicdirectory)
-   [College of Physicians and Surgeons of Alberta](https://search.cpsa.ca/)
-   [College of Physicians and Surgeons of New Brunswick](https://cpsnb.alinityapp.com/Client/PublicDirectory)
-   [College of Physicians and Surgeons of Newfoundland and Labrador](https://cpsnl.ca/physician-search/)
-   [College of Physicians and Surgeons of Nova Scotia](https://cpsnsphysiciansearch.azurewebsites.net/)
-   [Collège des médecins du Québec](https://www.cmq.org/en/directory)

## Setup Instructions

Follow these steps to set up the environment and test the webscrapers:

### 1. Python Virtual Environment
Install pip and the virtual environment first with

```install python-pip```
```pip install virtualenv```

-   Create a Python virtual environment named 'venv':

```bash/Windows
python -m venv venv
```

-   Activate the virtual environment (On Linux/macOS):

```bash
source venv/bin/activate
```
-   Activate the virtual environment (On Windows):

```Windows
venv\Scripts\activate
```

### 2. Install Required Packages

-   Install the necessary packages using pip:

```bash
pip install pytest pandas scrapy scrapyscript beautifulsoup4 selenium
```

### 3. Testing the physician verification process

-   To test only edge cases:

```bash
pytest tests/test_scrapers.py
```

-   To test the entire dataset:

```bash
pytest tests/test_scrapers_on_dataset.py
```
