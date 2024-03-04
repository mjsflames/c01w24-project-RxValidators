import pytest
from scrapers.verify import verify

VERIFIED, INACTIVE, NOT_FOUND = "VERIFIED", "INACTIVE", "NOT FOUND"

@pytest.mark.parametrize("last_name, first_name, license_no, province, expected_result", [
    # British Columbia
    ("Keen", "Anthony", "", "BC", NOT_FOUND),
    ("Gill", "Amanpreet", "", "BC", VERIFIED),
    ("Aalto", "Anu", "", "BC", INACTIVE),
    ("Gill", "Jasdeep", "", "BC", VERIFIED), # Multiple search results - active
    ("Zhou", "Jian", "", "BC", INACTIVE), # Multiple search results - inactive
    
    # Ontario
    ("Willie", "Wonka", "694201", "ON", NOT_FOUND),
    ("Pins", "Gregory", "54111", "ON", NOT_FOUND), # Real ID, Fake person
    ("Edwards", "Bonnie", "30722", "ON", VERIFIED),
    ("Fraser", "Robert", "25614", "ON", INACTIVE),

    # Manitoba
    ("Willie", "Wonka", "", "MB", NOT_FOUND),
    ("Roy", "Danielle", "", "MB", VERIFIED),
    ("Adediji", "Uchechukwu Okwudili", "", "MB", INACTIVE),
    
    # Newfoundland and Labrador
    ("Wonka", "Willie", "", "NL", NOT_FOUND),
    ("Pieroway", "Amy", "", "NL", VERIFIED),
    ("Singleton-Polste", "Amy", "", "NL", INACTIVE),

    # Prince Edward Island
    ("Wonka", "Willie", "7646", "NL", NOT_FOUND),
    ("Muttart", "Rebecca", "7646", "NL", VERIFIED),
])
def test_verify(last_name, first_name, license_no, province, expected_result):
    assert verify(last_name, first_name, license_no, province) == expected_result
