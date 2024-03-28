set type=%1

IF "%type%" EQU "install" (
    set command=npm install
) ELSE (
    set command=npm run %type%
)

IF "%type%" EQU "" (
    set command=npm run dev
)

start cmd /k "cd backend/api_gateway && %command% && exit"
start cmd /k "cd backend/verification_service && cd .venv/Scripts && activate && cd ../.. && python ./src/main.py && exit"
start cmd /k "cd backend/database_functions && cd .venv/Scripts && activate && cd ../.. && python -m flask --app database_Prescriptions run && exit"
start cmd /k "cd backend/auth_service && cd .venv/Scripts && activate && cd ../.. && python -m flask --app database_Authentications run && exit"
start cmd /k "cd backend/ && python scrapeDescription.py && exit"

start cmd /k "cd frontend && %command% && exit"
