from scrapyscript import Job, Processor

from .spiders.cpsbc_spider import CPSBCSpider
from .spiders.cpso_spider import CPSOSpider
from .spiders.cmq_spider import cmq_helper
from .spiders.cpsm_spider import CPSMSpider
from .spiders.cpsns_spider import CPSNSSpider
from .spiders.cpspei_spider import CPSPEISpider
from .spiders.cpsnb_spider import CPSNBSpider
from .spiders.cpsa_spider import CPSASpider, cpsa_helper
from .spiders.cpsnl_spider import CPSNLSpider
from .spiders.cpss_spider import CPSSSpider

processor = Processor(settings={"LOG_ENABLED": False})


def verify(last_name="", first_name="", license_no="", province=""):
    if province == "BC":
        job = Job(CPSBCSpider, last_name, first_name)
        return processor.run(job)[0]["status"]
    elif province == "ON":
        job = Job(CPSOSpider, last_name, first_name, license_no)
        return processor.run(job)[0]["status"]
    elif province == "SK":
        job = Job(CPSSSpider, first_name, last_name)
        return processor.run(job)[0]["status"]
    elif province == "MB":
        job = Job(CPSMSpider, last_name, first_name)
        return processor.run(job)[0]["status"]
    elif province == "PE":
        job = Job(CPSPEISpider, last_name, first_name, license_no)
        return processor.run(job)[0]["status"]
    elif province == "AB":
        url = cpsa_helper(last_name, first_name)
        if url:
            job = Job(CPSASpider, last_name, first_name, url)
            return processor.run(job)[0]["status"]
        else:
            return "NOT FOUND"
    elif province == "NB":
        job = Job(CPSNBSpider, last_name, first_name, license_no)
        return processor.run(job)[0]["status"]
    elif province == "NL":
        job = Job(CPSNLSpider, last_name, first_name)
        return processor.run(job)[0]["status"]
    elif province == "NS":
        job = Job(CPSNSSpider, last_name, first_name, license_no)
        return processor.run(job)[0]["status"]
    elif province == "QC":
        return cmq_helper(last_name, license_no)
    else:
        print("Invalid province provided")
