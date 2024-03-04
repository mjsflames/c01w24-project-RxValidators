from scrapy import Spider, Request

class CPSASpider(Spider):
    name = "cpsa_spider"
    
    def __init__(self, last_name, first_name, url, *args, **kwargs):
        super(CPSASpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name
        self.start_urls = [url]

    def parse(self, response):
        status_xpath = '//*[@id="Tab1Content"]/div[7]/div[2]/p/text()'
        status = response.xpath(status_xpath).get().strip().lower()
        if "inactive" in status:
            return {"status": "INACTIVE"}
        else:
            return {"status": "VERIFIED"}
