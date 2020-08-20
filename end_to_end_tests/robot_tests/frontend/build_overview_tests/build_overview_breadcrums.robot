***Settings***
Resource                ../../../resources/resource.robot

*** Test Cases ***

Verify Build Overview Breadcrumbs
    Open overview page of build     1   1
    Store the team, series and build of build page
    Navigate to series overview page using breadcrumbs
    Series overview page should be of stored series     ${stored_series}
    Open overview page of build     1   1
    Navigate to team page using breadcrumbs
    Team page should be of stored team      ${stored_team}