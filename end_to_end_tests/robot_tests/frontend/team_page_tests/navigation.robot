***Settings***

Resource                            ../../../resources/resource.robot
Library                             String
Library                             Collections

*** Variables ***
@{team_names}

*** Test Cases ***

Test Teams Page Component Usage
  Open Team Page
  Store Team Headers
  Test Team Navigation using Team Headers

*** Keywords ***

Store Team Headers
  Wait Until Element is Enabled   ${teams_xpath}
  ${teams}=  Get WebElements   ${teams_xpath}

  FOR    ${teami}    IN    @{teams}
      ${header_text}=    Get Line    ${teami.text}    0
      Append To List    ${team_names}    ${header_text}
  END

Test Team Navigation using Team Headers
  Wait Until Element is Enabled   ${teams_xpath}
  #This long identifier points to the header part of the component that matches the header text
  FOR    ${header}    IN    @{team_names}
      Click Element     xpath://*[contains(@class, "ta_${header}_card")]
      Wait Until Element is Enabled    ${series_list}
      Go Back
      Wait Until Element is Enabled   ${teams_xpath}
  END
