from scrapy import Spider, FormRequest
import json

class CPSPEISpider(Spider):
    name = 'cpspei_spider'
    start_urls = ['https://cpspei.alinityapp.com/client/publicdirectory']

    def __init__(self, last_name, first_name, license_no, *args, **kwargs):
        super(CPSPEISpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name
        self.license_no = license_no

    def start_requests(self):
        url = ['https://cpspei.alinityapp.com/client/publicdirectory']
        formdata = {
            "queryParameters": "{\"Parameter\":[{\"ID\":\"TextOptionA\",\"Value\":\"Rebecca\",\"ValueLabel\":\"[not entered]\"},{\"ID\":\"RegionSID\",\"Value\":\"-\",\"ValueLabel\":\"[not entered]\"},{\"ID\":\"IsCheckedOptionA\",\"Value\":\"\",\"ValueLabel\":\"[not entered]\"},{\"ID\":\"TextOptionB\",\"Value\":\"Muttart\",\"ValueLabel\":\"[not entered]\"},{\"ID\":\"CitySID\",\"Value\":\"\",\"ValueLabel\":\"[not entered]\"},{\"ID\":\"TextOptionC\",\"Value\":\"\",\"ValueLabel\":\"[not entered]\"},{\"ID\":\"SpecializationSID\",\"Value\":\"-\",\"ValueLabel\":\"[not entered]\"}]}", 
            "querySID": "1000608"
        }

        yield FormRequest(
            url,
            formdata=formdata,
            callback=self.parse
        )

    def parse(self, response):
        results = json.loads(response.body)["Records"]
        if len(results) == 1:
            return {"status": "VERIFIED"}
        else:
            return {"status": "NOT FOUND"}
   
            
            

    
 