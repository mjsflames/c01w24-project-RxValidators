#!bin/env/bash

python3 -m venv .venv/
source .venv/bin/activate
pip install flask_cors
flask --app ./src/main run
