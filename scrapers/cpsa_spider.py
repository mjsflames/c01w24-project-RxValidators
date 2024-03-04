from scrapy import Spider, Request
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import webbrowser

def get_request_link(last_name, first_name):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    url = "https://search.cpsa.ca/"
    driver.get(url)
    form_first = "MainContent_physicianSearchView_txtFirstName"
    form_last = "MainContent_physicianSearchView_txtLastName"
    form_submit = "MainContent_physicianSearchView_btnSearch"
    driver.find_element(by=By.ID, value=form_first).send_keys(first_name)
    driver.find_element(by=By.ID, value=form_last).send_keys(last_name)
    driver.find_element(by=By.ID, value=form_submit).click()
    time.sleep(2)
    number_sel = "#MainContent_physicianSearchView_ResultsPanel > " + \
                 "div.row.resultsHeader > div > h2"
    number_tag = driver.find_element(by=By.CSS_SELECTOR, value=number_sel).text
    no_of_results = int(number_tag.split()[1])

    if no_of_results == 0:
        return ""
    elif no_of_results == 1:
        url_sel = "#MainContent_physicianSearchView_gvResults > tbody > " + \
                  "tr:nth-child(2) > td.status4 > a"
        url_tag = driver.find_element(by=By.CSS_SELECTOR, value=url_sel)
        return url_tag.get_attribute("href")
    elif no_of_results > 1:
        return ""

class CPSASpider(Spider):
    name = "cpsa_spider"

    def __init__(self, last_name, first_name, *args, **kwargs):
        super(CPSASpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name

    def start_requests(self):
        url = get_request_link(self.last_name, self.first_name)
        if url:
            yield Request(url, callback=self.parse)
        else:
            yield {"status": "NOT FOUND"}

    def parse(self, response):
        status_xpath = '//*[@id="Tab1Content"]/div[7]/div[2]/p/text()'
        status = response.xpath(status_xpath).get().strip().lower()
        if "inactive" in status:
            return {"status": "INACTIVE"}
        else:
            return {"status": "VERIFIED"}
