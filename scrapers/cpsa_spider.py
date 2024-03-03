import scrapy
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from scrapy.selector import Selector 
from time import sleep

Physician = [['Tiffany', 'Lee', 'AB', 'College of Physicians and Surgeons of Alberta', 30901, 'INACTIVE'], ['Tiffany', 'Lee', 'AB', 'College of Physicians and Surgeons of PEI', 23447, 'INACTIVE']]

class AlbertaSpider(scrapy.Spider):
    name = 'Alberta'
    start_urls = ['https://search.cpsa.ca']

    def __init__(self):
        first = Physician[0][0]
        last = Physician[0][1]
        self.driver = webdriver.Chrome()
        self.driver.get('https://search.cpsa.ca')
        element1 = self.driver.find_element("name", "ctl00$MainContent$physicianSearchView$txtFirstName")
        element1.send_keys(first)
        element2 = self.driver.find_element("name", "ctl00$MainContent$physicianSearchView$txtLastName")
        element2.send_keys(last)
        element2.send_keys(Keys.RETURN)
        sleep(3)

    def parse(self, response):
        response = Selector(text = self.driver.page_source)
        # Change to not rely on xpath's as much
        notFound = response.xpath('//*[@id="MainContent_physicianSearchView_ResultsPanel"]/div[1]/div/h2//text()').get()
        if(notFound == 'Results: 1 matches'):
            link = self.driver.find_element("xpath", '//*[@id="MainContent_physicianSearchView_gvResults"]/tbody/tr[2]/td[1]/a')
            link.click()
            response = Selector(text = self.driver.page_source)
            active = response.xpath('//*[@id="Tab1Content"]/div[7]/div[2]/p//text()').get()
            inactive = response.xpath('//*[@id="Tab1Content"]/div[6]/div[2]/p//text()').get()
            if('Active' in active):
                Physician[0][5] = 'Verified'
            elif('Inactive' in inactive):
                Physician[0][5] = 'Inactive'
        elif(notFound == 'Results: 0 matches'):
            Physician[0][5] = 'Not Found'
        else:
            # To add functionality for if 2 people's names are the same
            Physician[0][5] = 'Not Found'
            # rows = self.driver.find_elements('xpath', '//table[@id="MainContent_physicianSearchView_gvResults"]//a')
            # for row in rows:
            #     links = row.get_attribute('href')
            #     links.click()
            #     number = self.driver.find_element("xpath", '//*[@id="Tab1Content"]/div[1]/div[2]/p')
            #     active = response.xpath('//*[@id="Tab1Content"]/div[7]/div[2]/p//text()').get()
            #     inactive = response.xpath('//*[@id="Tab1Content"]/div[6]/div[2]/p//text()').get()
            #     if('23447' in number):
            #         if('Active' in active):
            #             Physician[5] = 'Verified'
            #             break
            #         elif('Inactive' in inactive):
            #             Physician[5] = 'Inactive'
            #             break
            #     self.driver.back()
        
            
            

    
 