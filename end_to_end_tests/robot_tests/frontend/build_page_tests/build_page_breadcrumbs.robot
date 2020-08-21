***Settings***
Resource                ../../../resources/resource.robot

*** Test Cases ***

Test Breadcrumbs
<<<<<<< HEAD
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
=======
  Open a build  1   1
  Store the team, series and build of build page
  Navigate to series overview page using breadcrumbs
  Series overview page should be of stored series   ${stored_series}
  Open a build    1    1
  Navigate to team page using breadcrumbs
  Team page should be of stored team

>>>>>>> 61c567be3391c8cc8428197a6a7f90808087a74b
*** Keywords ***
    
# Store the team and series of current page
#     Wait Until Element Is Enabled    ${build_page_info_table}
#     ${temp_stored_team}=    Get Text    ${team_identifier}
#     ${temp_stored_series}=    Get Text    ${series_identifier}

#     Set Suite Variable    ${stored_team}    ${temp_stored_team}
#     Set Suite Variable    ${stored_series}    ${temp_stored_series}

# Navigate to overview page using breadcrumbs
#     Wait Until Element is Enabled    ${series_breadcrumb}
#     Click Element    ${series_breadcrumb}

# Overview page should be of stored series
#     Wait Until Element Is Enabled    ${timeline_locator}
#     Element Should Contain    ${siteHeader}    ${stored_series}
    
# Navigate to team page using breadcrumbs
#     Wait Until Element is Enabled    ${team_breadcrumb} 
#     Click Element    ${team_breadcrumb} 
    
# Team page should be of stored team
#     Location should contain    ${stored_team}