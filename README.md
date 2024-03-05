# c01w24-project-RxValidators

# Physician Verification Process
*By Renat Hossain*

It utilizes web scraping techniques to gather information from official websites of medical boards and verify the licensing status of physicians. Currently, it supports the following websites:

- [College of Physicians and Surgeons of British Columbia](https://www.cpsbc.ca/public/registrant-directory)
- [College of Physicians and Surgeons of Ontario](https://doctors.cpso.on.ca/?search=general)
- [College of Physicians and Surgeons of Saskatchewan](https://www.cps.sk.ca/imis)
- [College of Physicians and Surgeons of Manitoba](https://member.cpsm.mb.ca/member/profilesearch)
- [College of Physicians & Surgeons of Prince Edward Island](https://cpspei.alinityapp.com/client/publicdirectory)
- [College of Physicians and Surgeons of Alberta](https://search.cpsa.ca/)
- [College of Physicians and Surgeons of New Brunswick](https://cpsnb.alinityapp.com/Client/PublicDirectory)
- [College of Physicians and Surgeons of Newfoundland and Labrador](https://cpsnl.ca/physician-search/)
- [College of Physicians and Surgeons of Nova Scotia](https://cpsnsphysiciansearch.azurewebsites.net/)
- [Collège des médecins du Québec](https://www.cmq.org/en/directory)

## Setup Instructions

Follow these steps to set up the environment and test the webscrapers:


### 1. Python Virtual Environment

- Create a Python virtual environment named 'venv':

```bash
python -m venv venv
```

- Activate the virtual environment (On Linux/macOS):

```bash
source venv/bin/activate
```

### 2. Install Required Packages

- Install the necessary packages using pip:

```bash
pip install pytest pandas scrapy scrapyscript beautifulsoup4 selenium
```

### 3. Testing the physician verification process

- To test only edge cases:

```bash
pytest tests/test_scrapers.py
```

- To test the entire dataset:

```bash
pytest tests/test_scrapers_on_dataset.py
```