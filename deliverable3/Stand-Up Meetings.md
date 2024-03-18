# March 5th, 2024
Team:
- Demoed sprint 1 work
- Figured out which user stories to work on for sprint 2

# March 7th, 2024
Team:
- Created backend document with the database tables and API endpoints
- Assigned tasks to each member
  
Michelle & Danny:
- Started on the Figma frontend design board to do the login portion
  
Lance:
- Quick flask server for verification service + skeletal frontend.

# March 8th, 2024
Michelle & Danny:
- Worked on the Figma board to create the prescriber tabs
  
Emily:
- Researched on ArcGIS and API calls from other sources for implementing green resources

# March 9th, 2024
Michelle:
- Finished the Figma board with login, admin, prescriber, and patient models
  
Emily: 
- Created a frontend for Green Resources with a map. It allows the user to search for places/nearby areas
- The user can also select places on the map, and a location pin will pop up
- The user can allow the site to get their location, and then it can bring them to their current area on the map
- Challenge: Learning frontend and understanding how to develop code in React
  
Lance:
- Began service registry and API Gateway
- Began on auth with Joe. MongoDB Auth SCRAM + PassportJS?
  
Joe:
- Researched MongoDB SCRAM Authentication
- Implemented user creation functions for MongoDB
- Began implementing user authentication functions

# March 10th, 2024
Emily:
- Created the header component that includes the page title and description.
  
Lance:
- Made batch script to run the services + frontend automatically
- Implemented more service registry functionality; microservices notify the API gateway about their address on startup.
- API Gateway now proxies requests to the URL given by the service registry
- Resolved multipart/form-data POST-related proxy issues.
- Challenge: Discovering and researching the solution to the multipart/form-data issue.
  
Joe:
- Tried different implementations for MongoDB authentication
- Challenge: The SCRAM-SHA-1 and the SCRAM-SHA-256 authentication methods listed in the pymongo documentation did not pass the tests, but no longer resulted in errors

Kenny:
- Started researching how to build the frontend for prescriber using React based on the figma design.
- Created the prescription instance in MongoDB.
- Designed the endpoints for prescriber service.
	
# March 11th, 2024
Emily:
- Created API calls using Geopify to convert latitude and longitude into actual addresses (in the Green Resources frontend) - wherever the user clicks on the map
- Added in the frontend of green resources: the google maps link with directions to the selected location on the map
- Challenge: Finding an API that is free, that would convert longitude and latitude into the address
  
Michelle:
- Started on pulling prescriber logs
- Challenge: unsure how exactly the prescriber will be logging a prescription
  
Joe:
- Implemented list_all_users() to obtain all users in the database for testing purposes in backend/database functions/database.py
- Refactored code to make the code more modifiable and easier to change the implementation for testing purposes
- Challenge: The authentication methods in the pymongo documentation continued to fail when the original username and password were inputted
- I will attempt to test authentication directly in Mongo Shell

# March 12th, 2024
Emily:
- Created API calls using Geopify to get nearby parks, bike rentals, museums, conservation areas, parking,..., and display it in the frontend of Green Resources
- Added buttons for each category. It will display any nearby places based on the selected category
- Looked into how to add an image for each selected location (may need to call another API using Unsplash?)
- Challenge:
  - Calling all APIs while ensuring that I am under the API call limit was challenging when testing (ex: 50 calls per hour)
  - Calling the API using Unsplash to get images by keywords did not really work. When I tried “University of Toronto”, I did not get the correct image.
    
Lance:
- Begin tests with Jest
  
Joe:
- Implemented and tested user authentication functions and pushed commits to feat/auth branch on GitHub in backend/database functions/database.py

# March 14th, 2024
Michelle:
- Realized missing user story for a patient logging a prescription
	- Added it to the Jira as a new user story
- Still working on pulling prescription logs for prescribers
  
Kenny & Michelle:
- Worked on prescriber frontend

# March 16th, 2024
Michelle:
- Edited Figma for the updated prescriber login process
- Started working on creating the patient prescription form
  
Kenny:
- Started creating the endpoints for prescribers and patients to log prescriptions.
  
Joe:
- Started implementing authorization for database functions to make Admin-only functions

# March 17th, 2024
Michelle:
- Created the deliverable 3's sprint Retrospective and tasks document, uploaded to the repo
- Fixed up prescriber frontend to integrate with current React components
	- Challenge: Old draft relied too heavily on HTML elements, needed it to work with components to be consistent throughout
- Completed Login and Patient frontend 
  
Emily:
- Made a button that gets user’s live location
- Update Green Resources frontend to display current location or searched location through a pinIcon, address display, and Google Maps link
- Created a Flask server to web scrape the location’s website to get a description of the location for green resources
- Challenge: Finding free APIs to use
