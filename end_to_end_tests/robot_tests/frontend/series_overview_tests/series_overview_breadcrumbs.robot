***Settings***
Resource                ../../../resources/resource.robot

*** Test Cases ***

Verify Last build info and Breadcrumb
    Open overview page of series  1
    ${info}=    Get Build Info       1       1
    ${team}=    Get Team From Info      ${info}
    ${series}=      Get Series From Info    ${info}
    
    Series page breadcrumbs should contain correct values   ${series}   ${team}
    Navigate to team page using breadcrumbs
    Team page should be of stored team      ${team}
    Team page breadcrumb should contain correct value   ${team}

