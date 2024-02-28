import os
import pandas as pd
from tqdm import tqdm
from cpso_spider import cpso_spider
from cpsbc_spider import cpsbc_spider
from cpsm_spider import cpsm_spider

pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)

CPSBC_str = "College of Physicians and Surgeons of British Columbia"
CPSO_str = "College of Physicians and Surgeons of Ontario"
CPSM_str = "College of Physicians and Surgeons of Manitoba"

def main():
    df = pd.read_csv("sample_data.csv")
    df_CPSBC = df["Licensing College"] == CPSBC_str
    df_CPSO = df["Licensing College"] == CPSO_str
    df_CPSM = df["Licensing College"] == CPSM_str
    df = df[df_CPSBC | df_CPSO | df_CPSM]
    df['Scraped Status'] = None

    # Iterate over each row and update the "Scraped Status" column accordingly
    for index, row in tqdm(df.iterrows(), total=len(df), desc="Scraping in Progress"):
        if row['Licensing College'] == CPSBC_str:
            df.at[index, 'Scraped Status'] = cpsbc_spider(row['Last Name'], row['First Name'])
        elif row['Licensing College'] == CPSO_str:
            df.at[index, 'Scraped Status'] = cpso_spider(row['Last Name'], row['First Name'], row['Licence #'])
        elif row['Licensing College'] == CPSM_str:
            df.at[index, 'Scraped Status'] = cpsm_spider(row['Last Name'], row['First Name'])
        os.system('cls' if os.name == 'nt' else 'clear')
        tqdm.write(str(df))

if __name__ == "__main__":
    main()
