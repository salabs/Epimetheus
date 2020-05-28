***Settings***
Resource                ../../resources/resource.robot

*** Test Cases ***

Test Library
    Log Amount of Teams in API
    UI displays correct amount of teams


*** Keywords ***

Log Amount of Teams in API
  ${Teams} =  Get Team Number
  Set Number    ${Teams}

UI displays correct amount of teams
  Go To   ${team_url}
  Wait Until Element Is Enabled   ${teams_xpath}
  ${elements}=  Get Element Count   ${teams_xpath}
  ${api} =  Get Number
  Should Be Equal As Numbers   ${elements}   ${api}


