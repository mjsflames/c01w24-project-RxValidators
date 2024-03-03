import pandas as pd
from tqdm import tqdm
from integration import *

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

def main():
    df = pd.read_csv("sample_data.csv")
    df['Scraped Status'] = None
    passed_count = 0
    failed_count = 0

    # # Additional filtering
    # df_CPSBC = df["Licensing College"] == CPSBC_str
    # df_CPSO = df["Licensing College"] == CPSO_str
    # df_CPSM = df["Licensing College"] == CPSM_str
    # df = df[df_CPSBC | df_CPSO | df_CPSM]

    # Iterate over each row and update the "Scraped Status" column accordingly
    pbar = tqdm(total=len(df), desc="Scraping in Progress", position=0)
    for index, row in df.iterrows():
        # Scrape the data
        if row['Licensing College'] == CPSBC_str:
            df.at[index, 'Scraped Status'] = cpsbc_spider(row['Last Name'], row['First Name'])
        elif row['Licensing College'] == CPSO_str:
            df.at[index, 'Scraped Status'] = cpso_spider(row['Last Name'], row['First Name'], row['Licence #'])
        elif row['Licensing College'] == CPSM_str:
            df.at[index, 'Scraped Status'] = cpsm_spider(row['Last Name'], row['First Name'])
        elif row['Licensing College'] == CPSNS_str:
            df.at[index, 'Scraped Status'] = cpsns_spider(row['Last Name'], row['First Name'], row['Licence #'])

        # Update pass/fail
        if df.at[index, 'Scraped Status'] == df.at[index, 'Status']:
            passed_count += 1
        else:
            failed_count += 1
    
        pbar.set_description(f"Scraping in Progress: Passed - {passed_count}, Failed - {failed_count}")
        pbar.update(1)
    
    print(df)

if __name__ == "__main__":
    main()
