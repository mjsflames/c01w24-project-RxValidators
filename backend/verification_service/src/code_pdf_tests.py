from code_pdf_server import *
import unittest
import pandas as pd
import os
import zipfile

columns = ["First Name", "Last Name", "Province", "Regulatory College", "License #", "Status"]
full_columns = ["First Name", "Last Name", "Province", "Regulatory College", "License #", "Status", "Code"]

class TestCases(unittest.TestCase):
    
    def setUp(self):
        # Create a temporary directory for test output
        self.temp_dir = "temp_dir"
        os.makedirs(self.temp_dir, exist_ok=True)
        
    def tearDown(self):
        # Remove the temporary directory and its contents
        for file in os.listdir(self.temp_dir):
            file_path = os.path.join(self.temp_dir, file)
            os.remove(file_path)
        os.rmdir(self.temp_dir)
    
    
    # Test the code_generator function
    def test_create_code(self):
        result = code_generator("Lisa", "Turner", "NB", "001")
        self.assertEqual(result, "NB-LT001")
    
    
    # Test the get_index function
    def test_get_index(self):
        self.assertEqual(get_index(1), "001")
        self.assertEqual(get_index(10), "010")
        self.assertEqual(get_index(100), "100")
    
    
    # Test adding codes to a dataframe with empty data
    def test_add_empty_data_codes(self):
        data = []
        expected_data = []
        expected_df = pd.DataFrame(expected_data, columns=full_columns)
        test_df = pd.DataFrame(data, columns=columns)
        result = add_codes_to_df(test_df)
        diff = expected_df.equals(result)
        self.assertEqual(diff, True)
    
    
    # Test adding codes to a dataframe with some data
    def test_add_codes(self):
        data = [
            ["Emily","Ho","ON","Toronto Uni", 232,"VERIFIED"],
            ["Morgan","Lao","BC","British Columbia Uni", 23123,"INACTIVE"],
            ["Lance","Talban","SK","Saskatchewan Uni", 12323,"VERIFIED"]
        ] 
        expected_data = [
            ["Emily","Ho","ON","Toronto Uni", 232,"VERIFIED", "ON-EH001"],
            ["Morgan","Lao","BC","British Columbia Uni", 23123,"INACTIVE", None],
            ["Lance","Talban","SK","Saskatchewan Uni", 12323,"VERIFIED", "SK-LT001"]
        ] 
        expected_df = pd.DataFrame(expected_data, columns=full_columns)
        test_df = pd.DataFrame(data, columns=columns)
        result = add_codes_to_df(test_df)
        diff = expected_df.equals(result)
        self.assertEqual(diff, True)
    
    
    # Test adding codes to a dataframe with some data and duplicate codes
    def test_add_duplicate_codes(self):
        data = [
            ["Emily","Ho","ON","Toronto Uni", 232,"VERIFIED"],
            ["Morgan","Lao","BC","British Columbia Uni", 23123,"INACTIVE"],
            ["Lance","Talban","SK","Saskatchewan Uni", 12323,"VERIFIED"],
            ["Emily","Ho","ON","Toronto Uni", 32,"VERIFIED"],
            ["Emily","Ho","ON","Toronto Uni", 232,"VERIFIED"],
            ["Lance","Talban","SK","Saskatchewan Uni", 2323,"VERIFIED"]
        ]

        expected_data = [
            ["Emily","Ho","ON","Toronto Uni", 232,"VERIFIED", "ON-EH001"],
            ["Morgan","Lao","BC","British Columbia Uni", 23123,"INACTIVE", None],
            ["Lance","Talban","SK","Saskatchewan Uni", 12323,"VERIFIED", "SK-LT001"],
            ["Emily","Ho","ON","Toronto Uni", 32,"VERIFIED", "ON-EH002"],
            ["Emily","Ho","ON","Toronto Uni", 232,"VERIFIED", "ON-EH003"],
            ["Lance","Talban","SK","Saskatchewan Uni", 2323,"VERIFIED", "SK-LT002"]
        ] 
        expected_df = pd.DataFrame(expected_data, columns=full_columns)
        test_df = pd.DataFrame(data, columns=columns)
        
        result = add_codes_to_df(test_df)
        diff = expected_df.equals(result)
        self.assertEqual(diff, True)
        
        
    # Test creating a PDF file
    def test_create_pdf(self):
        code = "ON-JD001"
        output_path = os.path.join(self.temp_dir, f"PaRx-{code}.pdf")
        pdf = create_pdf(code, output_path)
        pdf.save()

        # Check if the PDF file is generated at the specified path
        self.assertTrue(os.path.exists(output_path))
        
        
    # Test generating verified PDFs into a ZIP buffer
    def test_generate_zip(self):
        data = [
            ["Emily","Ho","ON","Toronto Uni", 232,"VERIFIED", "ON-EH001"],
            ["Morgan","Lao","BC","British Columbia Uni", 23123,"INACTIVE", None],
            ["Lance","Talban","SK","Saskatchewan Uni", 12323,"VERIFIED", "SK-LT001"]
        ] 
        df = pd.DataFrame(data, columns=full_columns)
        
        zip_data = generate_verified_pdfs(df, self.temp_dir)
        self.assertIsInstance(zip_data, bytes)
        
        
    # Test generating all verified PDFs from a ZIP folder
    def test_generate_verified_pdfs(self):
        # Define a sample DataFrame with verified and pending prescribers
        data = [
            ["Emily","Ho","ON","Toronto Uni", 232,"VERIFIED", "ON-EH001"],
            ["Morgan","Lao","BC","British Columbia Uni", 23123,"INACTIVE", None],
            ["Lance","Talban","SK","Saskatchewan Uni", 12323,"VERIFIED", "SK-LT001"]
        ] 
        df = pd.DataFrame(data, columns=full_columns)
        zip_data = generate_verified_pdfs(df, self.temp_dir)
        
        # Save the zip buffer to a file in the temporary directory
        zip_path = os.path.join(self.temp_dir, "verified_pdfs.zip")
        with open(zip_path, "wb") as f:
            f.write(zip_data)

        # Extract the contents of the zip file
        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            zip_ref.extractall(self.temp_dir)

        # Check if PDF files are generated only for verified prescribers
        self.assertTrue(os.path.exists(os.path.join(self.temp_dir, "PaRx-ON-EH001.pdf")))
        self.assertFalse(os.path.exists(os.path.join(self.temp_dir, "PaRx-BC-ML 001.pdf")))
        self.assertTrue(os.path.exists(os.path.join(self.temp_dir, "PaRx-SK-LT001.pdf")))
        
        
    # Test exporting result data to a CSV file, and checking if the input data matches the CSV data
    def test_new_data_to_csv(self):
        data = [
            ["Emily","Ho","ON","Toronto Uni", 232,"VERIFIED", "ON-EH001"],
            ["Morgan","Lao","BC","British Columbia Uni", 23123,"INACTIVE", None],
            ["Lance","Talban","SK","Saskatchewan Uni", 12323,"VERIFIED", "SK-LT001"],
            ["Emily","Ho","ON","Toronto Uni", 32,"VERIFIED", "ON-EH002"],
            ["Emily","Ho","ON","Toronto Uni", 232,"VERIFIED", "ON-EH003"],
            ["Lance","Talban","SK","Saskatchewan Uni", 2323,"VERIFIED", "SK-LT002"]
        ] 
        df = pd.DataFrame(data, columns=full_columns)
        file_name = os.path.join(self.temp_dir, "test.csv")
        new_data_to_csv(file_name, df)

        # Check that the CSV file is generated with correct data
        self.assertTrue(os.path.exists(file_name))
        result_df = pd.read_csv(file_name)
        # Replace any values from csv that are NaN with None
        result_df = df.where(pd.notnull(df), None)
        pd.testing.assert_frame_equal(df, result_df)
        

    # Test exporting result data to an XLSX file, and checking if the input data matches the XLSX data
    def test_new_data_to_xlsx(self):
        data = [
            ["Emily","Ho","ON","Toronto Uni", 232,"VERIFIED", "ON-EH001"],
            ["Morgan","Lao","BC","British Columbia Uni", 23123,"INACTIVE", None],
            ["Lance","Talban","SK","Saskatchewan Uni", 12323,"VERIFIED", "SK-LT001"],
            ["Emily","Ho","ON","Toronto Uni", 32,"VERIFIED", "ON-EH002"],
            ["Emily","Ho","ON","Toronto Uni", 232,"VERIFIED", "ON-EH003"],
            ["Lance","Talban","SK","Saskatchewan Uni", 2323,"VERIFIED", "SK-LT002"]
        ] 
        df = pd.DataFrame(data, columns=full_columns)
        file_name = os.path.join(self.temp_dir, "test.xlsx")
        new_data_to_xlsx(file_name, df)

        # Assert that the XLSX file is generated with correct data
        self.assertTrue(os.path.exists(file_name))
        result_df = pd.read_excel(file_name)
        # Replace any values from csv that are NaN with None
        result_df = df.where(pd.notnull(df), None)
        pd.testing.assert_frame_equal(df, result_df)
        
       
if __name__ == '__main__':
    unittest.main()