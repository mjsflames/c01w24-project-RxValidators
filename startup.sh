#!/bin/bash

type="$1"
if [ "$type" = "install" ]; then
    command="npm install"
else
    command="npm run $type"
fi

if [ -z "$type" ]; then
    command="npm run dev"
fi

gnome-terminal --tab --working-directory=$PWD/backend/api_gateway -- /bin/bash -c "$command; exec bash" &
gnome-terminal --tab --working-directory=$PWD/backend/auth_service -- /bin/bash -c "$command; exec bash" &
gnome-terminal --tab --working-directory=$PWD/backend/verification_service -- /bin/bash -c "bash setup_verification_service_env.sh; exec bash" &
gnome-terminal --tab --working-directory=$PWD/frontend -- /bin/bash -c "$command; exec bash" &
