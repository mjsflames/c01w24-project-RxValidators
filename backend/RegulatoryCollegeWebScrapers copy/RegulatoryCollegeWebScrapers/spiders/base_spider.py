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

            # Send request, store the full name in metadata for verification process.
            yield scrapy.Request(
                url=req,
                callback=self.parse,
                meta=payload)
    
    def parse(self, response):
        """Provides generic response handling.
        Requires func handle_result to be implemented
        Requires func get_content to be implemented
        Requires func get_verification_filter to be implemented"""

        userdata = response.meta.get('userdata')
        # Exit on request failed
        if not response.status == 200:
            print("REQUEST FAILED.")
            return self.send_item(userdata, valid=False)
        
        # Load the response data into a list
        content = self.get_content(response)

        # Filter to specified person
        result = list(filter(
            self.get_verification_filter(userdata),
            content
        ))

        # Case: No results
        if len(result) == 0:
            print("Invalid or name not in registry.")
            return self.send_item(userdata, valid=False)
        
        # Case: Multiple results
        if len(result) > 1:
            print("Duplicate or several results found.")
            # ! TODO: Implement some form of response

        # Case: One result
        return self.handle_result(response, result)
    
    def get_content(self, response) -> dict:
        """Returns a dictionary from the response body
        """
        return json.loads(response.body)
    
    @abstractmethod
    def handle_result(self, response, result): 
        """Returns None or object depending on if validation is successful."""
        pass
    
    @abstractmethod
    def get_verification_filter(self, content): 
        """Returns lambda function to be passed into result filter for validating
        person"""
        pass
        
    @abstractmethod
    def build_query(self, data: dict[str, str]) -> str: 
        """Returns URL containing filled params from 'data' which will be passed
        into Scrapy.Request"""
        pass

    
    def send_item(self, userdata, valid):
        first_name, last_name = userdata
        yield ClientRegistryStatus(
            name=f"{first_name} {last_name}",
            valid=valid
        )