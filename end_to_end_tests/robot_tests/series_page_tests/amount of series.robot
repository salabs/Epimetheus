***Settings***
Resource                ../../resources/resource.robot

*** Test Cases ***


Series Amount
    Log Amount of Series of team in API  Epimetheus
    UI displays correct amount of series for   Epimetheus


*** Keywords ***


Log Amount of Series of team in API
  [Arguments]   ${team}

  ${series}=   Get Series Number  ${team}
  Set Number  ${series}



UI displays correct amount of series for
  [Arguments]   ${team}
  ${urli} =   Catenate  SEPARATOR=    ${team_url}    ${team}    
  Go To   ${urli}
  Wait Until Element Is Enabled   //*[@id="selectedTeam"]/div[2]/div
  ${elements}=    Get Element Count   //*[@id="selectedTeam"]/div[2]/div
  ${api} =  Get Number
  Should Be Equal As Numbers   ${elements}   ${api}
  
