from scrapy import Spider, Request, FormRequest
from scrapyscript import Job, Processor
from bs4 import BeautifulSoup
import json

processor = Processor(settings={"LOG_ENABLED": False})

class CPSMSpider(Spider):
    name = 'cpsm_spider'
    base_url = 'https://member.cpsm.mb.ca/api/physicianprofile/'

    def __init__(self, last_name, first_name, *args, **kwargs):
        super(CPSMSpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name

    def start_requests(self):
        url = base_url + f"searchresult?lastname={self.last_name}&firstname={self.first_name}"
        yield Request(url, callback=self.parse)

    def parse(self, response):
        data = json.loads(response.text)
        if not data["items"]:
            yield {"status": "NOT FOUND"}
        else:
            id_no = data["items"][0]["links"][0]["parameters"]
            url = base_url + f"practitionerinformation?id={id_no}"
            yield Request(url, callback=self.after_submit)

    def after_submit(self, response):
        data = json.loads(response.text)
        status = data['membershipClass'].lower()
        if "regulated member" in status:
            yield {"status": "VERIFIED"}
        else:
            yield {"status": "INACTIVE"}

def cpsm_spider(last_name, first_name):
    job = Job(CPSMSpider, last_name, first_name)
    return processor.run(job)[0]["status"]

if __name__ == "__main__":
    print("Fake person test case:")
    print("Last Name: \"Willie\", First Name: \"Wonka\"")
    print(cpsm_spider("Willie", "Wonka"))

    print("Real person (active) test case:")
    print("Last Name: \"Roy\", First Name: \"Danielle\"")
    print(cpsm_spider("Roy", "Danielle"))

    print("Real person (inactive) test case:")
    print("Last Name: \"Adediji\", First Name: \"Uchechukwu Okwudili\"")
    print(cpsm_spider("Adediji", "Uchechukwu Okwudili"))