from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from prescriber_code import *
import os
# This function creates a pdf file (formatted the way the company wants it) based on the prescriber's code
# def create_pdf(code, output_path):
#     page = canvas.Canvas(os.path.join(output_path, f"PaRx-{code}.pdf"), pagesize=letter)
#     page.setTitle(f"PaRx-{code}")
#     page.setFont("Helvetica", 12)
#     page.drawString(80, 700, "Name _______________________________________")
#     page.drawString(80, 660, "Date ________________________________________")
#     page.drawString(80, 610, "My Outdoor Activity Plan:")
#     page.saveState()

#     page.drawString(80, 200, "____________________________________")
#     page.setFont("Helvetica", 9)
#     page.drawString(80, 185, "Health Professional's Signature")

#     page.restoreState() 
#     page.drawString(80, 130, f"Prescription #: {code}   --  ___________________  --  ___________________")
    
#     page.setFont("Helvetica", 9)
#     page.drawString(280, 115, "(YYMMDD)")
#     page.drawString(415, 115, "(Patient's Initials)")

#     page.save()

# --------------------------------------------------------------------------------------------------------
# Example usage:
# filename = "PaRx data.csv"

# # List of dictionaries of each prescriber
# dict_person_list = [
#     {
#         "First Name": "Emily",
#         "Last Name": "Ho",
#         "Province": "ON",
#         "Regulatory College": "Toronto Uni",
#         "License #": "232",
#         "Status": "VERIFIED"
#     },
#     {
#         "First Name": "Morgan",
#         "Last Name": "Lao",
#         "Province": "BC",
#         "Regulatory College": "British Columbia Uni",
#         "License #": "23123",
#         "Status": "INACTIVE"
#     },
#     {
#         "First Name": "Lance",
#         "Last Name": "Talban",
#         "Province": "SK",
#         "Regulatory College": "Saskatchewan Uni",
#         "License #": "12323",
#         "Status": "VERIFIED"
#     }
# ]

# # Add the generated unique prescriber's code to the dictionary
# dict_person_list = add_code_to_dict(dict_person_list)
# print(dict_person_list)

# # Modify the CSV file to have the 'Code' column and the generated unique codes of each verified prescriber
# modify_csv_with_code(filename, dict_person_list)
# # Create the PDFs based on if the prescriber in 'dict_person_list' is verified
# pdf_for_verified(dict_person_list)