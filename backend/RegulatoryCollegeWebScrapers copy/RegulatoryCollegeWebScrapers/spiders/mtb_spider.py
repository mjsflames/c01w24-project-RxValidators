from spiders.base_spider import BaseSpider
import scrapy
import json


class MtbSpider(BaseSpider):
    name = "MtbRXValidator_Spider"
    API_URL = "https://member.cpsm.mb.ca/api/physicianprofile/"

    def build_query(self, data: dict[str, object]) -> str:
        fullname = data.get("userdata", ("No", "Result"))
        # Unpack and format for GET request
        first_name, last_name = [_.replace(" ", "+") for _ in fullname]
        return f'{self.API_URL}searchresult?lastname={last_name}&firstname={first_name}'

    def build_infoquery(self, id: str) -> str:
        return self.API_URL+f'practitionerinformation?id={id}'

    def get_verification_filter(self, content):
        """Return True on first name match and either last name 
        match or last name not specified"""
        first_name, last_name = content
        return lambda item: item['descriptions'][1] == first_name and \
            (item['descriptions'][0] == last_name or last_name == None)

    def get_content(self, response): return json.loads(response.body)['items']

    def handle_result(self, response, result):
        id = result[0]['links'][0]['parameters']
        inforeq = self.build_infoquery(id)

        yield scrapy.Request(
            url=inforeq,
            callback=self.parse_info,
            meta={**response.meta, 'result': result})

    def parse_info(self, response):
        if not response.status == 200:
            return print("REQUEST FAILED.")

        content = json.loads(response.body)
        valid = "Regulated Member" in content['membershipClass']

        return self.send_item(response.meta.get('userdata'), valid=valid)
