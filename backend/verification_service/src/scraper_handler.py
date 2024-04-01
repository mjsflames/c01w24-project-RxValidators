import pandas as pd
from tqdm import tqdm
# from scrapers.integration import *
from .scrapers.verify import verify
from io import StringIO, BytesIO
from .code_pdf_server import add_codes_to_df, save_to_db

from twisted.internet import reactor
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)
pd.set_option('display.width', None)

CPSO_str = "College of Physicians and Surgeons of Ontario"
CPSBC_str = "College of Physicians and Surgeons of British Columbia"
CPSS_str = "College of Physicians and Surgeons of Saskatchewan"
CPSM_str = "College of Physicians and Surgeons of Manitoba"
CPSPEI_str = "College of Physicians and Surgeons of Prince Edward Island"
CPSA_str = "College of Physicians and Surgeons of Alberta"
CPSNB_str = "College of Physicians and Surgeons of New Brunswick"
CPSNL_str = "College of Physicians and Surgeons of Newfoundland and Labrador"
CPSNS_str = "College of Physicians and Surgeons of Nova Scotia"
CMQ_str = "Collège des médecins du Québec"


def validate_file(file_data) -> bool:
    return True


processing = {}
REQUEST_LIMIT = 10


def _process_request(file_data, id):
    print("Processing request for id =", id)
    processing[id] = "Pending..."
    df = None # hotfix: try
    try:
        print("Trying to read CSV file")
        df = pd.read_csv(BytesIO(file_data))
    except Exception as e:
        print(e)
    
    if type(df) == type(None):
        try:
            print("Trying to read Excel file")
            df = pd.read_excel(BytesIO(file_data))
        except Exception as e:
            print(e)
            return "Invalid file format, please upload a Excel file with the correct headers"
    
    df['Scraped Status'] = None
    passed_count = 0
    failed_count = 0

    if validate_file(file_data) == False:
        return "Invalid file format, please upload a CSV file with the correct headers"

    # Stringify all data
    df = df.applymap(str)
    
    # Check if status column exists
    has_status = "Status" in df.columns

    # Iterate over each row and update the "Scraped Status" column accordingly
    pbar = tqdm(total=len(df), desc="Scraping in Progress", position=0)
    for index, row in df.iterrows():
        # Check if request has been cancelled
        if id not in processing:
            print(f"Detected Request({id}) cancelled")
            return "Request cancelled"
        
        # Scrape the data
        try:

            df.at[index, 'Scraped Status'] = verify(
                last_name=row['Last Name'],
                first_name=row['First Name'],
                license_no=row['Licence #'],
                province=row['Province']
            ) or "Error"

        except Exception as e:
            print(row['Last Name'], row['First Name'],
                  row['Licence #'], "triggered exception, fix the code")
            
        # Check if request has been cancelled
        if id not in processing:
            print(f"Detected Request({id}) cancelled")
            return "Request cancelled"
        
        # Update pass/fail
        if has_status:
            if df.at[index, 'Scraped Status'] == df.at[index, 'Status']:
                passed_count += 1
            else:
                failed_count += 1
        else:
            if df.at[index, 'Scraped Status'] != "Error":
                passed_count += 1
            else:
                failed_count += 1
        processing[id] = {"passed": passed_count,
                          "failed": failed_count, "total": len(df)}
        pbar.set_description(
            f"Scraping in Progress: Passed - {passed_count}, Failed - {failed_count}")
        pbar.update(1)

    # Apply codes
    processing[id] = {
        **processing[id],
        "status": "Applying codes..."
    }
    print("Applying Codes...")
    
    # Drop status
    if has_status:
        df.drop(columns=['Status'], inplace=True)

    # Rename Scraped status to status
    df.rename(columns={'Scraped Status': 'Status'}, inplace=True)
    
    df = add_codes_to_df(df)
    print("Codes applied")

    # Rename Scraped status to status
    df.rename(columns={'Scraped Status': 'Status'}, inplace=True)
    
    # Save to DB
    processing[id] = {
        **processing[id],
        "status": "Saving to database..."
    }
    
    print("Saving to database...")
    save_to_db(df)
    print("Saved to database")
    

    processing[id] = df


def check_status(id):
    if id in processing:
        return processing[id]
    return "Request not found"


def close_request(id):
    if id not in processing:
        return "Request not found"
    del processing[id]
    return "OK"


def get_result(id):
    if id in processing:
        return_data = processing[id]
        close_request(id)
        return return_data
    return "Request not found"


def handle(file_data, id) -> pd.DataFrame:
    if id in processing:
        return "Request already in progress"

    if len(processing) >= REQUEST_LIMIT:
        return "Request limit reached"

    try:
        _process_request(file_data, id)
        
        return "OK"
    except Exception as e:
        print(e)
        return "Internal server error"
