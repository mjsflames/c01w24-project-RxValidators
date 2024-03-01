from spiders.base_spider import BaseSpider


class SaskSpider(BaseSpider):
    name = "SaskRXValidator_Spider"
    API_URL = "https://www.cps.sk.ca/CPSSWebApi/api/Physicians/"

    def build_query(self, data: dict[str, object]) -> str:
        fullname = data.get("userdata", ("No", "Result"))
        # Unpack and format for GET request
        first_name, last_name = [_.replace(" ", "+") for _ in fullname]
        return f'{self.API_URL}?name={first_name}+{last_name}'

    def get_verification_filter(self, content):
        """Return True on first name match and either last name 
            match or last name not specified"""
        first_name, last_name = content
        return lambda item: item['FirstName'] == first_name and \
            (item['LastName'] == last_name or last_name == None)

    def handle_result(self, response, result):
        return self.send_item(response.meta.get('userdata'), result[0]['Status'] == 'A')
