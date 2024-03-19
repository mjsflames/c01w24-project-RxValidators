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
@REM start cmd /k "cd backend/auth_service && %command% && exit"
@REM start cmd /k "cd backend/verification_service && python -m flask --app ./src/main run && exit"
start cmd /k "cd backend/verification_service && python ./src/main.py && exit"
@REM start cmd /k "cd backend/database_functions && python -m flask --app database_Prescriptions run && exit"
start cmd /k "cd backend/database_functions && python database_Prescriptions.py && exit"
start cmd /k "cd backend/ && python scrapeDescription.py && exit"

start cmd /k "cd frontend && %command% && exit"