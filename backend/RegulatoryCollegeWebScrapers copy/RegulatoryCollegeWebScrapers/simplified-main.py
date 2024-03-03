# Handles assigning tasks to the spiders as well as initiates crawling

import logging
import os
from spiders.simplified import sask_spider, mtb_spider
from scrapyscript import Job,  Processor

distributor = {
    # "College of Physicians and Surgeons of Saskatchewan": sask_spider.SaskSpider,
    "College of Physicians and Surgeons of Manitoba": mtb_spider.MtbSpider
}

processor = Processor(settings={"LOG_ENABLED": False})


def run_spider(spider, first_name, last_name):
    job = Job(spider, first_name, last_name)
    result = processor.run(job)

    print(result)


dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, '../sample.txt')

# Hide logging stuff
logging.getLogger('scrapy').setLevel(logging.WARNING)

# Load assignments
with open(filename, "r") as f:
    for raw_line in f:
        line = raw_line.strip()

        try:
            first_name, last_name, province, college = line.split(", ")
            if college in distributor:
                # ? Better to define a type and just load everything (or filter)
                # spider_assignments[college].append((first_name, last_name))
                print(f"{first_name} {last_name}")
                run_spider(distributor[college], first_name, last_name)
        except:
            print("Skipping line", line)
