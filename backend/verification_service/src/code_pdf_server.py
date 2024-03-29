import os, io
import pandas as pd

#  ? PDF Generator Dependencies
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import zipfile

import database as db_func

#########################################################
# Collection of database is used for PDF and Code generation
collection = db_func.get_collection("prescribers")
# Clear out database 
# db_func.delete_all(collection) # TEMP
#########################################################

# Create a dataframe from a CSV file.
def dataframe_from_csv(file_path):
    df = pd.read_csv(file_path)
    return df

# Create a dataframe from a list of dictionaries.
def create_dataframe_from_list(data, column_list):
    df = pd.DataFrame(data, columns=column_list)
    return df
# This function generates a unique prescriber code
def code_generator(firstname, last_name, province, index):
    return province + '-' + firstname[0] + last_name[0] + get_index(index)

# This function will generate the index for the unique prescriber codes based on duplicate people
def get_index(counter):
    number = str(counter).zfill(3)
    return number

def save_to_db(df):
    # Remove "status" if exists
    if "Status" in df.columns:
        df = df.drop(columns=["Status"])
    
    if "Initials" in df.columns:
        df = df.drop(columns=["Initials"])

    # Rename the columns to match the database
    df = df.rename(columns={
        "First Name": "firstName", 
        "Last Name": "lastName", 
        "Province": "province",
        "Licence #": "license", 
        "Licensing College": "college",
        "Scraped Status": "status",
        "Code": "code",
        })
    
    # Create a new column "UNASSIGNED"
    df["unassigned"] = True
    
    # Save the dataframe to the database
    db_func.insert_data(collection, df.to_dict(orient='records'))

def add_codes_to_df(df):
    df['Initials'] = df['First Name'].str[0] + df['Last Name'].str[0]
    df = df.sort_values(by=['Province', 'Initials'])
    db_func.new_dataframe_column(df, "Code")
    last_prefix = ""
    for i in df.index:
        first_name = df['First Name'][i]
        last_name = df['Last Name'][i]
        initials = df['Initials'][i]
        province = df['Province'][i]
        status = df['Status'][i]
        prefix = f"{province}-{initials}"
        
        counter = 1
        # Make the code better formatted later
        if status == "VERIFIED":
            if last_prefix != prefix:
                last_prefix = prefix
                # query using mongodb regex (province-initials) to get the last code and increment it by 1
                last = collection.find({"Code": {"$regex": f"{last_prefix}[0-9]{{3}}"}}).sort("Code", -1).limit(1)
                # print(list(collection.find()))

                # last = last
                
                last = list(last)
                
                if len(last) == 0: last = [{"Code": f"000"}]
                last = last[0]['Code'][-3:]
                # Convert last to integer
                last = int(last)
            last = last + 1            
            
            # num = get_index(counter)
            code = code_generator(first_name, last_name, province, last)

            has_dupes = df.loc[df['Code'] == code]
            if has_dupes.size > 0:
                counter += 1
            
            df.loc[i, 'Code'] = code
    # print(df)
    return df

# Get the prescriber codes
def get_prescriber_codes_from_db(filter={}):
    codes = collection.find(filter)
    return codes

# Update the status of a prescriber code
def update_prescriber_code_status(code, status):
    updates = collection.update_one({"code": code}, {"$set": {"status": status}})
    return updates

# This function generates a pdf file for the verified prescribers
# def generate_verified_pdfs(df, output_path):
#     # Create the PDFs
#     for i in df.index:
#         if df['Status'][i] == "VERIFIED":
#             create_pdf(df['Code'][i], output_path)
            
# This function creates a CSV file to have the new data (statuses and prescriber codes)
def new_data_to_csv(file_name, df):
    # Convert the dataframe to CSV
    df.to_csv(file_name, index=False)
    
def new_data_to_xlsx(file_name, df):
    # Convert the dataframe to CSV
    df.to_excel(file_name, index=False)
    
    
# This function creates a pdf file (formatted the way the company wants it) based on the prescriber's code
def create_pdf(code, output_path):
    # page = canvas.Canvas(os.path.join(output_path, f"PaRx-{code}.pdf"), pagesize=letter)
    page = canvas.Canvas(output_path, pagesize=letter)
    page.setTitle(f"PaRx-{code}")
    page.setFont("Helvetica", 12)
    page.drawString(80, 700, "Name _______________________________________")
    page.drawString(80, 660, "Date ________________________________________")
    page.drawString(80, 610, "My Outdoor Activity Plan:")
    page.saveState()

    page.drawString(80, 200, "____________________________________")
    page.setFont("Helvetica", 9)
    page.drawString(80, 185, "Health Professional's Signature")

    page.restoreState() 
    page.drawString(80, 130, f"Prescription #: {code}   --  ___________________  --  ___________________")
    
    page.setFont("Helvetica", 9)
    page.drawString(280, 115, "(YYMMDD)")
    page.drawString(415, 115, "(Patient's Initials)")

    # page.save()
    return page


def generate_verified_pdfs(df, output_path):
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", compression=zipfile.ZIP_DEFLATED) as zipf:
        # Create the PDFs
        for i in df.index:
            if not df['Status'][i] == "VERIFIED": continue
            
            
            pdf_buffer = io.BytesIO()
            pdf = create_pdf(df['Code'][i], pdf_buffer)
            # Store the PDF in the zip file
            pdf.save()
            zipf.writestr(f"PaRx-{df['Code'][i]}.pdf", pdf_buffer.getvalue())
            
    # return zip file
    zip_buffer.seek(0)
    return zip_buffer.getvalue()
                
# DELETE THIS LATER

# full_columns = ["First Name", "Last Name", "Province", "Regulatory College", "License #", "Status", "Code"]
# expected_data = [
#             ["Emily","Ho","ON","Toronto Uni","232","VERIFIED", "ON-EH001"],
#             ["Morgan","Lao","BC","British Columbia Uni","23123","INACTIVE", None],
#             ["Lance","Talban","SK","Saskatchewan Uni","12323","VERIFIED", "SK-LT001"],
#         ] 
# df = pd.DataFrame(expected_data, columns=full_columns)
        
# # call the function generate_verified_pdfs(df, output_path) to generate the PDFs
# print(generate_verified_pdfs(df, ""))