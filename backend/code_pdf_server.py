import os
from prescriber_code import *
from pdf_generator import *
import pandas as pd
from flask import Flask, request

import database_functions.database as db_func

app = Flask(__name__)
PORT = 5000

# Clear out database
collection = db_func.get_collection("prescribers")
db_func.delete_all(collection)

# Create a dataframe from a CSV file.
def dataframe_from_csv(file_path):
    df = pd.read_csv(file_path)
    return df

# Create a dataframe from a list of dictionaries.
def create_dataframe_from_list(data, column_list):
    df = pd.DataFrame(data, columns=column_list)
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
            
# This function creates a CSV file to have the new data (statuses and prescriber codes)
def modify_csv_with_new_data(file_name, df):
    # Convert the dataframe to CSV
    df.to_csv(file_name, index=False)
            
            
# API endpoint to generate prescriber codes
@app.route('/generate/code/export', methods=['POST'])
def generate_prescriber_codes():
    # data = request.json.get('data')
    # columns = request.json.get('columns')
    file_data = request.files
    if not file_data:
        return {"message": "No file uploaded"}, 400, {"Content-Type": "application/json"}

    file_data = file_data["file"]
    
    # if not data or not columns:
    #     return jsonify({'error': 'Invalid data or columns'}), 400
    
    df = dataframe_from_csv('PaRx data.csv')
    # df = create_dataframe_from_list(data, columns)
    df = add_code_df(df)
    # generate_verified_pdfs(df)
    modify_csv_with_new_data('PaRx_results.csv', df)
    result = df.to_json(orient='records') 
    
    return result, 200, {"Content-Type": "application/json"}


if __name__ == '__main__':
    app.run(port=PORT)
    
    
# columns = ["First Name", "Last Name", "Province", "Regulatory College", "License #", "Status"]
# data = [
#    ["Emily","Ho","ON","Toronto Uni","232","VERIFIED"],
#     ["Morgan","Lao","BC","British Columbia Uni","23123","INACTIVE"],
#     ["Lance","Talban","SK","Saskatchewan Uni","12323","VERIFIED"],
#     ["Emily","Ho","ON","Toronto Uni","232","VERIFIED"],
#     ["Emily","Ho","ON","Toronto Uni","232","VERIFIED"],
#     ["Lance","Talban","SK","Saskatchewan Uni","12323","VERIFIED"]
# ]