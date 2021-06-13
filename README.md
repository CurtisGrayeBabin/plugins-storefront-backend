Hello! Here are inital database setup instructions for this project:

1. Using psql create the database "plugins_dev" (for manual testing)

2. Create the user "plugins_user" with a password of "password123"

3. Grant all privileges to "plugins_user" by running:
"alter user plugins_user with superuser;" 
so that model and endpoint testing can occur correctly (allows plugins_user to create and remove the "plugins_test" database with the "npm run test" script)

Dependencies should be installed with "npm install"

The server listens on port 3000 and the databases run locally on port 5432


To run up-migrations:
 "npm run migup"

To run down-migrations:
"npm run migdown"

To run server:
"npm run watch"

Tests can be run with:
"npm run test"

The test script runs db-migrate with superuser privileges that should be granted to "plugins_user" from step 3 of the database setup instructions.

If an error occurs during testing (socket hang up) then run:
"npm run dropTestDB" 
to clear the testing database and re-run 
"npm run test" 
to run the tests again.

*These are the necessary environment variables (for this project only):*

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=plugins_dev
POSTGRES_TEST_DB=plugins_test
POSTGRES_USER=plugins_user
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=never-gonna-give-you-up
SALT_ROUNDS=10
TOKEN_SECRET=memesforlifeforreal
TEST_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbHVnaW4iOnsiaWQiOjQsIm5hbWUiOiJOZXcgUGx1Z2luIiwicHJpY2UiOiIxMDAwIn0sImlhdCI6MTYyMzAyNzkyM30.h3oYrxikPvwLMeW2REQMaZFUxeaKut0JfPW-lzE_lLY