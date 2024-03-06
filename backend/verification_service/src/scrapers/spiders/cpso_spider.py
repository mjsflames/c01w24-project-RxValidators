from scrapy import Spider, FormRequest

class CPSOSpider(Spider):
    name = "cpso_spider"
    start_urls = ["https://doctors.cpso.on.ca/?search=general"]

    def __init__(self, last_name, first_name, cpso_number, *args, **kwargs):
        super(CPSOSpider, self).__init__(*args, **kwargs)
        self.last_name = last_name
        self.first_name = first_name
        self.cpso_number = cpso_number

    def parse(self, response):
        formdata = {
            "p$lt$ctl01$pageplaceholder$p$lt$ctl02$CPSO_AllDoctorsSearch$txtCPSONumberGeneral": self.cpso_number,
            "p$lt$ctl01$pageplaceholder$p$lt$ctl02$CPSO_AllDoctorsSearch$txtLastName": self.last_name,
            "p$lt$ctl01$pageplaceholder$p$lt$ctl02$CPSO_AllDoctorsSearch$txtFirstName": self.first_name,
            "p$lt$ctl01$pageplaceholder$p$lt$ctl02$CPSO_AllDoctorsSearch$chkActiveDoctors": "on",
            "p$lt$ctl01$pageplaceholder$p$lt$ctl02$CPSO_AllDoctorsSearch$chkInactiveDoctors": "on",
            "p$lt$ctl01$pageplaceholder$p$lt$ctl02$CPSO_AllDoctorsSearch$btnSubmit1": "Submit"
        }
        yield FormRequest.from_response(
            response, formdata=formdata, callback=self.after_submit
        )

    def after_submit(self, response):
        full_name = response.css('h1#docTitle::text').get()
        if full_name:
            scraped_names = full_name.strip().split(",")
            scraped_last_name = scraped_names[0].strip()
            scraped_first_name = scraped_names[1].strip()
            if self.last_name not in scraped_last_name:
                return {"status": "NOT FOUND"}
            if self.first_name not in scraped_first_name:
                return {"status": "NOT FOUND"}
        status = response.css('div.columns.medium-6.text-align--right strong::text').get()
        if status:
            status = status.lower()
            if "active member" in status:
                return {"status": "VERIFIED"}
            else:
                return {"status": "INACTIVE"}
        return {"status": "NOT FOUND"}