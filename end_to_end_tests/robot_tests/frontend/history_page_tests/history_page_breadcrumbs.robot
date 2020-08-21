***Settings***
Resource                ../../../resources/resource.robot

*** Test Cases ***

Test Series History Breadcrumbs
    Open history page of series     1
    Store team and series of series history page
    Series page breadcrumbs should contain correct values   ${stored_series}   ${stored_team}
    Navigate to team page using breadcrumbs
    Team page should be of stored team      ${stored_team}
    Team page breadcrumb should contain correct value   ${stored_team}