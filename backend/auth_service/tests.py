import unittest
from unittest.mock import patch
from database_Authentications import app

class TestDatabaseAuthenticationService(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_user_creation_with_missing_required_fields(self):
        # Test user creation when required fields are missing
        response = self.app.post('/register', json={})
        self.assertEqual(response.status_code, 400)
        self.assertIn("Missing required fields", response.json["error"])

    @patch("database_Authentications.user_exists", return_value=True)
    def test_user_creation_with_existing_user(self, mock_user_exists):
        # Test user creation when user already exists
        response = self.app.post('/register', json={"username": "user1", "password": "pwd1", "role": "patient"})
        self.assertEqual(response.status_code, 409)
        self.assertIn("A user with username:user1 already exists", response.json["error"])

    @patch("database_Authentications.user_exists", return_value=False)
    def test_user_creation_with_successful_registration(self, mock_user_exists):
        # Test a successful user registration
        response = self.app.post('/register', json={"username": "user2", "password": "pwd2", "role": "prescriber"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("prescriber created and registered successfully", response.json["message"])

        del_response = self.app.delete('/removeUser/user2')
        self.assertEqual(del_response.status_code, 200)
        self.assertIn("User:user2 deleted successfully", del_response.json["message"])


    @patch("database_Authentications.user_exists", return_value=False)
    def test_user_login_with_missing_required_fields(self, mock_user_exists):
        # Test user login when required fields are missing
        response1 = self.app.post('/register', json={"username": "user3", "password": "pwd3", "role": "prescriber"})
        response2 = self.app.post('/login', json={"username": "user3"})
        self.assertEqual(response1.status_code, 200)
        self.assertIn("prescriber created and registered successfully", response1.json["message"])
        self.assertEqual(response2.status_code, 400)
        self.assertIn("Missing required fields", response2.json["error"])

        del_response = self.app.delete('/removeUser/user3')
        self.assertEqual(del_response.status_code, 200)
        self.assertIn("User:user3 deleted successfully", del_response.json["message"])

    @patch("database_Authentications.user_exists", return_value=False)
    def test_user_login_with_incorrect_password(self, mock_user_exists):
        # Test user login when password is incorrect
        response1 = self.app.post('/register', json={"username": "user4", "password": "pwd4", "role": "patient"})
        response2 = self.app.post('/login', json={"username": "user4", "password": "incorrect password", "role": "patient"})
        self.assertEqual(response1.status_code, 200)
        self.assertIn("patient created and registered successfully", response1.json["message"])
        self.assertEqual(response2.status_code, 401)
        self.assertIn("Unauthorized: password incorrect", response2.json["message"])
        
        del_response = self.app.delete('/removeUser/user4')
        self.assertEqual(del_response.status_code, 200)
        self.assertIn("User:user4 deleted successfully", del_response.json["message"])

    @patch("database_Authentications.user_exists", return_value=False)
    def test_user_login_with_successful_authentication(self, mock_user_exists):
        # Test a successful user login
        response1 = self.app.post('/register', json={"username": "user5", "password": "pwd5", "role": "prescriber"})
        response2 = self.app.post('/login', json={"username": "user5", "password": "pwd5"})
        self.assertEqual(response1.status_code, 200)
        self.assertIn("prescriber created and registered successfully", response1.json["message"])
        self.assertEqual(response2.status_code, 200)
        self.assertIn("Authentication Success", response2.json["message"])
        
        del_response = self.app.delete('/removeUser/user5')
        self.assertEqual(del_response.status_code, 200)
        self.assertIn("User:user5 deleted successfully", del_response.json["message"])


    @patch("database_Authentications.user_exists", return_value=False)
    def test_list_users_patients_prescribers(self, mock_user_exists):
        # Test list functions
        response1 = self.app.post('/register', json={"username": "user6", "password": "pwd6", "role": "patient"})
        response2 = self.app.post('/register', json={"username": "user7", "password": "pwd7", "role": "patient"})
        response3 = self.app.post('/register', json={"username": "user8", "password": "pwd8", "role": "prescriber"})
        
        response4 = self.app.get('/listUsers')
        response5 = self.app.get('/listPatients')
        response6 = self.app.get('/listPrescribers')

        self.assertEqual(response1.status_code, 200)
        self.assertIn("patient created and registered successfully", response1.json["message"])
        self.assertEqual(response2.status_code, 200)
        self.assertIn("patient created and registered successfully", response2.json["message"])
        self.assertEqual(response3.status_code, 200)
        self.assertIn("prescriber created and registered successfully", response3.json["message"])
        
        self.assertEqual(response4.status_code, 200)
        count = 0
        for user in response4.json:
            if user.get("username") == "user6" or user.get("username") == "user7" or user.get("username") == "user8":
                count += 1
        self.assertEqual(count, 3)

        self.assertEqual(response5.status_code, 200)
        count = 0
        for user in response5.json:
            if user.get("username") == "user6" or user.get("username") == "user7":
                count += 1
            elif user.get("username") == "user8":
                count -=1
        self.assertEqual(count, 2)

        self.assertEqual(response6.status_code, 200)
        count = 0
        for user in response6.json:
            if user.get("username") == "user8":
                count += 1
            elif user.get("username") == "user6" or user.get("username") == "user7":
                count -=1
        self.assertEqual(count, 1)

        del_response1 = self.app.delete('/removeUser/user6')
        del_response2 = self.app.delete('/removeUser/user7')
        del_response3 = self.app.delete('/removeUser/user8')
        self.assertEqual(del_response1.status_code, 200)
        self.assertIn("User:user6 deleted successfully", del_response1.json["message"])
        self.assertEqual(del_response2.status_code, 200)
        self.assertIn("User:user7 deleted successfully", del_response2.json["message"])
        self.assertEqual(del_response3.status_code, 200)
        self.assertIn("User:user8 deleted successfully", del_response3.json["message"])


    def test_remove_user_with_no_user(self):
        # Test removing a user that does not exist
        del_response = self.app.delete('/removeUser/userdoesnotexist')
        self.assertEqual(del_response.status_code, 404)
        self.assertIn("User does not exist", del_response.json["message"])


if __name__ == '__main__':
    unittest.main()
