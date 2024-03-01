from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import time

import scrapy


class QuotesSpider(scrapy.Spider):
    name = "Quebec"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_info = kwargs.get('user_info')

    def start_requests(self):
        status = "NOT FOUND"
        name = input("Enter name: ")
        number = input("Enter number: ")

        # Create a new instance of the Chrome driver
        driver = webdriver.Chrome()

        driver.get(f"https://www.cmq.org/fr/bottin/medecins?number={number}&lastname={name}&firstname=&specialty=0&city=&unlisted=false")

        try:
            cookiesElement = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//*[@id="didomi-notice-disagree-button"]'))
            )

            cookiesElement.click()

            try:
              element = WebDriverWait(driver, 2).until(
                  EC.element_to_be_clickable((By.XPATH, '//*[@id="__nuxt"]/div/div/main/article/section[2]/div/div/table/tbody/tr[1]'))
              )
              element.click()
            except TimeoutException:
              status = "NOT FOUND"
              return status

            element.click()

            popupElement = WebDriverWait(driver, 10).until(
                EC.visibility_of_element_located((By.XPATH, '/html/body/div[3]/div/div/div/div[2]/ul/li[4]'))
            )
            popup_text = popupElement.text.strip()
            if "Inscrit - Actif" in popup_text:
              status = "VALID"
            else:
              status = "INVALID"
        finally:
            return status
