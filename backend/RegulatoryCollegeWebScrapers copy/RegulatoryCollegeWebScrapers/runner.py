# Handles assigning tasks to the spiders as well as initiates crawling

import os
from scrapy.crawler import CrawlerProcess
from spiders import sask_spider, mtb_spider

process = CrawlerProcess(
    settings={
        "FEEDS": {
            "items.json": {"format": "json"},
        },
    }
)


distributor = {
    "College of Physicians and Surgeons of Saskatchewan": sask_spider.SaskSpider,
    # "College of Physicians and Surgeons of Manitoba": mtb_spider.MtbSpider
}

spider_assignments = {key: [] for key in distributor.keys()}

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, '../sample.txt')


# Load assignments
with open(filename, "r") as f:
    for raw_line in f:
        line = raw_line.strip()
        
        try:
            first_name, last_name, province, college = line.split(", ")
            if college in distributor:
                # ? Better to define a type and just load everything (or filter)
                spider_assignments[college].append((first_name, last_name))
        except:
            print("Skipping line", line)

# Run spiders
for college, spider in distributor.items():
    process.crawl(spider, user_info=spider_assignments.get(college))

process.start()

# FAKE_RX = [("Smarth","Kaul")]
# REAL_RX = [("Audrey","Van Zanten"), ("Ben", "Thistlewood")]
# process.crawl(sask_spider.SaskSpider, user_info=REAL_RX + FAKE_RX)

# REAL_RX = [("Danielle", "Roy")]
# process.crawl(mtb_spider.MtbSpider, user_info=REAL_RX + FAKE_RX)

# process.start()
