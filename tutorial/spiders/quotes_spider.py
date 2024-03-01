from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import time

import scrapy


class QuotesSpider(scrapy.Spider):
    name = "NovaScotia"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_info = kwargs.get('user_info')

    def start_requests(self):
        status = "NOT FOUND"
        fname = input("Enter fname: ")
        lname = input("Enter lname: ")
        number = input("Enter number: ")
        driver = webdriver.Chrome()

        driver.get("https://cpsnsphysiciansearch.azurewebsites.net/")

        try:
            fName_field = driver.find_element(By.ID, "firstname")
            fName_field.send_keys(fname)

            lName_field = driver.find_element(By.ID, "lastname")
            lName_field.send_keys(lname)

            lNum_field = driver.find_element(By.ID, "licencenumber")
            lNum_field.send_keys(number)

            submit = driver.find_element(By.ID, "search")
            submit.click()
            time.sleep(30)

            try:
              element = WebDriverWait(driver, 2).until(
                  EC.visibility_of_element_located((By.XPATH, '//*[@id="grid-basic"]/tbody/tr[1]/td[1]/a'))
              )
              element.click()
            except TimeoutException:
              status = "NOT FOUND"

            licenseStatus = WebDriverWait(driver, 2).until(
                EC.visibility_of_element_located((By.ID, 'MainContent_frmlicencetype'))
            )

            lStatus = licenseStatus.get_property("value")
            status = "Valid" if lStatus == "Full Licence" else "INVALID"
            print("Status:", status)

        finally:
            return status
