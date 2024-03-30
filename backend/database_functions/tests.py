import unittest
from unittest.mock import patch
from database_Prescriptions import app, client, db, collection

class TestDatabaseAuthenticationService(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    # def test_get_patient_prescriptions_with_no_user(self):
    #     # Test getting a patient prescription from a user that does not exist

    # def test_get_patient_prescriptions_with_prescriber(self):
    #     # Test getting a patient prescription from a prescriber

    # def test_get_patient_prescriptions_with_patient(self):
    #     # Test getting a patient prescription from a patient
    
    # def test_get_prescriber_prescriptions_with_no_user(self):
    #     # Test getting a prescriber prescription from a user that does not exist

    # def test_get_prescriber_prescriptions_with_patient(self):
    #     # Test getting a prescriber prescription from a patient

    # def test_get_patient_prescriptions_with_prescriber(self):
    #     # Test getting a prescriber prescription from a prescriber
  
