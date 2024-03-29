import unittest
from unittest.mock import patch
import database_Authentications
from database_Authentications import app, client, db

class TestUserAccountCreation(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_missing_required_fields(self):
        # Test when required fields are missing
        response = self.app.post('/register', json={})
        self.assertEqual(response.status_code, 400)
        self.assertIn("Missing required fields", response.json["error"])

    @patch("database_Authentications.user_exists", return_value=True)
    def test_existing_user(self, mock_user_exists):
        # Test when user already exists
        response = self.app.post('/register', json={"username": "test1", "password": "test1", "role": "patient"})
        self.assertEqual(response.status_code, 409)
        self.assertIn("A user with username:test1 already exists", response.json["error"])

    @patch("database_Authentications.user_exists", return_value=False)
    def test_successful_registration(self, mock_user_exists):
        # Test successful user registration
        response = self.app.post('/register', json={"username": "test2", "password": "password", "role": "prescriber"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("prescriber created and registered successfully", response.json["message"])
        db.command("dropUser", "test2")

if __name__ == '__main__':
    unittest.main()
