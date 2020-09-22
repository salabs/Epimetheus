***Settings***
Resource                ../../../resources/resource.robot

*** Test Cases ***

Test Build History Breadcrumbs
    Open a build     1   1
    Store the team, series and build of build page
    Build page breadcrumbs should contain correct values    ${stored_build}    ${stored_series}   ${stored_team}
    Navigate to series overview page using breadcrumbs
    Series overview page should be of stored series     ${stored_series}
    Series page breadcrumbs should contain correct values   ${stored_series}   ${stored_team}
    Open a build     1   1
    Navigate to team page using breadcrumbs
    Team page should be of stored team      ${stored_team}
    Team page breadcrumb should contain correct value   ${stored_team}
