#!/usr/bin/env sh

# Required environment variables
# ENV - The environment to run the migration against

if [ -z $ENV ]; then
    echo "ENV variable must be set"
    exit 1
fi

ENCRYPTED_MYSQL_USER_PASSWORD=`yarn -s ts-node scripts/getEncryptedUserPassword.ts`
MYSQL_USER_PASSWORD=`yarn -s decryptSecret $ENCRYPTED_MYSQL_USER_PASSWORD`
SELECTED_DATABASE=`yarn -s ts-node scripts/getDatabaseName.ts`

SELECTED_DATABASE=$SELECTED_DATABASE MYSQL_USER_PASSWORD=$MYSQL_USER_PASSWORD yarn db-migrate \
		 --config ./dbmigrate/database.json \
		 --env $ENV \
		 --migrations-dir ./dbmigrate/migrations/ up
