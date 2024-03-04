import pandas as pd
from tqdm import tqdm
from integration import verify_any_physician

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)
pd.set_option('display.width', None)

def main():
    # Initialize dataframe
    df = pd.read_csv("sample_data.csv")
    df['Scraped Status'] = None
    passed_count,failed_count = 0, 0

    # Iterate over each row and update the "Scraped Status" column accordingly
    pbar = tqdm(total=len(df), desc="Scraping in Progress", position=0)
    for index, row in df.iterrows():
        # Scrape the data
        try:
            df.at[index, 'Scraped Status'] = verify_any_physician(
                row['Last Name'],
                row['First Name'],
                row['Licence #'],
                row['Province']
            )
        except Exception as e:
            print(
                row['Last Name'],
                row['First Name'],
                row['Licence #'],
                row['Province'],
                "triggered exception, fix the code")

        # Update pass/fail
        if df.at[index, 'Scraped Status'] == df.at[index, 'Status']:
            passed_count += 1
        else:
            failed_count += 1
    
        # Update progress bar
        pbar.set_description(f"Scraping in Progress: Passed - {passed_count}, Failed - {failed_count}")
        pbar.update(1)
    
    print(df)

if __name__ == "__main__":
    main()
