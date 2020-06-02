***Settings***
Resource                ../../../resources/resource.robot

***Variables***
${stored_team}
${stored_series}

*** Test Cases ***

Test Breadcrumbs
  Open a build  1   1
  Store the team and series of current page
  Navigate to history page using breadcrumbs
  History page should be of stored series
  Open a build    1    1
  Navigate to team page using breadcrumbs
  Team page should be of stored team

*** Keywords ***
    
Store the team and series of current page
    ${stored_team}=    Get Text    ${team_identifier}
    ${stored_series}=    Get Series    ${series_identifier}

Navigate to history page using breadcrumbs
    Click Element    ${series_breadcrumb}

History page should be of stored series
    ${found_series}=    Get Text    ${series_name}
    Should Be Equal As Text    ${found_series}    ${stored_series}
    

Navigate to team page using breadcrumbs
    Click Element    ${team_breadcrumb} 
    
Team page should be of stored team
    Location should contain    ${stored_team}