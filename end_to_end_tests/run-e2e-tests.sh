#!/bin/sh 

python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.1.0" \
                ./robot_tests
EXITVAL=$?
#Testarchiver data storing can be added here,
#Important to exit with the right exit value from the test execution,
#not with the exitvalue from data storing. 


echo "---------------------------------------------"
echo " Archiving reports from ./logs -directory"
echo "---------------------------------------------"
find ./logs -name \*.xml -type f -print0 | xargs -0 -n1 testarchiver --dbengine postgresql --database $DATABASE --host $HOST \
                                            --user $USER --pw $PASSWORD  \
                                            --team Epimetheus --series e2e_test --format robotframework


exit $EXITVAL
