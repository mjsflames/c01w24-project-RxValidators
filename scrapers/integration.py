from scrapyscript import Job, Processor

from cpsbc_spider import CPSBCSpider
from cpso_spider import CPSOSpider
from cmq_spider import cmq_spider
from cpsm_spider import CPSMSpider
from cpsns_spider import CPSNSSpider
from cpspei_spider import CPSPEISpider
from cpsnb_spider import CPSNBSpider
from cpsa_spider import CPSASpider
from cpsnl_spider import CPSNLSpider
from cpss_spider import CPSSSpider

processor = Processor(settings={"LOG_ENABLED": False})

def cpsbc_spider(last_name, first_name):
    job = Job(CPSBCSpider, last_name, first_name)
    return processor.run(job)[0]["status"]

def cpso_spider(last_name, first_name, cpso_number):
    job = Job(CPSOSpider, last_name, first_name, cpso_number)
    return processor.run(job)[0]["status"]

def cpsm_spider(last_name, first_name):
    job = Job(CPSMSpider, last_name, first_name)
    return processor.run(job)[0]["status"]

def cpsns_spider(last_name, first_name, license_no):
    job = Job(CPSNSSpider, last_name, first_name, license_no)
    return processor.run(job)[0]["status"]

def cpspei_spider(last_name, first_name, license_no):
    job = Job(CPSPEISpider, last_name, first_name, license_no)
    return processor.run(job)[0]["status"]

def cpsa_spider(last_name, first_name):
    job = Job(CPSASpider, last_name, first_name)
    return processor.run(job)

def cpsnl_spider(last_name, first_name):
    job = Job(CPSNLSpider, last_name, first_name)
    return processor.run(job)[0]["status"]

def cpss_spider(last_name, first_name):
    job = Job(CPSSSpider, first_name, last_name)
    return processor.run(job)[0]["status"]

def cpsnb_spider(last_name, first_name, license_no):
    job = Job(CPSNBSpider, last_name, first_name, license_no)
    return processor.run(job)[0]["status"]

if __name__ == "__main__":
    print("Testing ...")

    # print(cmq_spider("Wonka", "15332"))
    # print(cmq_spider("Lam", "96332"))
    # print(cmq_spider("Li", "15332"))

    # # College of Physicians and Surgeons of Newfoundland and Labrador
    # print(cpsnl_spider("Wonka", "Willie")) # NOT FOUND
    # print(cpsnl_spider("Pieroway", "Amy")) # VERIFIED
    # print(cpsnl_spider("Singleton-Polster", "Amy")) # INACTIVE

    # print(cpsa_spider("Chivers-Wilson", "Kaitlin"))

    # print(cpsnb_spider("Taylor", "Kathleen", "7806"))
    # print(cpsnb_spider("Wangui", "Linda", "10171"))
    print(cpsnb_spider("Stone", "Christopher", "7563"))
    # print(cpsns_spider('Martin', 'Louis', '18808'))

    # print("Fake person test case:")
    # print("Last Name: \"Keen\", First Name: \"Anthony\"")
    # print(cpsbc_spider("Keen", "Anthony"))

    # print("Real person (active) test case:")
    # print("Last Name: \"Gill\", First Name: \"Amanpreet\"")
    # print(cpsbc_spider("Gill", "Amanpreet"))

    # print("Real person (expired) test case:")
    # print("Last Name: \"Aalto\", First Name: \"Anu\"")
    # print(cpsbc_spider("Aalto", "Anu"))

    # print("Multiple real people with matchin name test case:")
    # print("Last Name: \"Zhou\", First Name: \"Jian\"")
    # print(cpsbc_spider("Zhou", "Jian"))

    # print("Fake person test case:")
    # print("Last Name: \"Willie\", First Name: \"Wonka\", CPSO #: 694201")
    # print(cpso_spider("Willie", "Wonka", "694201"))

    # print("Fake person, real id test case:")
    # print("Last Name: \"Pins\", First Name: \"Gregory\", CPSO #: 54111")
    # print(cpso_spider("Pins", "Gregory", "54111"))

    # print("Real person (active) test case:")
    # print("Last Name: \"Edwards\", First Name: \"Bonnie\", CPSO #: 30722")
    # print(cpso_spider("Edwards", "Bonnie", "30722"))

    # print("Real person (expired) test case:")
    # print("Last Name: \"Fraser\", First Name: \"Robert\", CPSO #: 25614")
    # print(cpso_spider("Fraser", "Robert", "25614"))

    # print("Fake person test case:")
    # print("Last Name: \"Willie\", First Name: \"Wonka\"")
    # print(cpsm_spider("Willie", "Wonka"))

    # print("Real person (active) test case:")
    # print("Last Name: \"Roy\", First Name: \"Danielle\"")
    # print(cpsm_spider("Roy", "Danielle"))

    # print("Real person (inactive) test case:")
    # print("Last Name: \"Adediji\", First Name: \"Uchechukwu Okwudili\"")
    # print(cpsm_spider("Adediji", "Uchechukwu Okwudili"))