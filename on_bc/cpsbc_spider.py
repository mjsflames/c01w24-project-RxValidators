from scrapy import Spider, Request, FormRequest
from scrapyscript import Job, Processor
from bs4 import BeautifulSoup

processor = Processor(settings={"LOG_ENABLED": False})

class CPSBCSpider(Spider):
    name = 'cpsbc_spider'

    def __init__(self, last_name, first_name, *args, **kwargs):
        super(CPSBCSpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name

    def start_requests(self):
        url = "https://www.cpsbc.ca/public/registrant-directory?ajax_form=1&_wrapper_format=drupal_ajax"
        data = {
            "form_id": "cpsbc_directory_form",
            "ps_last_name": self.last_name,
            "ps_first_name": self.first_name,
            "_triggering_element_name": "op"
        }
        yield FormRequest(url, formdata=data, callback=self.parse)

    def parse(self, response):
        url = "https://www.cpsbc.ca/public/registrant-directory/search-result"
        headers = {
            "User-Agent": "Mozilla/5.0",
            "Host": "www.cpsbc.ca"
        }
        meta = {'dont_redirect': True,'handle_httpstatus_list': [302]}
        cookies = {}
        for cookie in response.headers.getlist('Set-Cookie'):
            cookie_name, cookie_value = cookie.decode('utf-8').split(';')[0].split('=')
            cookies[cookie_name] = cookie_value
        yield Request(url, headers=headers, meta=meta, cookies=cookies, callback=self.after_submit)

    def after_submit(self, response):
        soup = BeautifulSoup(response.text, 'html.parser')

        check = soup.find('span', class_='text-mid-blue')
        if check:
            check = int(check.text)
        else:
            check = 0

        found = False
        found_result = None

        if check >= 1:
            results = soup.findAll('div', class_='shadow shadow-hover rounded result-item')
            for result in results:
                if check == 1:
                    found = True
                    found_result = result
                    break
                a_tag = result.find('a')
                for span in a_tag.find_all('span'):
                    span.decompose()
                scraped_names = a_tag.text.strip().split(",")
                scraped_last_name = scraped_names[0].strip()
                scraped_first_name = scraped_names[1].strip()
                if check > 1 and \
                scraped_last_name == self.last_name and \
                scraped_first_name == self.first_name:
                    found = True
                    found_result = result
                    break

        if found:
            status = found_result.find('div', class_='ps-contact__element mt-2').text.lower()
            if "practising" in status:
                return {"status": "VERIFIED"}
            else:
                return {"status": "INACTIVE"}
        return {"status": "NOT FOUND"}

def cpsbc_spider(last_name, first_name):
    job = Job(CPSBCSpider, last_name, first_name)
    return processor.run(job)[0]["status"]

if __name__ == "__main__":
    print("Fake person test case:")
    print("Last Name: \"Keen\", First Name: \"Anthony\"")
    print(cpsbc_spider("Keen", "Anthony"))

    print("Real person (active) test case:")
    print("Last Name: \"Gill\", First Name: \"Amanpreet\"")
    print(cpsbc_spider("Gill", "Amanpreet"))

    print("Real person (expired) test case:")
    print("Last Name: \"Aalto\", First Name: \"Anu\"")
    print(cpsbc_spider("Aalto", "Anu"))

    print("Multiple real people with matchin name test case:")
    print("Last Name: \"Zhou\", First Name: \"Jian\"")
    print(cpsbc_spider("Zhou", "Jian"))