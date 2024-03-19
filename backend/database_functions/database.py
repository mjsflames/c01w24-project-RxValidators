# pylint: disable=all
import pandas as pd
import pymongo
from pymongo import MongoClient

excel_file = 'PaRx Sample Data.xlsx'
website_dictionary = \
{
    "College of Physicians and Surgeons of British Columbia": "https://www.cpsbc.ca/public/registrant-directory",
    "College of Physicians and Surgeons of Ontario": "https://doctors.cpso.on.ca/?search=general",
    "College of Physicians and Surgeons of Saskatchewan": "https://www.cps.sk.ca/imis",
    "College of Physicians and Surgeons of Manitoba": "https://member.cpsm.mb.ca/member/profilesearch",
    "College of Physicians & Surgeons of Prince Edward Island": "https://www.cpspei.ca/physician-search/",
    "College of Physicians and Surgeons of Alberta": "https://search.cpsa.ca/",
    "College of Physicians and Surgeons of New Brunswick": "https://cpsnb.alinityapp.com/Client/PublicDirectory",
    "College of Physicians and Surgeons of Newfoundland and Labrador": "https://cpsnl.ca/physician-search/",
    "College of Physicians and Surgeons of Nova Scotia": "https://cpsnsphysiciansearch.azurewebsites.net/",
    "Collège des médecins du Québec": "https://www.cmq.org/fr/bottin"
}

server_IP = "127.0.0.1:27017"
client = MongoClient(f"mongodb://{server_IP}")
db_name = "test_db"
collection_name = "test_collection"
db = client[db_name]
collection = db[collection_name]


def excel_to_array(excel_file, new_column_name):
    df = pd.read_excel(excel_file)
    if(new_column_name != ""):
        new_dataframe_column(df, new_column_name)
    arr = df.to_numpy()
    return arr

def new_dataframe_column(df, column_name):
    df[column_name] = None
    return df

def database_exists(client, db_name):
    db_list = client.list_database_names()
    is_exists = db_name in db_list
    return is_exists

def excel_to_mongodb(db_name, collection, excel_file):
    if(collection.count_documents({}) != 0):
        return
    df = pd.read_excel(excel_file)
    collection.insert_many(df.to_dict(orient="records"))

def get_all(collection):
    return collection.find()

def get_all_as_dataframe(collection):
    return pd.DataFrame(list(collection.find()))

def print_all(collection):
    documents = get_all(collection)
    for document in documents:
        print(document)

""" 
O(1) time complexity database operation to raise pymongo.errors.OperationFailure 
if the username or password is incorrect during user authentication.
"""
def dummy_database_operation(collection):
    collection.find_one()

def delete_all(collection):
    deleted_count = collection.delete_many({})
    return deleted_count

def add_code_column(collection):
    collection.update_many({}, {"$set": {"Generated Code": None}})

def clear_status_all(collection):
    collection.update_many({}, {"$set": {"Status": None}})

def remove_all_unverified(collection):
    deleted_count = collection.delete_many({"Status": {"$ne": "VERIFIED"}})
    return deleted_count

def insert_verified_persons(df):
    """accepts a pandas dataframe, loads the rows into a table"""
    pass

def get_collection(name):
    return db[name]


# New Authentication Backend Functions for MongoDB (tested)
def create_admin_account(username, password):
    db = client[db_name]
    db.command("createUser", str(username), pwd=str(password), roles=[{"role": "userAdminAnyDatabase", "db": "admin"}, 
                                                                      {"role": "readWriteAnyDatabase", "db": "admin"}])

def create_prescriber_account(username, password):
    db = client[db_name]
    db.command("createUser", str(username), pwd=str(password), roles=[{"role": "readWrite", "db": db_name}])

def create_patient_account(username, password):
    db = client[db_name]
    db.command("createUser", str(username), pwd=str(password), roles=[{"role": "read", "db": db_name}])

def authenticate_user(username, password):
    try:
        cur_client = MongoClient(f"mongodb://{username}:{password}@{server_IP}/{db_name}")
        cur_db = cur_client[db_name]
        cur_collection = cur_db[collection_name]
        dummy_database_operation(cur_collection)
        print("User Authenticated")
    except pymongo.errors.OperationFailure:
        print(f"Authentication failed for user: {username}")
    except BaseException as error:
        print(f"Authentication failed: {error}")

def user_exists(username):
    db = client["admin"]
    users = db.system.users.count_documents({"user": str(username)})
    return users > 0

def remove_all_users(database_name):
    db = client[database_name]
    db.command("dropAllUsersFromDatabase")
    print(f"All users removed from the database: {database_name}")

################################
# Prescription Backend

def getAllPrescriptions(username):
  preScriptColl = get_collection("Prescriptions")
  prescriptions = preScriptColl.find({'PatientId': username})
  res = []
  for p in prescriptions:
      p['_id'] = str(p['_id'])
      res.append(p)
  return res


###############################

# Testing the database
# if __name__ == "__main__":
#     # excel_to_mongodb(db_name, collection, excel_file)
#     # add_code_column(collection)
#     # remove_all_unverified(collection)
#     # print_all(collection)
#     # delete_all(collection)

#     remove_all_users(db_name)

#     if(not user_exists("test admin")):
#         create_admin_account("test admin", 1111)
#     if(not user_exists("test prescriber")):
#         create_prescriber_account("test prescriber", 2222)
#     if(not user_exists("test patient")):
#         create_patient_account("test patient", 3333)

#     authenticate_user("test admin", 1111)
#     authenticate_user("test prescriber", 2222)
#     authenticate_user("test patient", 3333)

def list_all_users():
    admin_client = MongoClient(f"mongodb://{server_IP}/admin")
    admin_db = admin_client["admin"]
    all_user_docs = admin_db.system.users.find()
    for user_doc in all_user_docs:
        username = user_doc.get("user")
        database = user_doc.get("db")
        roles = user_doc.get("roles")
        print(f"Username: {username}, Database: {database}, Roles: {roles}")

# Testing the database
if __name__ == "__main__":
    # test basic database functions
    excel_to_mongodb(db_name, collection, excel_file)
    add_code_column(collection)
    remove_all_unverified(collection)
    print_all(collection)
    delete_all(collection)

    # test user creation
    remove_all_users("admin")
    remove_all_users(db_name)
    if(not user_exists("test admin")):
        create_admin_account("test admin", 1111)
    if(not user_exists("test prescriber")):
        create_prescriber_account("test prescriber", 2222)
    if(not user_exists("test patient")):
        create_patient_account("test patient", 3333)
    list_all_users()

    # test user authentication
    authenticate_user("test admin", 1111)
    authenticate_user("test prescriber", "fail")
    authenticate_user("test patient", 3333)
    authenticate_user("", "")
    
