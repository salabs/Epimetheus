***Settings***
Resource                ../../../resources/resource.robot

*** Test Cases ***

Verify Last build info and Breadcrumb
    Navigate to first suite of build    1   1
    Store the team, series, build and suite of a suite page
    Suite page breadcrumbs should contain correct values    ${stored_suite}    ${stored_build}    ${stored_series}   ${stored_team}
    Navigate to build overview page using breadcrumbs
    Build page breadcrumbs should contain correct values    ${stored_build}    ${stored_series}   ${stored_team}
    Build overview page should be of stored build   ${stored_build}
    Open a suite    1   1   ${stored_suite}
    Navigate to series overview page using breadcrumbs
    Series overview page should be of stored series     ${stored_series}
    Series page breadcrumbs should contain correct values   ${stored_series}   ${stored_team}
    Open a suite    1   1   ${stored_suite}
    Navigate to team page using breadcrumbs
    Team page should be of stored team      ${stored_team}
    Team page breadcrumb should contain correct value   ${stored_team}
