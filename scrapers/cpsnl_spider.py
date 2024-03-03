import scrapy

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from scrapy.selector import Selector
from time import sleep

class NewFoundLandSpider(scrapy.Spider):
    name = 'NewFoundLand'
    start_urls = ['https://cpsnl.ca/physician-search/']

    def __init__(self):
        self.first = "Astrid"
        self.last = "Peacock"
        #self.lic = 8036
        self.driver = webdriver.Chrome()

        self.driver.get('https://imis.cpsnl.ca/WEB/CPSNL/PhysicianSearch/Physician_Search_New.aspx')
        
        # Fill in the physician's information here
        first_name = self.driver.find_element("id", "ctl00_TemplateBody_WebPartManager1_gwpciNewQueryMenuCommon_ciNewQueryMenuCommon_ResultsGrid_Sheet0_Input2_TextBox1")
        last_name = self.driver.find_element("id", "ctl00_TemplateBody_WebPartManager1_gwpciNewQueryMenuCommon_ciNewQueryMenuCommon_ResultsGrid_Sheet0_Input1_TextBox1")
        #license_number = self.driver.find_element(By.XPATH, '//*[@id="parameterformcontainer"]/div/fieldset/div/div[4]/div[1]/input')
        
        first_name.send_keys(self.first)
        last_name.send_keys(self.last)
        #license_number.send_keys(self.lic)
        last_name.send_keys(Keys.RETURN)
        sleep(3)

    def parse(self, response):
        
        # Pass the page source to Scrapy for parsing
        response = Selector(text=self.driver.page_source)
        members_found = response.xpath('//*[@id="ctl00_TemplateBody_WebPartManager1_gwpciNewQueryMenuCommon_ciNewQueryMenuCommon_ResultsGrid_Grid1_ctl00"]/tbody').get()
        sel = Selector(text=members_found)

        if (sel.xpath('//*[@id="ctl00_TemplateBody_WebPartManager1_gwpciNewQueryMenuCommon_ciNewQueryMenuCommon_ResultsGrid_Grid1_ctl00__0"]/td[5]/text()[1]').get()):  
            registration_status = sel.xpath('//*[@id="ctl00_TemplateBody_WebPartManager1_gwpciNewQueryMenuCommon_ciNewQueryMenuCommon_ResultsGrid_Grid1_ctl00__0"]/td[5]/text()[1]').get().strip()
            are_equal = registration_status == "Practicing"
            if are_equal:
                yield {'status': 'VERIFIED'}
            else:
                yield {'status': 'INACTIVE'}
        else:
            yield {'status': "NOT FOUND"}

        
