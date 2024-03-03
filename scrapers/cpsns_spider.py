from scrapy import Spider, FormRequest
import webbrowser

class CPSNSSpider(Spider):
    name = 'cpsns_spider'

    def __init__(self, last_name, first_name, liscence_no, *args, **kwargs):
        super(CPSNSSpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name
        self.liscence_no = liscence_no

    def start_requests(self):
        url = 'https://cpsnsphysiciansearch.azurewebsites.net/SearchResults.aspx'
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        formdata = {
            'firstname': self.first_name,
            'lastname': self.last_name,
            'licencenumber': self.liscence_no
        }
        yield FormRequest(url=url, headers=headers, formdata=formdata, callback=self.save_results)

    def save_results(self, response):
        xpath_expression = '//*[@id="grid-basic"]/tbody/tr[1]/td[2]/span/text()'

        extracted_text = response.xpath(xpath_expression).get()

        if extracted_text == None:
          return {"status": "VERIFIED"}
        else:
          return {"status": "NOT FOUND"}