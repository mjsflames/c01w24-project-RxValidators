Renat has not updated the stand-ups with any updates even after reminders

# March 19th, 2024
Team:
- Demo’ed sprint 2 work
- Figured out sprint 3 tasks
- Discussed deadlines for finishing project and when to start testing/deployment
- Started sprint 3

Michelle:
- Continued working on Frontend for Logging a Prescription Form in prescriber
- Added a calendar so that the dates inputted for both patient and prescriber are consistent and would not vary 
- Tomorrow: complete all login/signup pages for the frontend

Danny:
- Worked on creating pages for patients and prescribers to see their prescriptions
- Worked on creating responsive pages on click 

Joe:
- Created database function to list all MongoDB users
- Challenge: Finding out how database users are created and which database their information is placed in

Lance:
- Separated home pages according to role type.
- Setup root package.json startup commands
- Integrate PatientPrescription to API Gateway
- Created a quick logout transition page
- Setup service health checks

Emily:
- Looked at Microsoft Azure APIs to get image searches on Bing
- Challenge: Finding the right API key in MS Azure, and navigating through MS Azure (There were too many buttons and links that it was hard to find where to set up an API key that grants me access to searching for images)

# March 20th, 2024
Michelle:
- Completed all frontend login models (choose user type, create patient, create prescriber accounts)
- Challenge: figuring out how to create a footer and the correct way to position it
- Tomorrow: complete draft for the footer and prescriber side pages

Joe:
- Created database function to remove all database users
- Challenge: the Python function to drop all users from MongoDB does not work and db.command() was used as a workaround
- Planning to integrate my backend database authentication functions to the frontend 

Danny:
- Created a new page to show additional details of prescriptions
- Integrated endpoints into the page

Lance:
- Found a demon hiding in my bathroom
- Challenges: Hiring a priest last minute to exercise the demon

Emily:
- Found a kangaroo in my backyard and challenged it to a dual
- Challenge: the kangaroo couldn’t speak english, and it can’t write
 
# March 21st, 2024
Michelle:
- Completed footer draft and prescriber home page
- Challenges: figuring out the positioning of each item in the grid and the footer currently gets set too far down the page
- Tomorrow: complete all patient pages and update rest of prescriber pages

Joe:
- Reading API Gateway code to begin integrating my MongoDB authentication functions to the API Gateway

Emily:
- Completed the task of getting an image based on a user’s selected nearby location (using Microsoft Azure APIs) - The image displays what that selected location looks like.

Danny:
- Finished populating the patient tables and allowing the user to access information for individual prescriptions

Kenny:
- Researching on how to transform Figma design into frontend code.
- Challenge: the code after transformation is not modular and hard to reuse.

# March 22nd, 2024
Michelle:
- No updates

Joe:
- No updates
- Challenge: researching if my Python MongoDB authentication functions can be integrated with the Javascript API Gateway

Lance & Emily:
- Designed and implemented a new frontend look for Green Resources in Figma to make it more efficient and user-friendly
- Refactored code and separated it into multiple components for Green Resources
- Challenges: not going clinically insane to refactor the code because the code was densely coupled

Kenny:
- Started Learning how to use Tailwind and how to refactor the .jsx files.
- Challenge: The setup program for Linux users is not working. I need to figure it out manually every time I setted up the environment before running the app.

# March 23rd, 2024
Team:
- Renat absent with no notice
- Worked on API endpoints, frontend and integration of authentication/prescriber tables

Michelle:
- Completed updating all prescriber pages (account details, logRX)
- Completed all patient pages
- Updated patient & prescriber sign-up forms to include all needed details
- Added alerts for form submissions

Joe:
- Exploring flask and flask_cors as a means of integrating Python MongoDB authentication to Javascript API Gateway

Lance:
- Options on navbar are separate according to role type.

Emily:
- Worked on API endpoints using Flask to generate PDFs and prescriber codes for each verified prescriber
- Worked on API endpoint using Flask to export the csv file with the new data of statuses and codes	

Danny:
- Worked on creating the tables for the prescribers and populating those tables
- Challenge: Different table sizes and aligning the columns
- Figured out Tailwind CSS

# March 24th, 2024
Michelle:
- Fixed up minor details in the UI
- Created a dialog/modal component that confirms deactivation once they click the deactivate account button
- Merged and fixed issues with main

Joe:
- Set up user creation as part of the Authentication service
- Planning to set up user login/authentication next

Danny:
- Solved the issue with the misalignment of the columns and decided on using a drop down instead of a new page

Kenny:
- Created the draft of header, navigation bar, and context body for Admin in the 
- frontend using Tailwind.

# March 25th, 2024
Team:
- Renat absent without notifying the team
- Discussed different methods for deployment

Joe:
- Tested user creation as part of the Authentication service
- Created and tested user login/authentication, logout, list users, and remove user as part of the Authentication service
- Challenge: cannot pass MongoClient object in the json return statement of the user login

Lance:
- Fixed verification platform spamming status requests after completed job
- Service registry display position saved on localstorage
- Redesigned verification platform layout
- Added dropdown component for changing prescriber status later
- Challenges: debugging network errors

Danny:
- Worked on front end pages such as the home pages 
- Integrated some of the front end pages to work with endpoints

# March 26th, 2024
Team:
- Everyone present
- Integrated some backend with frontend
- Did some basic testing for login, docker, display tables
- Tomorrow: complete all integration tasks and user stories

Joe:
- Encrypted passwords for authentication service in user creation, user login/authentication
- Implemented SCRAM-SHA-256 MongoClient authentication mechanism 
- Supported Lance with integrating the authentication service linked to the API Gateway to the frontend

Emily:
- Fixed PDF service to generate PDF and send it back to the api call
- Fixed Code generating service to send back a CSV file of all the returned data (statues and prescriber codes)
- Fixed code generating when there are duplicate prescribers (must also check database for duplicate codes if another csv file is being sent to the website for verification)
- Challenge: generating prescriber codes for duplicate prescribers (if we consider new CSV files and the database)

Lance:
- Partially integrated Joe’s auth service
- Auth service login response now sets ‘rxa-auth’ cookie (if time allows, it should be used for authorizing requests)
- Put some life into the page header (from gray to fancy green)
- Hotfix on verification service being unable to read xlsx.
- Minor tweaks on frontend UI
- Challenges: Maintaining sanity

Michelle:
- Integrated functionality for deleting a user in the account details for patient/prescribers
- Integrated prescriber code, names, etc into home page and other misc areas
- Started integration for adding a search bar into patient/prescriber prescriptions

Danny:
- Worked on populating user profile pages with information from the user
- Integrated the endpoints for getting user information
- Created pages to let admin see all users into two tables for each type of user

# March 27th, 2024
Team:
- Renat & Kenny absent with no prior notice
- Continued to refactor and integrate backend with frontend
- Challenge: Admin work (pulling profiles and logs) was still not completed/integrated. Had to split up the work with the rest of the members

Emily:
- Refactored code and moved files around for PDF and code-generating services

Joe:
- Fixed esri-loader version conflicts bug
- Fixed user service compatibility issues with Python versions <3.10 issue

Michelle:
- Created admin all prescription logs table with a search bar
- Edited the table to include input fields for updating logs
- Started integration of allowing admin to overwrite logs

Kenny:
- Started integration of allowing admin to overwrite logs
- Challenge: backend does not have the correct functionality needed to perform overwriting.

Lance:
- Minor UI tweaks for verification platform
- Added auth service into root startup script
- Worked with Emily to integrate new endpoints for PDF and code generation as well as storing the data frames into DB
- Modified prescriber registration UI and autofill on matching code + license
- Only valid prescribers can register.

Danny:
- Integrated the endpoints to log prescriptions and connect to the backend
- Matches up prescriptions from both patients and prescribers to automatically assign a status

# March 28th, 2024
Team:
- Everyone present
- Started integrating missing requirements (admin over-riding all data, notification on status changes, cancelling prescription logs)
- Wrote test cases for backend
- Attempted to deploy docker, broke the API gateway and decided to not deploy

Joe:
- Fixed bug where remove user only removes the user information document and not the actual MongoDB user
- Removed unused database.py file in authentication service
- Created test suite for user creation/registration in the Authentication service

Lance:
- Notification service in API Gateway

Michelle:
- Edited prescription logs table in patient/prescriber
- Re-routed admin buttons and did minor tweaks to the UI
- Helped out with the integration of admin logs

Kenny:
- Continuing integration of allowing admin to over-write logs
- Edited backend to conform with updating logs
- Challenge: 
 - Status and other fields are not properly getting updated from the endpoints
 - Logging a prescription and overwriting logs currently use different variables/templates

Emily:
- Update PDF and code generating services and python functions so that prescribers can see their unique codes and their PDF
- Created services so that the admin can choose to download a CSV or an XLSX file of the result data (of prescriber statuses and codes)
- Started integrating the exporting files and pdf/code generating with the frontend

Danny:
- Made some changes to the backend for logging prescriptions so that the correct status is given
- Added a search bar to the prescriptions to allow admin to search prescriptions for key terms
- Fixed not matching status given by both parties

# March 29th, 2024
Team:
- Renat absent with no prior notice
- Integrated admin being able to override all data
- Challenge: due to the way backend was setup, all patient/prescriber logs are in one object - harder to change status

Joe:
- Completed test suite for the Authentication service: user creation/registration, user login/authentication, list users, list patients, list prescribers, and remove user

Danny:
- Changed the states to allow admin to override user profiles and change the fields
- Fixed endpoints for updating user profiles
- Changed prescription fields to only allow users to see their own prescriptions
- Updated fields for logging prescriptions

Kenny:
- Edited backend to use the same template for logging prescriptions and displaying them
- Continuing integration of admin logs
- Edited the backend endpoints to resolve conflicts in the status of the prescription

Michelle:
- Integrated deletion/cancellation of prescription logs for patients/prescribers
- Integrated deletion for admin-side patient/prescriber profiles
- Edited admin’s user profile tables to add buttons for displaying the update fields
- Added confirmation modals for the delete buttons in both user side and admin side
- Tomorrow: have admin be able to delete prescription logs
- Challenge: having admin logs' status be correct when updating prescriptions

Emily
- Integrated downloading csv and xlsx of the result data for admin
- Reformatted the admin, prescriber, and patient home pages so that they are responsive and formatted correctly (layout does not affect components)
- Fixed bug for prescribers to view their unique codes and their PDF
- Integrating downloading PDFs for all prescribers verified into a zip folder (for admin)
- Challenge: Downloading a zip folder - I keep getting an error that the zip folder is invalid and is unable to open.

Lance:
- Cleaning up verification platform and service.
- Since there is an extension, I will find a way to better handle API + Scrapy. Works fine in Linux though.
- Additionally, I will optimize the job handler to concurrently scrape the websites.
- Challenges: “reverse engineering” scrapyscript to find the win32 related signal error when outside the main thread.

# March 30th, 2024
Team:
- Renat absent with no prior notice
- Worked on finalizing website integration

Joe:
- Making test suite for database_Prescriptions.py: create, get, search, list, and delete functions for prescriptions
- Challenge: some functions from auth_service folder needs to be used so the test file had to be relocated to the higher-level backend folder
- Planning to finish by tomorrow

Michelle/Kenny/Danny:
- Worked on fixing up some bugs relating to admin's not being able to change the status of prescriptions
- Added functionality for patients/prescribers to be able to update mailing addresses and language straight from their account settings

Kenny:
- Wrote test cases for testing unique codes and pdf generation in the backend

