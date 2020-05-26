*** Settings ***
Resource                            ${EXECDIR}${/}resources${/}resource.robot
Suite Setup                         Open Browser To Epimetheus Landing Page             Chrome    epimetheus_seleniumgrid_1:4444/wd/hub
Suite Teardown                      Custom Teardown

***Keywords***
Custom Teardown
    Sleep   5
    Close All Browsers