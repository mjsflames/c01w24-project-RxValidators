import scrapy

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from scrapy.selector import Selector
from time import sleep

class NewBrunswickSpider(scrapy.Spider):
    name = 'NewBrunswick'
    start_urls = ['https://cpsnb.alinityapp.com/Client/PublicDirectory']

    def __init__(self):
        self.first = "Allison"
        self.last = "Leonard"
        self.lic = 8036
        self.driver = webdriver.Chrome()

        self.driver.get('https://cpsnb.alinityapp.com/Client/PublicDirectory')
        
        # Fill in the physician's information here
        first_name = self.driver.find_element(By.XPATH, '//*[@id="parameterformcontainer"]/div/fieldset/div/div[1]/div[1]/input')
        last_name = self.driver.find_element(By.XPATH, '//*[@id="parameterformcontainer"]/div/fieldset/div/div[2]/div[1]/input')
        license_number = self.driver.find_element(By.XPATH, '//*[@id="parameterformcontainer"]/div/fieldset/div/div[4]/div[1]/input')
        
        first_name.send_keys(self.first)
        last_name.send_keys(self.last)
        license_number.send_keys(self.lic)
        sleep(3)
        license_number.send_keys(Keys.RETURN)
        sleep(15)

    def parse(self, response):
        
        # Pass the page source to Scrapy for parsing
        response = Selector(text=self.driver.page_source)
        members_found = response.xpath('//*[@id="publicdirectorycontainer"]/div[6]/div[1]/div/section/div[2]/div/div/div/div/div/small/span[2]').get()
        sel = Selector(text=members_found)
        if (sel.xpath('//span/text()').get()):
            number = int(sel.xpath('//span/text()').get())
            if number > 0:
                registration_status = response.xpath('//*[@id="Results"]/tbody/tr/td[2]/text()[1]').get().strip()
                are_equal = registration_status == "Suspended"
                if not are_equal:
                    yield {'status': registration_status}
                else:
                    yield {'status': 'INACTIVE'}
            else:
                yield {'status': "NOT FOUND"}
        else:
            yield {'status': "NOT FOUND"}

        

