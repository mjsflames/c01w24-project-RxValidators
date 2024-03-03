from scrapy import Spider, FormRequest
import webbrowser

import logging
logging.getLogger('scrapy.core.engine').setLevel(logging.DEBUG)

class CPSASpider(Spider):
    name = "cpsa_spider"
    start_urls = ["https://search.cpsa.ca/"]

    def __init__(self, last_name, first_name, *args, **kwargs):
        super(CPSASpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name

    def parse(self, response):
        headers = {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': 'Mozilla',
            'Cookie': 'ASP.NET_SessionId=hrjxaaeymev0fkjmshuw3poo'
        }
        yield FormRequest(url="https://search.cpsa.ca/", headers=headers, callback=self.parse_results)

    def parse_results(self, response):
        with open('result.html', 'wb') as f:
            f.write(response.body)
        webbrowser.open('result.html')


"""

    def parse(self, response):
        # Extract cookie from the response headers if available
        set_cookie_header = response.headers.getlist('Set-Cookie')
        cookie = set_cookie_header[0].decode('utf-8').split(';')[0] if set_cookie_header else None

        formdata = {
            'ctl00tl16': 'ctl00tl16%7Cctl00%24MainContent%24physicianSearchViewtnSearch',
            '__EVENTTARGET': 'ctl00%24MainContent%24physicianSearchViewtnSearch',
            'ctl00$MainContent$physicianSearchView$txtFirstName': 'Kaitlin',
            'ctl00$MainContent$physicianSearchView$txtLastName': 'Chivers-Wilson',
            'ctl00$MainContent$physicianSearchView$txtCity': '',
            'ctl00$MainContent$physicianSearchView$txtPostalCode': '',
            'ctl00$MainContent$physicianSearchView$rblPractice': '',
            'ctl00$MainContent$physicianSearchView$ddDiscipline': '',
            'ctl00$MainContent$physicianSearchView$rblGender': '',
            'ctl00$MainContent$physicianSearchView$ddApprovals': '',
            'ctl00$MainContent$physicianSearchView$ddLanguage': '',
        }

        headers = {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        }
        
        # Include cookie in headers if available
        if cookie:
            headers['Cookie'] = cookieimport requests
import webbrowser

url = "https://search.cpsa.ca/"

payload = {}
headers = {
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Cookie': 'ASP.NET_SessionId=hrjxaaeymev0fkjmshuw3poo'
}

response = requests.request("POST", url, headers=headers, data=payload)

with open('result.html', 'w') as f:
    f.write(response.text)
webbrowser.open('result.html')

        yield FormRequest.from_response(
            response, formid='ctl01', headers=headers, formdata=formdata, callback=self.parse_results
        )

"""


"""
import requests
import webbrowser

url = "https://search.cpsa.ca/"

payload = {}
headers = {
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Cookie': 'ASP.NET_SessionId=hrjxaaeymev0fkjmshuw3poo'
}

response = requests.request("POST", url, headers=headers, data=payload)

with open('result.html', 'w') as f:
    f.write(response.text)
webbrowser.open('result.html')
"""