import unittest
from unittest.mock import patch
from database_functions.database_Prescriptions import app as app1
from auth_service.database_Authentications import app as app2


# Warning: DO NOT RUN this test if there are already real prescriptions in the database
#          This test suite includes "/deleteAll", which will delete all the prescriptions in the database


class TestDatabaseAuthenticationService(unittest.TestCase):
    def setUp(self):
        self.app1 = app1.test_client()
        self.app1.testing = True
        self.app2 = app2.test_client()
        self.app2.testing = True

    def create_test_users(self):
        # create users for testing
        self.app2.post('/register', json={"username": "test_patient", "password": "pwd1", "role": "patient"})
        self.app2.post('/register', json={"username": "test_patient2", "password": "pwd2", "role": "patient"})
        self.app2.post('/register', json={"username": "test_prescriber", "password": "pwd3", "role": "prescriber"})

    def remove_test_users(self):
        # remove test users
        self.app2.delete('/removeUser/test_patient')
        self.app2.delete('/removeUser/test_patient2')
        self.app2.delete('/removeUser/test_prescriber')

    def remove_existing_presciptions(self):
        # removes all pre-existing prescriptions in the database
        self.app1.delete("/deleteAll")

    def submit_prescriber_form(self):
        # submits a test form by the prescriber
        return self.app1.post(
            '/api/submit-form',
            json={
                "user": "prescriber",
                "date": "03/29/2024",
                "patient_initials": None,
                "prescriber_code": "test_prescriber",
                "comments": None,
                "status": None,
                "pdf_link": None,
                "discoveryPass": None,
                "patient_email": "test_patient",
                "patient": {
                    "date": None,
                    "patient_initials": None,
                    "prescriber_code": "test_prescriber",
                    "discoveryPass": None,
                    "patient_email": "test_patient",
                    "status": None,
                },
                "prescriber": {
                    "date": None,
                    "patient_initials": None,
                    "prescriber_code": "test_prescriber",
                    "discoveryPass": None,
                    "patient_email": "test_patient",
                    "status": None,
                },
            }
        )

    def test_getPatientPrescriptions_with_no_prescriptions(self):
        # Test getting a prescription from a patient that does not have any prescriptions
        self.create_test_users()
        self.remove_existing_presciptions()

        response = self.app1.get('/api/getPatientPrescriptions/test_patient')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, [])

        self.remove_test_users()

    def test_getPresPrescriptions_with_no_prescriptions(self):
        # Test getting a prescription from a prescriber that does not have any prescriptions
        self.create_test_users()
        self.remove_existing_presciptions()

        response = self.app1.get('/api/getPresPrescriptions/test_prescriber')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, [])

        self.remove_test_users()

    def test_getPatientPrescriptions_with_prescriptions(self):
        # Test getting a prescription from a patient who was prescribed a prescription
        self.create_test_users()
        self.remove_existing_presciptions()

        response1 = self.submit_prescriber_form()
        self.assertEqual(response1.status_code, 200)
        self.assertIn("Data posted successfully", response1.json["message"])
        
        response2 = self.app1.get('/api/getPatientPrescriptions/test_patient')
        self.assertEqual(response2.status_code, 200)
        count = 0
        for prescription in response2.json:
            count += 1
        self.assertEqual(count, 1)

        response3 = self.app1.delete("/deleteAll")
        self.assertEqual(response3.status_code, 200)
        self.assertEqual(response3.json["deleted_count"], 1)
        self.assertIn("All prescriptions deleted successfully", response3.json["message"])

        self.remove_test_users()

    def test_getPatientPrescriptions_with_prescriptions_to_another_patient(self):
        # Test getting a prescription from a patient who was not prescribed a prescription, but another patient was
        self.create_test_users()
        self.remove_existing_presciptions()

        response1 = self.submit_prescriber_form()
        self.assertEqual(response1.status_code, 200)
        self.assertIn("Data posted successfully", response1.json["message"])

        response2 = self.app1.get('/api/getPatientPrescriptions/test_patient2')
        self.assertEqual(response2.status_code, 200)
        count = 0
        for prescription in response2.json:
            count += 1
        self.assertEqual(count, 0)

        response3 = self.app1.delete("/deleteAll")
        self.assertEqual(response3.status_code, 200)
        self.assertEqual(response3.json["deleted_count"], 1)
        self.assertIn("All prescriptions deleted successfully", response3.json["message"])

        self.remove_test_users()

    def test_getPresPrescriptions_with_prescriptions(self):
        # Test getting a prescription from a prescriber who prescribed a prescription to a patient
        self.create_test_users()
        self.remove_existing_presciptions()

        response1 = self.submit_prescriber_form()
        self.assertEqual(response1.status_code, 200)
        self.assertIn("Data posted successfully", response1.json["message"])

        response2 = self.app1.get('/api/getPresPrescriptions/test_prescriber')
        self.assertEqual(response2.status_code, 200)
        count = 0
        for prescription in response2.json:
            count += 1
        self.assertEqual(count, 1)

        response3 = self.app1.delete("/deleteAll")
        self.assertEqual(response3.status_code, 200)
        self.assertEqual(response3.json["deleted_count"], 1)
        self.assertIn("All prescriptions deleted successfully", response3.json["message"])

        self.remove_test_users()

    def test_submit_prescriber_form(self):
        # Tests a valid submission of a prescription by a prescriber
        self.create_test_users()
        self.remove_existing_presciptions()

        response1 = self.submit_prescriber_form()
        self.assertEqual(response1.status_code, 200)
        self.assertIn("Data posted successfully", response1.json["message"])

        response2 = self.app1.delete("/deleteAll")
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(response2.json["deleted_count"], 1)
        self.assertIn("All prescriptions deleted successfully", response2.json["message"])

        self.remove_test_users()

    def test_list_prescriptions_without_prescriptions(self):
        # Test listing prescriptions with no prescriptions in collection
        self.create_test_users()
        self.remove_existing_presciptions()

        response = self.app1.get('/list-prescriptions')
        self.assertEqual(response.status_code, 200)
        count = 0
        for prescription in response.json:
            count += 1
        self.assertEqual(count, 0)

        self.remove_test_users()

    def test_list_prescriptions_with_prescriptions(self):
        # Test listing prescriptions with prescriptions already in collection
        self.create_test_users()
        self.remove_existing_presciptions()

        response1 = self.submit_prescriber_form()
        self.assertEqual(response1.status_code, 200)
        self.assertIn("Data posted successfully", response1.json["message"])

        response2 = self.app1.get('/list-prescriptions')
        self.assertEqual(response2.status_code, 200)
        count = 0
        for prescription in response2.json:
            count += 1
        self.assertEqual(count, 1)

        response3 = self.app1.delete("/deleteAll")
        self.assertEqual(response3.status_code, 200)
        self.assertEqual(response3.json["deleted_count"], 1)
        self.assertIn("All prescriptions deleted successfully", response3.json["message"])

        self.remove_test_users()

    def test_search_prescriptions_with_missing_inputs(self):
        # Test search prescriptions with missing inputs
        self.create_test_users()
        self.remove_existing_presciptions()

        response1 = self.submit_prescriber_form()
        self.assertEqual(response1.status_code, 200)
        self.assertIn("Data posted successfully", response1.json["message"])

        response2 = self.app1.get('/api/getPatientPrescriptions/test_patient')
        self.assertEqual(response2.status_code, 200)
        count = 0
        for prescription in response2.json:
            count += 1
        self.assertEqual(count, 1)

        response3 = self.app1.get('/search-prescriptions', json={})
        self.assertEqual(response3.status_code, 400)
        self.assertIn("date and prescriber code both needed to search.", response3.json["error"])

        response4 = self.app1.delete("/deleteAll")
        self.assertEqual(response4.status_code, 200)
        self.assertEqual(response4.json["deleted_count"], 1)
        self.assertIn("All prescriptions deleted successfully", response4.json["message"])

        self.remove_test_users()

    def test_search_prescriptions_without_prescriptions(self):
        # Test search prescriptions without a valid prescription in its input
        self.create_test_users()
        self.remove_existing_presciptions()

        response1 = self.submit_prescriber_form()
        self.assertEqual(response1.status_code, 200)
        self.assertIn("Data posted successfully", response1.json["message"])

        response2 = self.app1.get('/api/getPatientPrescriptions/test_patient')
        self.assertEqual(response2.status_code, 200)
        count = 0
        for prescription in response2.json:
            count += 1
        self.assertEqual(count, 1)

        response3 = self.app1.get('/search-prescriptions', json={"date":"03/29/3333", "prescriber_code": "Nobody"})
        self.assertEqual(response3.status_code, 200)
        self.assertEqual(response3.json, None)

        response4 = self.app1.delete("/deleteAll")
        self.assertEqual(response4.status_code, 200)
        self.assertEqual(response4.json["deleted_count"], 1)
        self.assertIn("All prescriptions deleted successfully", response4.json["message"])

        self.remove_test_users()

    def test_search_prescriptions_with_prescriptions(self):
        # Test search prescriptions with a valid prescription
        self.create_test_users()
        self.remove_existing_presciptions()

        response1 = self.submit_prescriber_form()
        self.assertEqual(response1.status_code, 200)
        self.assertIn("Data posted successfully", response1.json["message"])

        response2 = self.app1.get('/api/getPatientPrescriptions/test_patient')
        self.assertEqual(response2.status_code, 200)
        count = 0
        oid = None
        for prescription in response2.json:
            count += 1
            oid = prescription["_id"]
        self.assertEqual(count, 1)

        response3 = self.app1.get('/search-prescriptions', json={"date":"03/29/2024", "prescriber_code": "test_prescriber"})
        self.assertEqual(response3.status_code, 200)
        self.assertEqual(response3.json["_id"]["$oid"], oid)

        response4 = self.app1.delete("/deleteAll")
        self.assertEqual(response4.status_code, 200)
        self.assertEqual(response4.json["deleted_count"], 1)
        self.assertIn("All prescriptions deleted successfully", response4.json["message"])

        self.remove_test_users()

    def test_update_prescriptions_with_invalid_fields(self):
        # Test update prescriptions with a valid prescription but invalid field
        self.create_test_users()
        self.remove_existing_presciptions()

        response1 = self.submit_prescriber_form()
        self.assertEqual(response1.status_code, 200)
        self.assertIn("Data posted successfully", response1.json["message"])

        response2 = self.app1.get('/api/getPatientPrescriptions/test_patient')
        self.assertEqual(response2.status_code, 200)
        count = 0
        oid = None
        for prescription in response2.json:
            count += 1
            oid = prescription["_id"]
        self.assertEqual(count, 1)

        response3 = self.app1.post("/api/update-prescription/"+oid, json={"power":"over 9000"})
        self.assertEqual(response3.status_code, 400)
        self.assertIn("Invalid fields in update request", response3.json["error"])
        self.assertIn("power", response3.json["invalid_fields"])

        response4 = self.app1.delete("/deleteAll")
        self.assertEqual(response4.status_code, 200)
        self.assertEqual(response4.json["deleted_count"], 1)
        self.assertIn("All prescriptions deleted successfully", response4.json["message"])

        self.remove_test_users()

    def test_update_prescriptions_with_prescriptions(self):
        # Test update prescriptions with a valid prescription and field
        self.create_test_users()
        self.remove_existing_presciptions()

        response1 = self.submit_prescriber_form()
        self.assertEqual(response1.status_code, 200)
        self.assertIn("Data posted successfully", response1.json["message"])

        response2 = self.app1.get('/api/getPatientPrescriptions/test_patient')
        self.assertEqual(response2.status_code, 200)
        count = 0
        oid = None
        for prescription in response2.json:
            count += 1
            oid = prescription["_id"]
        self.assertEqual(count, 1)

        response3 = self.app1.post("/api/update-prescription/"+oid, json={"date":"03/31/2024"})
        self.assertEqual(response3.status_code, 200)
        self.assertIn("Prescription updated successfully", response3.json["message"])

        response4 = self.app1.get('/search-prescriptions', json={"date":"03/31/2024", "prescriber_code": "test_prescriber"})
        self.assertEqual(response4.status_code, 200)
        self.assertEqual(response4.json["_id"]["$oid"], oid)

        response5 = self.app1.delete("/deleteAll")
        self.assertEqual(response5.status_code, 200)
        self.assertEqual(response5.json["deleted_count"], 1)
        self.assertIn("All prescriptions deleted successfully", response5.json["message"])

        self.remove_test_users()

    def test_delete_prescriptions_with_prescriptions(self):
        # Test delete prescriptions with a valid prescription
        self.create_test_users()
        self.remove_existing_presciptions()

        response1 = self.submit_prescriber_form()
        self.assertEqual(response1.status_code, 200)
        self.assertIn("Data posted successfully", response1.json["message"])

        response2 = self.app1.get('/api/getPatientPrescriptions/test_patient')
        self.assertEqual(response2.status_code, 200)
        count = 0
        oid = None
        for prescription in response2.json:
            count += 1
            oid = prescription["_id"]
        self.assertEqual(count, 1)

        response3 = self.app1.delete("/delete/"+oid)
        self.assertEqual(response3.status_code, 200)

        response4 = self.app1.get('/list-prescriptions')
        self.assertEqual(response4.status_code, 200)
        count = 0
        for prescription in response4.json:
            count += 1
        self.assertEqual(count, 0)

        self.remove_test_users()


if __name__ == '__main__':
    unittest.main()