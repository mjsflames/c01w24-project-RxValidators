# February 18th, 2024
Team: 
- Gave tasks out to each member
- Sprint 1 to end on March 3rd

# February 19th, 2024
  
# February 20th, 2024
Emily:
- Generated unique prescriber codes
- Challenge: I had trouble deciding how arguments are going to be passed into the function to generate the unique codes. (Would it take a dictionary, a 2D array, or multiple strings?)

Joe:
- Started researching different databases for storing the user information
- Challenge: Some trouble deciding whether to use MongoDB, Firebase, or SQL

# February 21st, 2024
Michelle: 
- Started researching Scrapy, Selenium, Splash, Beautiful Soup and Spyder

Emily:
- Started researching how to generate PDFs in the format that the company wants
- Challenge: I had a hard time deciding which method of generating PDFs would be the best and easiest way to do in Python

Joe:
- Started planning the demo and decided to use 2-D arrays and pandas Dataframes as a means to store and modify Excel file information
- Tentatively decided to use MongoDB as the storage method

Lance:
- Looked through my websites to find the API calls.

# February 22nd, 2024
Michelle: 
- Decided to use Scrapy
- Started to write a script to web scrape PEI's website
- Realized that both PEI and Alberta did not use any HTML or Javascript forms (unable to detect the input boxes)
- Started researching other ways to input Physician names

Danny:
- Tried to use Scrapy using the tutorial
- Started scraping Nova Scotia and faced a popup roadblock
- Researched Selenium
  
Emily:
- Created a function that generates a PDF (in the format the company wants)
- Challenges:
  - Generating the length of lines for a user to be able to write their name, date, etc., and choosing the right coordinates for each component/object in the PDF, took a while to make it look like what the company wants.
  - Changing the font sizes in the PDF and saving the previous font size for use later took quite a bit of time to figure out. I had to read the PDF-generating documentation to understand how it worked.

Lance:
- Started research Scrapy.
  
# February 23rd, 2024
Michelle:
- Found out that Selenium does an automated browser and can find elements/keys in an HTML to directly enter information
- Used Pandas to read in the CSV file
- Had trouble figuring out how to rewrite the CSV file to output the correct status 

# February 24th, 2024
Michelle:
- Managed to write the new status into the CSV column but it did not loop the CSV properly
- Researching more on how to loop the CSV in the script

# February 25th, 2024
Michelle:
- Completed the general web scraping script for PEI and Alberta
- Used Scrapy and Selenium as both websites do not use HTML forms
- Confirmed that we are going to have a general script that calls each individual script so no need for looping
- Going to modify it to take in and output to a 2D array instead of a CSV file

Emily:
- I updated my PDF generator function. It adds the generated unique prescriber code in the PDF and as the PDF name

Joe:
- Completed code to convert Excel file to a 2D array
- Completed dictionary that converts Licensing College to their respective websites
- Planning to make a database equivalent of the function

Lance:
- Completed the web scraping scripts for Saskatchewan and Manitoba.
- Used Scrapy and directly found their required API calls.
- Created a prototype spider-assignment distributor in `runner.py`. It takes a CSV file and determines which spider to use.

Danny:
- Finished a basic script for scraping Nova Scotia
- Used Selenium and set up the web driver to open the website
- Filled out the HTML forms
  
# February 26th, 2024
  
# February 27th, 2024
Michelle:
- Updated the scripts to take from a 2D array and output to the 5th entry in that array

Lance:
- Added error handling into scrapers
  
# February 28th, 2024
Danny:
- Completed the general web scraping for Nova Scotia and Quebec
- Used Selenium to complete forms and find statuses

Emily:
- Created a `utils.py` for any useful functions that will be reused multiple times by any group member
  - Added a function that converts a 2D array into a list of dictionaries. Each dictionary in the list is a prescriber.
- Added a function that updates the CSV file to have the generated unique codes for each verified prescriber
- Updated my code so that it generates a unique PDF for each verified prescriber (based on their unique codes)
- Challenges:
  - Figuring out what data (2D array or dictionary) will I get to generate the unique prescriber codes
  - How I can update the CSV file to have unique codes for only the verified people

Michelle:
- Currently implementing functionality for if there are 2 people with the same name for Alberta
- Having trouble figuring out how to have the script click each same name physician's link to match the license number and also backtrack if no match

Lance:
- Played around with React, Express, and other parts of a tech stack for the next sprint.

# February 29th, 2024
Emily:
- Started looking into Google Maps APIs for the "Green Resources" part of the project
- Challenge: There are so many APIs for Google Maps that I am not sure which ones are suitable for this project

Michelle:
- Researching ways to loop through same-name physicians but does not seem plausible with Selenium
- Looking to see if can change the scripts from Selenium to only Scrapy

Joe:
- Completed setting up MongoDB locally and included some basic functions for the database
- Challenge: Deciding which function may be used for the database
- Planning on including error handling for the functions

Danny:
- Recreated the Nova Scotia webscraper using only Scrapy

Lance:
- Removed unnecessary files and shortened code in scrapy project
  
# March 1st, 2024
Emily:
- Created a function that takes a location and calls the Google Maps API. It then returns a Google Maps link with directions to that location

# March 2nd, 2024
Lance:
- Rewrote scrapers to not inherit from my `BaseSpider` superclass
 
# March 3rd, 2024

