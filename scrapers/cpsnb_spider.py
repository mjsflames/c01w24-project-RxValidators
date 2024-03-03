import requests

def cpsnb_spider(last_name, first_name, license_no):
    url = "https://cpsnb.alinityapp.com/Client/PublicDirectory/Registrants"

    payload = f"queryParameters=%7B%22Parameter%22%3A%5B%7B%22ID%22%3A%22TextOptionA%22%2C%22Value%22%3A%22{first_name}%22%2C%22ValueLabel%22%3A%22%5Bnot+entered%5D%22%7D%2C%7B%22ID%22%3A%22RegionSID%22%2C%22Value%22%3A%22-%22%2C%22ValueLabel%22%3A%22%5Bnot+entered%5D%22%7D%2C%7B%22ID%22%3A%22graduationYear%22%2C%22Value%22%3A%22-%22%2C%22ValueLabel%22%3A%22%5Bnot+entered%5D%22%7D%2C%7B%22ID%22%3A%22TextOptionB%22%2C%22Value%22%3A%22{last_name}%22%2C%22ValueLabel%22%3A%22%5Bnot+entered%5D%22%7D%2C%7B%22ID%22%3A%22CitySID%22%2C%22Value%22%3A%22%22%2C%22ValueLabel%22%3A%22%5Bnot+entered%5D%22%7D%2C%7B%22ID%22%3A%22IsCheckedOptionA%22%2C%22Value%22%3A%22%22%2C%22ValueLabel%22%3A%22%5Bnot+entered%5D%22%7D%2C%7B%22ID%22%3A%22TextOptionC%22%2C%22Value%22%3A%22{license_no}%22%2C%22ValueLabel%22%3A%22%5Bnot+entered%5D%22%7D%2C%7B%22ID%22%3A%22SpecializationSID%22%2C%22Value%22%3A%22-%22%2C%22ValueLabel%22%3A%22%5Bnot+entered%5D%22%7D%5D%7D&querySID=1000608"
    headers = {
        "Accept": "application/json",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Cookie": "_als_culturechoice=EN-CA; _als_culturechoice=EN-CA",
        "Origin": "https://cpsnb.alinityapp.com",
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    data = response.json()

    if "Records" in data and len(data["Records"]) > 0:
        record = data["Records"][0]
        if "prl" in record and "Regular Licence" in record["prl"]:
            return "VERIFIED"
        else:
            return "INACTIVE"
    else:
        return "NOT FOUND"