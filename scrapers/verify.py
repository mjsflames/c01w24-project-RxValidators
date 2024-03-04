from scrapyscript import Job, Processor

from .cpsbc_spider import CPSBCSpider
from .cpso_spider import CPSOSpider
from .cmq_spider import cmq_helper
from .cpsm_spider import CPSMSpider
from .cpsns_spider import CPSNSSpider
from .cpspei_spider import CPSPEISpider
from .cpsnb_spider import CPSNBSpider
from .cpsa_spider import CPSASpider, cpsa_helper
from .cpsnl_spider import CPSNLSpider
from .cpss_spider import CPSSSpider

processor = Processor(settings={"LOG_ENABLED": False})

def verify(last_name, first_name, license_no, province):
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

if __name__ == "__main__":
    print("Testing ...")
    # print(cpsa_helper("Chiu", "Anthony"))

    # print(cpspei_spider("Wonka", "Willie", "7646"))
    # print(cpspei_spider("Muttart", "Rebecca", "7646"))

    # print(cmq_spider("Wonka", "15332"))
    # print(cmq_spider("Lam", "96332"))
    # print(cmq_spider("Li", "15332"))

    # # College of Physicians and Surgeons of Newfoundland and Labrador
    # print(cpsnl_spider("Wonka", "Willie")) # NOT FOUND
    # print(cpsnl_spider("Pieroway", "Amy")) # VERIFIED
    # print(cpsnl_spider("Singleton-Polster", "Amy")) # INACTIVE

    # print(cpsa_spider("Chivers-Wilson", "Kaitlin"))
    # print(cpsa_spider("Chiu", "Anthony"))
    # print(cpsa_spider("Chiu", "Anthony"))
    # print(cpsa_spider("Cote", "Anne-Josee"))

    # print(cpsnb_spider("Taylor", "Kathleen", "7806"))
    # print(cpsnb_spider("Wangui", "Linda", "10171"))
    # print(cpsnb_spider("Stone", "Christopher", "7563"))
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