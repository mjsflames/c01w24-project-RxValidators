import pandas as pd
from pymongo import MongoClient


excel_file = 'PaRx Sample Data.xlsx'
website_dictionary = \
{
    "College of Physicians and Surgeons of British Columbia": "https://www.cpsbc.ca/public/registrant-directory",
    "College of Physicians and Surgeons of Ontario": "https://doctors.cpso.on.ca/?search=general",
    "College of Physicians and Surgeons of Saskatchewan": "https://www.cps.sk.ca/imis",
    "College of Physicians and Surgeons of Manitoba": "https://member.cpsm.mb.ca/member/profilesearch",
    "College of Physicians & Surgeons of Prince Edward Island": "https://www.cpspei.ca/physician-search/",
    "College of Physicians and Surgeons of Alberta": "https://search.cpsa.ca/",
    "College of Physicians and Surgeons of New Brunswick": "https://cpsnb.alinityapp.com/Client/PublicDirectory",
    "College of Physicians and Surgeons of Newfoundland and Labrador": "https://cpsnl.ca/physician-search/",
    "College of Physicians and Surgeons of Nova Scotia": "https://cpsnsphysiciansearch.azurewebsites.net/",
    "Collège des médecins du Québec": "https://www.cmq.org/fr/bottin"
}

