#!/bin/sh 
python -m robot --outputdir ./logs/ \
                --variablefile variables.py \
                --metadata "version:0.1.0" \
                ./robot_tests
EXITVAL=$?
#Testarchiver data storing can be added here,
#Important to exit with the right exit value from the test execution,
#not with the exitvalue from data storing. 
exit $EXITVAL