from scrapy import Spider, FormRequest, Request
import webbrowser

class CPSASpider(Spider):
    name = "cpsa_spider"
    start_urls = ["https://search.cpsa.ca/"]

    def __init__(self, last_name, first_name, *args, **kwargs):
        super(CPSASpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name
        self.cookies = {}

    def parse_cookies(self, response):
        for cookie in response.headers.getlist('Set-Cookie'):
            cookie_name, cookie_value = cookie.decode('utf-8').split(';')[0].split('=')
            self.cookies[cookie_name] = cookie_value
        print(self.cookies)

    def parse(self, response):
        callback = None
        if self.cookies == {}:
            callback = self.parse
            self.parse_cookies(response)
        else:
            callback = self.after_submit
        formdata = {
            "ctl00$ctl16": "ctl00$ctl16|ctl00$MainContent$physicianSearchView$btnSearch",
            "ctl00$MainContent$physicianSearchView$txtFirstName": self.first_name,
            "ctl00$MainContent$physicianSearchView$txtLastName": self.last_name
        }
        yield FormRequest.from_response(
            response, cookies=self.cookies, formdata=formdata, callback=callback
        )

    def after_submit(self, response):
        with open('result.html', 'wb') as f:
            f.write(response.body)
        webbrowser.open('result.html')