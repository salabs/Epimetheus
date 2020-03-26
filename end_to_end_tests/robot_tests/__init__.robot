*** Settings ***
Resource                            ${EXECDIR}${/}resources${/}resource.robot
Suite Setup                         Open Browser To Epimetheus Landing Page          Chrome
Suite Teardown                      Custom Teardown

***Keywords***
Custom Teardown
    Sleep   5
    Close All Browsers