*** Settings ***

Resource    ./variables.robot
Resource    ../common/common_keywords.robot

*** Keywords ***
Store Amount of Series of team in API
  [Arguments]   ${team}

  ${amount}=    Get Series Number  ${team}
  Set Suite Variable    ${series_amount}    ${amount}

Series amount displayed by UI matches API
  ${url}=    Get Location
  
  Wait Until Element Is Enabled   ${series_list}
  ${elements}=    Get Element Count   ${series_list}
  
  Should Be Equal As Numbers   ${elements}   ${series_amount}
  
Log Amount of Teams in API
  ${Teams} =  Get Team Number
  Set Number    ${Teams}

UI displays correct amount of teams
  Go To   ${team_url}
  Wait Until Element Is Enabled   ${teams_xpath}
  ${elements}=  Get Element Count   ${teams_xpath}
  ${api} =  Get Number
  Should Be Equal As Numbers   ${elements}   ${api}


