import unittest
from scrapers.verify import verify

VERIFIED, INACTIVE, NOT_FOUND = "VERIFIED", "INACTIVE", "NOT FOUND"

class TestCases(unittest.TestCase):
    def test_cpso(self):
        status = verify(last_name="Wonka", first_name="Willie", province="NL")
        self.assertEqual(status, NOT_FOUND)