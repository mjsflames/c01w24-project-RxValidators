import database_functions.database as db_func
from prescriber_code import *
from pdf_generator import *
import pandas as pd


# 1. clear out database
collection = db_func.get_collection("prescribers")
db_func.delete_all(collection)

def create_dataframe(arr, column_list):
    df = pd.DataFrame(arr, columns=column_list)
    return df

def add_code_df(df):
    db_func.new_dataframe_column(df, "Code")
    
    for i in df.index:
        first_name = df['First Name'][i]
        last_name = df['Last Name'][i]
        province = df['Province'][i]
        status = df['Status'][i]
        
        counter = 1
        # Make the code better formatted later
        if status == "VERIFIED":
            while True:
                num = get_index(counter)
                code = code_generator(first_name, last_name, province, num)

                has_dupes = df.loc[df['Code'] == code]
                if has_dupes.size > 0:
                    counter += 1
                    continue
                break
            
            df.loc[i, 'Code'] = code
    # print(df)
    return df

# This function generates a pdf file for the verified prescribers
def generate_verified_pdfs(df):
    # Create the PDFs
    for i in df.index:
        if df['Status'][i] == "VERIFIED":
            create_pdf(df['Code'][i], os.path.join(os.getcwd(), "pdfs"))
        
# Making dataframe as sample data
# columns = ["First Name", "Last Name", "Province", "Regulatory College", "License #", "Status"]
# data = [
#    ["Emily","Ho","ON","Toronto Uni","232","VERIFIED"],
#     ["Morgan","Lao","BC","British Columbia Uni","23123","INACTIVE"],
#     ["Lance","Talban","SK","Saskatchewan Uni","12323","VERIFIED"],
#     ["Emily","Ho","ON","Toronto Uni","232","VERIFIED"],
#     ["Emily","Ho","ON","Toronto Uni","232","VERIFIED"],
#     ["Lance","Talban","SK","Saskatchewan Uni","12323","VERIFIED"]
# ]
        
        
# df = create_dataframe(data, columns)
# add_code_df(df)
# generate_verified_pdfs(df)