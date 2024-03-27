from backend.verification_service.src.code_pdf_server import *
import unittest
import pandas as pd

columns = ["First Name", "Last Name", "Province", "Regulatory College", "License #", "Status"]
full_columns = ["First Name", "Last Name", "Province", "Regulatory College", "License #", "Status", "Code"]

class TestCases(unittest.TestCase):
    
    def test_create_code(self):
        result = code_generator("Lisa", "Turner", "NB", "001")
        self.assertEqual(result, "NB-LT001")
    
    def test_add_empty_data_codes(self):
        data = []
        expected_data = []
        expected_df = pd.DataFrame(expected_data, columns=full_columns)
        test_df = pd.DataFrame(data, columns=columns)
        
        result = add_code_df(test_df)
        diff = expected_df.equals(result)
        self.assertEqual(diff, True)
    
    def test_add_codes(self):
        data = [
            ["Emily","Ho","ON","Toronto Uni","232","VERIFIED"],
            ["Morgan","Lao","BC","British Columbia Uni","23123","INACTIVE"],
            ["Lance","Talban","SK","Saskatchewan Uni","12323","VERIFIED"],
        ]
        expected_data = [
            ["Emily","Ho","ON","Toronto Uni","232","VERIFIED", "ON-EH001"],
            ["Morgan","Lao","BC","British Columbia Uni","23123","INACTIVE", None],
            ["Lance","Talban","SK","Saskatchewan Uni","12323","VERIFIED", "SK-LT001"],
        ] 
        expected_df = pd.DataFrame(expected_data, columns=full_columns)
        test_df = pd.DataFrame(data, columns=columns)
        
        result = add_code_df(test_df)
        diff = expected_df.equals(result)
        self.assertEqual(diff, True)
        
    def test_add_duplicate_codes(self):
        data = [
            ["Emily","Ho","ON","Toronto Uni","232","VERIFIED"],
            ["Morgan","Lao","BC","British Columbia Uni","23123","INACTIVE"],
            ["Lance","Talban","SK","Saskatchewan Uni","12323","VERIFIED"],
            ["Emily","Ho","ON","Toronto Uni","232","VERIFIED"],
            ["Emily","Ho","ON","Toronto Uni","232","VERIFIED"],
            ["Lance","Talban","SK","Saskatchewan Uni","12323","VERIFIED"]
        ]

        expected_data = [
            ["Emily","Ho","ON","Toronto Uni","232","VERIFIED", "ON-EH001"],
            ["Morgan","Lao","BC","British Columbia Uni","23123","INACTIVE", None],
            ["Lance","Talban","SK","Saskatchewan Uni","12323","VERIFIED", "SK-LT001"],
            ["Emily","Ho","ON","Toronto Uni","232","VERIFIED", "ON-EH002"],
            ["Emily","Ho","ON","Toronto Uni","232","VERIFIED", "ON-EH003"],
            ["Lance","Talban","SK","Saskatchewan Uni","12323","VERIFIED", "SK-LT002"]
        ] 
        expected_df = pd.DataFrame(expected_data, columns=full_columns)
        test_df = pd.DataFrame(data, columns=columns)
        
        result = add_code_df(test_df)
        diff = expected_df.equals(result)
        self.assertEqual(diff, True)
       
       
if __name__ == '__main__':
    unittest.main()