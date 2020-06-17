#!/bin/sh 

python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.3.0" \
                --metadata "cipipelineid:$cipipelineid" \
                --metadata "series:$series" \
                --metadata "branch:$branch" \
                --metadata "commitsha:$commitsha" \
                --metadata "changedfiles:$changedfiles" \
                --metadata "joburl:$joburl" \
                --metadata "cijobid:$cijobid" \
                --metadata "username:$username" \
                --metadata "environment:$environment" \
                --metadata "testframework:$testframework" \ 
                --include Backend \
                ./robot_tests
BACKEND=$?

#Testarchiver data storing can be added here,
#Important to exit with the right exit value from the test execution,
#not with the exitvalue from data storing. 

DATABASE=github_test
HOST=testarchiverdb.postgres.database.azure.com
USER=testarchiver@testarchiverdb
PASSWORD=tallentaj123!



echo "---------------------------------------------"
echo " Archiving Backend reports from ./logs -directory"
echo "---------------------------------------------"
find ./logs -name \*.xml -type f -print0 | xargs -0 -n1 testarchiver --dbengine postgresql --database "$DATABASE" --host "$HOST" \
                                            --user "$USER" --pw "$PASSWORD"  \
                                            --team Epimetheus --series ci_backend#${BUILD_NUMBER} --format robotframework



python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.3.0" \
                --metadata "cipipelineid:$cipipelineid" \
                --metadata "series:$series" \
                --metadata "branch:$branch" \
                --metadata "commitsha:$commitsha" \
                --metadata "joburl:$joburl" \
                --metadata "cijobid:$cijobid" \
                --metadata "username:$username" \
                --metadata "environment:$environment" \
                --metadata "testframework:$testframework" \ 
                --include History \
                ./robot_tests
History=$?

echo "---------------------------------------------"
echo " Archiving History Page reports from ./logs -directory"
echo "---------------------------------------------"
find ./logs -name \*.xml -type f -print0 | xargs -0 -n1 testarchiver --dbengine postgresql --database "$DATABASE" --host "$HOST" \
                                            --user "$USER" --pw "$PASSWORD"  \
                                            --team Epimetheus --series ci_history_page#${BUILD_NUMBER} --format robotframework

python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.3.0" \
                --metadata "cipipelineid:$cipipelineid" \
                --metadata "series:$series" \
                --metadata "branch:$branch" \
                --metadata "commitsha:$commitsha" \
                --metadata "joburl:$joburl" \
                --metadata "cijobid:$cijobid" \
                --metadata "username:$username" \
                --metadata "environment:$environment" \
                --metadata "testframework:$testframework" \ 
                --include NavBar \
                ./robot_tests

NAVBAR=$?

echo "---------------------------------------------"
echo " Archiving Navigation Bar reports from ./logs -directory"
echo "---------------------------------------------"
find ./logs -name \*.xml -type f -print0 | xargs -0 -n1 testarchiver --dbengine postgresql --database "$DATABASE" --host "$HOST" \
                                            --user "$USER" --pw "$PASSWORD"  \
                                            --team Epimetheus --series ci_navigation_bar#${BUILD_NUMBER} --format robotframework

python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.3.0" \
                --metadata "cipipelineid:$cipipelineid" \
                --metadata "series:$series" \
                --metadata "branch:$branch" \
                --metadata "commitsha:$commitsha" \
                --metadata "joburl:$joburl" \
                --metadata "cijobid:$cijobid" \
                --metadata "username:$username" \
                --metadata "environment:$environment" \
                --metadata "testframework:$testframework" \ 
                --include Team \
                ./robot_tests

TEAM=$?

echo "---------------------------------------------"
echo " Archiving Team Page reports from ./logs -directory"
echo "---------------------------------------------"
find ./logs -name \*.xml -type f -print0 | xargs -0 -n1 testarchiver --dbengine postgresql --database "$DATABASE" --host "$HOST" \
                                            --user "$USER" --pw "$PASSWORD"  \
                                            --team Epimetheus --series ci_team_page#${BUILD_NUMBER} --format robotframework

python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.3.0" \
                --metadata "cipipelineid:$cipipelineid" \
                --metadata "series:$series" \
                --metadata "branch:$branch" \
                --metadata "commitsha:$commitsha" \
                --metadata "joburl:$joburl" \
                --metadata "cijobid:$cijobid" \
                --metadata "username:$username" \
                --metadata "environment:$environment" \
                --metadata "testframework:$testframework" \ 
                --include Series \
                ./robot_tests

SERIES=$?

echo "---------------------------------------------"
echo " Archiving Series Page reports from ./logs -directory"
echo "---------------------------------------------"
find ./logs -name \*.xml -type f -print0 | xargs -0 -n1 testarchiver --dbengine postgresql --database "$DATABASE" --host "$HOST" \
                                            --user "$USER" --pw "$PASSWORD"  \
                                            --team Epimetheus --series ci_series_page#${BUILD_NUMBER} --format robotframework


python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.3.0" \
                --metadata "cipipelineid:$cipipelineid" \
                --metadata "series:$series" \
                --metadata "branch:$branch" \
                --metadata "commitsha:$commitsha" \
                --metadata "joburl:$joburl" \
                --metadata "cijobid:$cijobid" \
                --metadata "username:$username" \
                --metadata "environment:$environment" \
                --metadata "testframework:$testframework" \ 
                --include Build \
                ./robot_tests

BUILD=$?

echo "---------------------------------------------"
echo " Archiving Build Page reports from ./logs -directory"
echo "---------------------------------------------"
find ./logs -name \*.xml -type f -print0 | xargs -0 -n1 testarchiver --dbengine postgresql --database "$DATABASE" --host "$HOST" \
                                            --user "$USER" --pw "$PASSWORD"  \
                                            --team Epimetheus --series ci_build_page#${BUILD_NUMBER} --format robotframework

EXITVAL=$((SERIES+TEAM+NAVBAR+HISTORY+BACKEND+BUILD))
exit $EXITVAL
