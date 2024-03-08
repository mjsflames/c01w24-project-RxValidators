from scrapy import Spider, Request
import json


class CPSSSpider(Spider):
    name = "SaskRXValidator_Spider"
    API_URL = "https://www.cps.sk.ca/CPSSWebApi/api/Physicians/"

    def __init__(self, first_name, last_name, *args, **kwargs):
        super(CPSSSpider, self).__init__(*args, **kwargs)
        self.first_name = first_name
        self.last_name = last_name

    def build_query(self) -> str:
        first_name, last_name = [_.replace(" ", "+")
                                 for _ in [self.first_name, self.last_name]]
        return f'{self.API_URL}?name={last_name}'

    def get_verification_filter(self):
        return lambda item: item['FirstName'] == self.first_name and \
            (item['LastName'] == self.last_name or self.last_name == None)

    def start_requests(self):
        yield Request(url=self.build_query(), callback=self.parse)

    def parse(self, response):
        result = list(filter(self.get_verification_filter(),
                             json.loads(response.body)))

        if len(result) == 0:
            yield {"status": "NOT FOUND"}
