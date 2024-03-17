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
start cmd /k "cd backend/auth_service && %command% && exit"
start cmd /k "cd backend/verification_service && python -m flask --app ./src/main run && exit"

start cmd /k "cd frontend && %command% && exit"