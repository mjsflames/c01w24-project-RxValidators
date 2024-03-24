import csv
import os

# This function generates a unique prescriber code
# def code_generator(firstname, last_name, province, index):
#     return province + '-' + firstname[0] + last_name[0] + str(index)

# This function will generate the index for the unique prescriber codes based on duplicate people
# def get_index(counter):
#     number = str(counter).zfill(3)
#     return number


# This function adds the generated unique prescriber's code to the list of dictionaries
# (only if the prescriber is verified)
# def add_code_to_dict(dict_person_list):
#     for person in dict_person_list:
#         code = ""
#         counter = 1
#         num = get_index(counter)
#         if person["Status"].upper() == "VERIFIED":
#             code = code_generator(person["First Name"], person["Last Name"], person["Province"], num)
#         person["Code"] = code
#     return dict_person_list


# This function modifies the CSV file to have the generated unique codes for each verified prescriber
def modify_csv_with_code(file_name, dict_person_list):
    # dict_person_list is a list of dictionaries (with the 'Code' already generated for only the verified prescribers)
    # Create a temporary file to write the modified CSV
    temp_file = file_name + '.temp'
    
    with open(file_name, 'r', newline='') as input_file, open(temp_file, 'w', newline='') as output_file:
        reader = csv.reader(input_file)
        writer = csv.writer(output_file)
        
        # Read the header
        header = next(reader)
        
        # Check if "Code" column already exists
        if "Code" not in header:
            # Add the new column header "Code"
            header.append("Code")
        writer.writerow(header)
        
        # Add the values from the list of dictionaries to the CSV file under the right column
        for person in dict_person_list:
            writer.writerow(person.values())
    
    # Replace the original file with the modified one
    os.replace(temp_file, file_name)
