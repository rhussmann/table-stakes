#!/usr/bin/env sh

# Required environment variables
# ENV - The environment to run the migration against

if [ -z $ENV ]; then
    echo "ENV variable must be set"
    exit 1
fi

yarn db-migrate --config ./dbmigrate/database.json --env $ENV --migrations-dir ./dbmigrate/migrations/ reset
