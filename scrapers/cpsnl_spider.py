from scrapy import Spider, Request, FormRequest
import webbrowser

form_last = "ctl00$TemplateBody$WebPartManager1$gwpciNewQueryMenuCommon$" + \
            "ciNewQueryMenuCommon$ResultsGrid$Sheet0$Input1$TextBox1"
form_first = "ctl00$TemplateBody$WebPartManager1$gwpciNewQueryMenuCommon$" + \
             "ciNewQueryMenuCommon$ResultsGrid$Sheet0$Input2$TextBox1"

class CPSNLSpider(Spider):
    name = 'cpsnl_spider'
    start_urls = ['https://imis.cpsnl.ca/WEB/CPSNL/PhysicianSearch/Physician_Search_New.aspx']

    def __init__(self, last_name, first_name, *args, **kwargs):
        super(CPSNLSpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name

    def parse(self, response):
        formdata = {
            form_last: self.last_name,
            form_first: self.first_name
        }
        yield FormRequest.from_response(
            response, formdata=formdata, callback=self.after_submit
        )

    def after_submit(self, response):
        rows = response.xpath('//tr[contains(@class, "rgRow") or contains(@class, "rgAltRow")]')
        if len(rows) == 0:
            return {"status": "NOT FOUND"}

        if len(rows) == 1:
            status = rows[0].xpath('td[5]/text()').get().lower()
            if "practicing" in status and "non-practicing" not in status:
                return {"status": "VERIFIED"}
            else:
                return {"status": "INACTIVE"}

        if len(rows) > 1:
            for row in rows:
                scraped_last_name = row.xpath('td[1]/a/text()').get()
                scraped_first_name = row.xpath('td[2]/text()').get()
                status = row.xpath('td[5]/text()').get().lower()
                if scraped_last_name == self.last_name and \
                   scraped_first_name == self.first_name:
                    if "practicing" in status and "non-practicing" not in status:
                        return {"status": "VERIFIED"}
                    else:
                        return {"status": "INACTIVE"}

        return {"status": "NOT FOUND"}















































"""
import scrapy

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from scrapy.selector import Selector
from time import sleep

class CPSNLSpider(scrapy.Spider):
    name = 'NewFoundLand'
    start_urls = ['https://cpsnl.ca/physician-search/']

    def __init__(self, last_name, first_name, license_no, *args, **kwargs):
        super(CPSNLSpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name
        self.license_no = license_no

        self.driver = webdriver.Chrome()
        self.driver.get('https://imis.cpsnl.ca/WEB/CPSNL/PhysicianSearch/Physician_Search_New.aspx')
        
        # Fill in the physician's information here
        first_name = self.driver.find_element("id", "ctl00_TemplateBody_WebPartManager1_gwpciNewQueryMenuCommon_ciNewQueryMenuCommon_ResultsGrid_Sheet0_Input2_TextBox1")
        last_name = self.driver.find_element("id", "ctl00_TemplateBody_WebPartManager1_gwpciNewQueryMenuCommon_ciNewQueryMenuCommon_ResultsGrid_Sheet0_Input1_TextBox1")
        #license_number = self.driver.find_element(By.XPATH, '//*[@id="parameterformcontainer"]/div/fieldset/div/div[4]/div[1]/input')
        
        first_name.send_keys(self.first_name)
        last_name.send_keys(self.last_name)
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
"""