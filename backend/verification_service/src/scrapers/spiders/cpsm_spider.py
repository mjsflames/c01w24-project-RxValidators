from scrapy import Spider, Request
import json

class CPSMSpider(Spider):
    name = 'cpsm_spider'
    base_url = 'https://member.cpsm.mb.ca/api/physicianprofile'

    def __init__(self, last_name, first_name, *args, **kwargs):
        super(CPSMSpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name

    def start_requests(self):
        url = f"{self.base_url}/searchresult?lastname={self.last_name}&firstname={self.first_name}"
        yield Request(url, callback=self.parse)

    def parse(self, response):
        data = json.loads(response.text)
        if not data["items"]:
            yield {"status": "NOT FOUND"}
        else:
            id_no = data["items"][0]["links"][0]["parameters"]
            url = f"{self.base_url}/practitionerinformation?id={id_no}"
            yield Request(url, callback=self.after_submit)

    def after_submit(self, response):
        data = json.loads(response.text)
        status = data['membershipClass'].lower()
        if "regulated member" in status:
            yield {"status": "VERIFIED"}
        else:
            yield {"status": "INACTIVE"}