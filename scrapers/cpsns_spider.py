from scrapy import Spider, FormRequest
from scrapyscript import Job, Processor
import webbrowser

processor = Processor(settings={"LOG_ENABLED": False})

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
        with open('results.html', 'wb') as f:
            f.write(response.body)
        webbrowser.open('results.html')

def cpsns_spider(last_name, first_name, liscence_no):
    job = Job(CPSNSSpider, last_name, first_name, liscence_no)
    return processor.run(job)

if __name__ == "__main__":
    print(cpsns_spider('Martin', 'Louis', '18808'))

"""
import requests
import webbrowser

url = "https://cpsnsphysiciansearch.azurewebsites.net/SearchResults.aspx"

payload = 'firstname=Louis&lastname=Martin&licencenumber=18808'
headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.post(url, headers=headers, data=payload)

with open('results.html', 'wb') as f:
    f.write(response.content)
webbrowser.open('results.html')
"""