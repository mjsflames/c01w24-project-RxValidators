import scrapy
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from scrapy.selector import Selector 
from time import sleep

Physician = [['Tiffany', 'Lee', 'AB', 'College of Physicians and Surgeons of Alberta', 23447, 'INACTIVE'], ['Rebecca', 'Muttart', 'PEI', 'College of Physicians and Surgeons of PEI', 7646, 'INACTIVE']]

class CPSPEISpider(scrapy.Spider):
    name = 'PEI'
    start_urls = ['https://cpspei.alinityapp.com/client/publicdirectory']

    def __init__(self, last_name, first_name, license_no, *args, **kwargs):
        super(CPSPEISpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name
        self.license_no = license_no
        # Open's instance of Chrome
        self.driver = webdriver.Chrome()
        self.driver.get('https://cpspei.alinityapp.com/client/publicdirectory')
        # Change to not rely on xpath's as much
        element1 = self.driver.find_element("xpath", '//*[@id="parameterformcontainer"]/div/fieldset/div/div[1]/div[1]/input')
        element1.send_keys(self.first_name)
        element1 = self.driver.find_element("xpath", '//*[@id="parameterformcontainer"]/div/fieldset/div/div[2]/div[1]/input')
        element1.send_keys(self.last_name)
        element1 = self.driver.find_element("xpath", '//*[@id="parameterformcontainer"]/div/fieldset/div/div[4]/div[1]/input')
        element1.send_keys(self.cpso_numbe)
        sleep(3)
        element1.send_keys(Keys.ENTER)
        sleep(3)

    def parse(self, response):
        response = Selector(text = self.driver.page_source)
        numberPhysicians = response.xpath('//*[@id="publicdirectorycontainer"]/div[4]/div[1]/div/section/div[2]/div/div/div/div/div/small/span[2]//text()').get()
        print(numberPhysicians)
        if(numberPhysicians != '0'):
            Physician[0][5] = {"status": "VERIFIED"}
        else:
            Physician[0][5] = {"status": "NOT FOUND"}
    
            
            

    
 