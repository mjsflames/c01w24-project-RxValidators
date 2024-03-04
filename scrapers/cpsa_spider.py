from scrapy import Spider, FormRequest
import webbrowser

class CPSASpider(Spider):
    name = "cpsa_spider"
    start_urls = ["https://search.cpsa.ca/"]

    def __init__(self, last_name, first_name, *args, **kwargs):
        super(CPSASpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name

    def parse(self, response):
        cookies = {
            "ASP.NET_SessionId": "fuvjvy22iexxxolyn303bpze"
        }
        formdata = {
            "ctl00$MainContent$physicianSearchView$txtFirstName": "Anthony",
            "ctl00$MainContent$physicianSearchView$txtLastName": "Chiu"
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
