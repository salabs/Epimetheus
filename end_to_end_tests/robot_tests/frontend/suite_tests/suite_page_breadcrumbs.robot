***Settings***
Resource                ../../../resources/resource.robot

*** Test Cases ***

Verify Last build info and Breadcrumb
    Open a suite    1   1   3
    Store the team, series, build of current page
    Suite page breadcrumbs should contain correct values
    Navigate to build overview page using breadcrumbs
    Build overview page should be of stored build
    Open a suite    1   1   3
    Navigate to series overview page using breadcrumbs
    Series overview page should be of stored series
    Open a suite    1   1   3
    Navigate to team page using breadcrumbs
    Team page should be of stored team
    
*** Keywords ***
