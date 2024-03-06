from scrapy import Spider, FormRequest, Request
import webbrowser

class CPSASpider(Spider):
    name = "cpsa_spider"

    def __init__(self, last_name, first_name, *args, **kwargs):
        super(CPSASpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name

    def start_requests(self):
        url = "https://search.cpsa.ca/"
        yield Request(
            url, callback=self.parse
        )

    def parse(self, response):
        cookies = {
            "ASP.NET_SessionId": "tu41v1bckwlhxoib0ysp4pa3"
        }
        formdata = {
            "ctl00$ctl16": "ctl00$ctl16|ctl00$MainContent$physicianSearchView$btnSearch",
            "ctl00$MainContent$physicianSearchView$txtFirstName": "Anne-Josee",
            "ctl00$MainContent$physicianSearchView$txtLastName": "Cote",
        }
        yield FormRequest(
            url=response.url,
            formdata=formdata,
            cookies=cookies,
            callback=self.after_submit
        )

    def after_submit(self, response):
        with open('result.html', 'wb') as f:
            f.write(response.body)
        webbrowser.open('result.html')
