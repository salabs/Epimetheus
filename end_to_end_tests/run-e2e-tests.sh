#!/bin/sh 
echo "Sleep $ROBOT_START_SLEEP seconds..."
sleep $ROBOT_START_SLEEP
python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.0.1"
                ${ROBOT_ARGS} \
                ./robot_tests
EXITVAL=$?
#Testarchiver data storing can be added here,
#Important to exit with the right exit value from the test execution,
#not with the exitvalue from data storing. 
exit $EXITVAL