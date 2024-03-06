# Physician Verification Process
*By Renat Hossain*

This utility is designed to help you check if physicians are practicing or not. It utilizes web scraping techniques to gather information from official websites of medical boards. Currently, it supports scraping data from the College of Physicians and Surgeons of British Columbia (CPSBC) and the College of Physicians and Surgeons of Ontario (CPSO).

## Setup Instructions

Follow these steps to set up the environment and run the web scraping utility:

### 1. Python Virtual Environment

First, you need to create and activate a Python virtual environment to manage dependencies.

```bash
# Create a virtual environment named 'venv'
python -m venv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

### 2. Install Required Packages

Install the necessary packages using pip:

```bash
pip install pandas tqdm scrapy scrapyscript beautifulsoup4
```

### 3. Running the Scrapers

#### For College of Physicians and Surgeons of British Columbia (CPSBC)

To run the scraper specifically for CPSBC, execute the following command:

```bash
python cpsbc_spider.py
```

#### For College of Physicians and Surgeons of Ontario (CPSO)

To run the scraper specifically for CPSO, execute the following command:

```bash
python cpso_spider.py
```

#### Verification for All Physicians in the Dataset

If you want to verify all physicians in the dataset, run the following command:

```bash
python test_verification.py
```

## Websites scraped

### College of Physicians and Surgeons of British Columbia (CPSBC)
- **Website**: [CPSBC Registrant Directory](https://www.cpsbc.ca/public/registrant-directory)
- **Query**: Last Name, First Name
- **Result**: "Practising" or "Not practising"

### College of Physicians and Surgeons of Ontario (CPSO)
- **Website**: [CPSO Doctor Search](https://doctors.cpso.on.ca/?search=general)
- **Query**: Last Name, First Name, CPSO #
- **Result**: "Active Member" or "Expired"

## Manual Steps for CPSBC

1. Go to [CPSBC Registrant Directory](https://www.cpsbc.ca/public/registrant-directory)
2. Make sure you switch to "Switch to advanced search"
3. Enter the physician's last name and first name and press "Search"
4. If there is 1 result, pick one. If there are more, pick the best one.
6. Check to see if the "Registration status" is "Practising" or "Not practising"

## Results for CPSBC
- **Fake person:**
  - Last Name: "Keen", First Name: "Anthony"
  - No results
- **Real person (active):**
  - Last Name: "Gill", First Name: "Amanpreet"
  - Result: "Registration status: Practising"
- **Real person (expired):**
  - Last Name: "Aalto", First Name: "Anu"
  - Result: "Registration status: Resigned"

## Manual Steps for CPSO

1. Go to [CPSO Doctor Search](https://doctors.cpso.on.ca/?search=general)
2. Enter "Last Name" first in order to ungrey the "First Name" box
3. Enter the "First Name" and "CPSO #"
4. Make sure that both checks under "CPSO Registration Status" are checked:
   - "Search doctors currently registered with the CPSO"
   - "Search doctors no longer registered with the CPSO"
5. Hit "Submit"

## Results for CPSO
- **Fake person:**
  - Last Name: "Willie", First Name: "Wonka", CPSO #: 694201
  - Result: "No matches were found. Please adjust your search criteria."
- **Real person (active):**
  - Last Name: "Edwards", First Name: "Bonnie", CPSO #: 30722
  - Result: "MEMBER STATUS" should state: "Active Member as of [date]"
- **Real person (expired):**
  - Last Name: "Fraser", First Name: "Robert", CPSO #: 25614
  - Result: "MEMBER STATUS" should state: "Expired: [reason]"