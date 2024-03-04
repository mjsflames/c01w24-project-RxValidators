from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import webbrowser

def cpsa_spider(last_name, first_name):
    url = "https://search.cpsa.ca/"
    driver = webdriver.Chrome()
    driver.get(url)
    form_first = "MainContent_physicianSearchView_txtFirstName"
    form_last = "MainContent_physicianSearchView_txtLastName"
    form_submit = "MainContent_physicianSearchView_btnSearch"
    driver.find_element(by=By.ID, value=form_first).send_keys(first_name)
    driver.find_element(by=By.ID, value=form_last).send_keys(last_name)
    driver.find_element(by=By.ID, value=form_submit).click()
    time.sleep(5)
    page_source = driver.page_source
    driver.quit()
    save_and_display_page(page_source)

def save_and_display_page(response):
	with open('result.html', 'w', encoding='utf-8') as f:
		f.write(response)
	webbrowser.open('result.html')


    # def fill_form(self, response):
    #     # with open('result.html', 'wb') as f:
    #     #     f.write(response.body)
    #     # webbrowser.open('result.html')
    #     form_first = "ctl00_MainContent_physicianSearchView_txtFirstName"
    #     form_last = "ctl00_MainContent_physicianSearchView_txtLastName"
    #     driver = response.request.meta['driver']
    #     driver.find_element_by_id(form_first).send_keys(self.first_name)
    #     driver.find_element_by_id(form_last).send_keys(self.last_name)
    #     driver.find_element_by_id("ctl00_ctl16").click()
    #     yield SeleniumRequest(
    #         url=driver.current_url, callback=self.parse_result
    #     )

