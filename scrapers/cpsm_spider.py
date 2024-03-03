from scrapy import Spider, Request
import json


class MtbSpider(Spider):
    name = "MtbRXValidator_Spider"
    API_URL = "https://member.cpsm.mb.ca/api/physicianprofile/"

    def __init__(self, first_name, last_name, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.first_name = first_name
        self.last_name = last_name

    def start_requests(self):
        first_name, last_name = [_.replace(" ", "+")
                                 for _ in [self.first_name, self.last_name]]
        query = f'{self.API_URL}searchresult?lastname={
            last_name}&firstname={first_name}'

        yield Request(url=query, callback=self.parse)

    def on_error(self, failure):
        # print("Error: ", failure)
        yield {"status": "FAILED"}

    def get_verification_filter(self, item):
        return item['descriptions'][1] == self.first_name and \
            (item['descriptions'][0] == self.last_name or self.last_name == None)

    def parse_info(self, response):
        if not response.status == 200:
            yield {"status": "FAILED"}
        content = json.loads(response.body)
        valid = "Regulated Member" in content['membershipClass']

        yield {"status": ["INACTIVE", "ACTIVE"][valid]}

    def parse(self, response):
        if not response.status == 200:
            return self.on_error(response)
        result = list(filter(self.get_verification_filter,
                      json.loads(response.body)['items']))

        if len(result) == 0:
            # print("Invalid or name not in registry.")
            return {"status": "INACTIVE"}
        # elif len(result) > 1:  # Case: One result
            # print("Duplicate or several results found.")
        # print(f"Result for {self.first_name} {self.last_name}")

        id = result[0]['links'][0]['parameters']
        inforeq = f"{self.API_URL}practitionerinformation?id={id}"
        yield Request(url=inforeq, callback=self.parse_info)
