#!/bin/sh 



if [ ! -z "${CI_PIPELINE_ID}" ]; then 

python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.3.0" \
                --metadata "ci_pipeline_id:$CI_PIPELINE_ID" \
                --metadata "branch:$CI_COMMIT_REF_NAME" \
                --metadata "commit_sha:$CI_COMMIT_SHA" \
                --metadata "job_url:https://github.com/$CI_REPOSITORY/actions/runs/$CI_RUN_ID" \
                --metadata "ci_run_id:$CI_RUN_ID" \
                --metadata "run_number:$CI_RUN_NUMBER" \
                --metadata "username:$CI_USERNAME" \
                --metadata "ci_event_name:$CI_EVENT_NAME" \
                --metadata "Environment:CI" \
                --metadata "Test_Framework:robotframework" \
                --include Backend \
                ./robot_tests
BACKEND=$?

#Testarchiver data storing can be added here,
#Important to exit with the right exit value from the test execution,
#not with the exitvalue from data storing. 

echo "---------------------------------------------"
echo " Archiving Backend reports from ./logs -directory"
echo "---------------------------------------------"
find ./logs -name \*.xml -type f -print0 | xargs -0 -n1 testarchiver --dbengine postgresql --database "$DATABASE" --host "$HOST" \
                                            --user "$USER" --pw "$PASSWORD"  \
                                            --team Epimetheus --series ci_backend#"${CI_RUN_NUMBER}" --series "${CI_COMMIT_REF_NAME}"#"${CI_RUN_NUMBER}" --format robotframework

python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.3.0" \
                --metadata "ci_pipeline_id:$CI_PIPELINE_ID" \
                --metadata "branch:$CI_COMMIT_REF_NAME" \
                --metadata "commit_sha:$CI_COMMIT_SHA" \
                --metadata "job_url:https://github.com/$CI_REPOSITORY/actions/runs/$CI_RUN_ID" \
                --metadata "ci_run_id:$CI_RUN_ID" \
                --metadata "run_number:$CI_RUN_NUMBER" \
                --metadata "username:$CI_USERNAME" \
                --metadata "ci_event_name:$CI_EVENT_NAME" \
                --metadata "Environment:CI" \
                --metadata "Test_Framework:robotframework" \
                --include Frontend \
                ./robot_tests

FRONTEND=$?

echo "---------------------------------------------"
echo " Archiving Frontend Page reports from ./logs -directory"
echo "---------------------------------------------"
find ./logs -name \*.xml -type f -print0 | xargs -0 -n1 testarchiver --dbengine postgresql --database "$DATABASE" --host "$HOST" \
                                            --user "$USER" --pw "$PASSWORD"  \
                                            --team Epimetheus --series ci_frontend#"${CI_RUN_NUMBER}" --series "${CI_COMMIT_REF_NAME}"#"${CI_RUN_NUMBER}" --format robotframework

EXITVAL=$((FRONTEND+BACKEND))

else

python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.3.0" \
                --metadata "environment:locally" \
                --include Backend \
                ./robot_tests
BACKEND=$?

#Testarchiver data storing can be added here,
#Important to exit with the right exit value from the test execution,
#not with the exitvalue from data storing. 

echo "---------------------------------------------"
echo " Archiving Backend reports from ./logs -directory"
echo "---------------------------------------------"
find ./logs -name \*.xml -type f -print0 | xargs -0 -n1 testarchiver --dbengine postgresql --database "$DATABASE" --host "$HOST" \
                                            --user "$USER" --pw "$PASSWORD"  \
                                            --team Epimetheus --series ci_backend --format robotframework



python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.3.0" \
                --metadata "environment:locally" \
                --include Frontend \
                ./robot_tests
FRONTEND=$?

echo "---------------------------------------------"
echo " Archiving Frontend Page reports from ./logs -directory"
echo "---------------------------------------------"
find ./logs -name \*.xml -type f -print0 | xargs -0 -n1 testarchiver --dbengine postgresql --database "$DATABASE" --host "$HOST" \
                                            --user "$USER" --pw "$PASSWORD"  \
                                            --team Epimetheus --series ci_frontend --format robotframework

EXITVAL=$((FRONTEND+BACKEND))

fi
exit $EXITVAL
