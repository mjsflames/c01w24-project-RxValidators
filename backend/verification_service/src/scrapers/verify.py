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
from twisted.internet import reactor

from billiard import Process  # fork of multiprocessing that works with celery
import collections
from scrapy.crawler import CrawlerRunner
import os 

# Subclass of scrapyscript Processor.
# The following modifications are:
# 1. Stripped Process() wrapping self._crawl in run method.
# 2. Added twisted reactor mods to make signals work outside of main thread.
class ProcessorHook(Processor):
    def _crawl(self, requests):
        """
        Parameters:
            requests (Request) - One or more Jobs. All will
                                 be loaded into a single invocation of the reactor.
        """
        self.crawler = CrawlerRunner(self.settings)

        # crawl can be called multiple times to queue several requests
        for req in requests:
            self.crawler.crawl(req.spider, *req.args, **req.kwargs)
        self.crawler.addBoth(lambda _: reactor.stop())
        reactor.run(0)
        self.crawler.start()
        self.crawler.stop()
        self.results.put(self.items)
        
    def run(self, jobs):
        """Start the Scrapy engine, and execute all jobs.  Return consolidated results
        in a single list.

        Parms:
          jobs ([Job]) - one or more Job objects to be processed.

        Returns:
          List of objects yielded by the spiders after all jobs have run.
        """
        if not isinstance(jobs, collections.abc.Iterable):
            jobs = [jobs]
        self.validate(jobs)

        self._crawl(jobs)
        results = self.results.get()

        return results

processor = Processor(settings={"LOG_ENABLED": False})
if os.name == "nt": 
    print("Running on Windows")
    processor = ProcessorHook()

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
