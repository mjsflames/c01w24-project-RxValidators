from abc import abstractmethod
import scrapy
import json
from items import ClientRegistryStatus


class BaseSpider(scrapy.Spider):
    API_URL: str
    user_info: list

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_info = kwargs.get('user_info')

    def start_requests(self):
        for userdata in self.user_info:
            payload = {"userdata": userdata}
            req = self.build_query(payload)
            yield scrapy.Request(url=req, callback=self.parse, meta=payload)

    def on_error(self, failure):
        print("Error: ", failure)
        return self.send_item(failure.request.meta.get('userdata'), valid=False, error=True)

    def parse(self, response):
        """Provides generic response handling.
        Requires funcs: handle_result, get_content, get_verification_filter
        to be implemented"""

        userdata = response.meta.get('userdata')

        # Exit on request failed
        if not response.status == 200:
            print("REQUEST FAILED.")
            return self.on_error(response)

        # Filter to specified person
        result = list(filter(self.get_verification_filter(userdata),
                             self.get_content(response)))

        match len(result):
            case 0:  # Case: One Result
                print("Invalid or name not in registry.")
                return self.send_item(userdata, valid=False)
            case 1:  # Case: One result
                print(f"Result for {userdata}")
            case _:  # Case: Multiple results (IGNORE AND CONTINUE)
                print("Duplicate or several results found.")
                # ! TODO: Implement some form of response

        return self.handle_result(response, result)

    def get_content(self, response) -> dict:
        """Returns a dictionary from the response body"""
        return json.loads(response.body)

    def send_item(self, userdata, valid):
        first_name, last_name = userdata
        yield ClientRegistryStatus(name=f"{first_name} {last_name}", valid=valid)

    @abstractmethod
    def handle_result(self, response, result):
        """Returns None or object depending on if validation is successful."""
        pass

    @abstractmethod
    def get_verification_filter(self, content):
        """Returns lambda function to be passed into result filter for validating person"""
        pass

    @abstractmethod
    def build_query(self, data: dict[str, str]) -> str:
        """Returns URL containing filled params from 'data' which will be passed
        into Scrapy.Request"""
        pass
