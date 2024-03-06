#!bin/env/bash

# Created for Linux/MacOS

python3 -m venv .venv/
source .venv/bin/activate

pip install --upgrade pip

# Install Dependencies
# Check if contains argument "--skip-dependencies"
if [ "$1" == "--skip-dependencies" ]; then
    echo "Skipping dependencies installation"
else
    # pip install -r requirements.txt
    pip install flask
    pip install flask_cors
    pip install pandas
    pip install tqdm
    pip install scrapy
    pip install selenium
    pip install bs4
    pip install asyncio
    pip install scrapyscript
fi


flask --app ./src/main run
