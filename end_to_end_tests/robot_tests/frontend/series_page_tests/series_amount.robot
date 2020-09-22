***Settings***

Resource                            ../../../resources/resource.robot


*** Test Cases ***


Series Amount
    Store Amount of Series of team in API  Epimetheus
    Open Series Page of Team    Epimetheus
    Series amount displayed by UI matches API


*** Keywords ***


Store Amount of Series of team in API
  [Arguments]   ${team}

  ${amount}=    Get Series Number  ${team}
  Set Suite Variable    ${series_amount}    ${amount}

Open Series Page of Team
  [Arguments]    ${team}
  ${url} =   Catenate  SEPARATOR=    ${team_url}    ${team}    
  Go To   ${url}

Series amount displayed by UI matches API
  ${url}=    Get Location
  
  Wait Until Element Is Enabled   ${series_list}
  ${elements}=    Get Element Count   ${series_list}
  
  Should Be Equal As Numbers   ${elements}   ${series_amount}
  
