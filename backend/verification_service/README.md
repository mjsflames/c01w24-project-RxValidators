# Verification Service

If errors occur, either you are running OS specific lines or you are not running the lines within the `verification_service` directory

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
