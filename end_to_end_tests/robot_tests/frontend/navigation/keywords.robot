*** Settings ***

Resource    ./variables.robot
Resource    ../common/common_keywords.robot

*** Keywords ***


Store Series Headers
  Wait Until Element is Enabled   ${series_list}
  ${series}=  Get WebElements   ${series_list}

  FOR    ${serial}    IN    @{series}

      ${header_text}=    Get Line    ${serial.text}    0
      Append To List    ${series_names}    ${header_text}
  END

Test Overview of All Stored Series
    Wait Until Element is Enabled   ${series_list}

    FOR    ${header}    IN    @{series_names}
      Click Element     id=${header}_series
      Wait Until Element is Enabled    ${timeline_locator}
      Go Back
      Wait Until Element is Enabled   ${series_list}
    END

Test Last Builds of All Stored Series
    Wait Until Element is Enabled   ${series_list}
    FOR    ${header}    IN    @{series_names}
      Click Element     id=${header}_builds
      Wait Until Element is Enabled    ${buildOverviewContainer}
      Go Back
      Wait Until Element is Enabled   ${series_list}
    END

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
      Click Element     xpath://*[contains(@class, "ta-${header}-card")]
      Wait Until Element is Enabled    ${series_list}
      Go Back
      Wait Until Element is Enabled   ${teams_xpath}
  END

Test page with inner nav
  [Arguments]    ${return_url}
  Current Page is    ${return_url}
  Element should be visible    ${nav_id}
  Default navbar contains    ${default_nav}
  Inner navbar contains    ${inner_nav}

  Test Dashboard Nav Link
  Current Page is    ${return_url}

  Test History Nav Link
  Current Page is    ${return_url}

  Test Team Nav Link
  Current Page is    ${return_url}

  Test Help Nav Link

Test page without inner nav
  [Arguments]    ${return_url}
  Current Page is     ${return_url}
  Element should be visible    ${nav_id}
  Default navbar contains    ${default_nav}

  Test Team Nav Link
  Current Page Is    ${return_url}
  Test Team Nav Link

Test Team Nav Link
  Click Link	${NAV_TEAM}
  Current Page Is   url=${team_url}
  Element should be visible    ${nav_id}
  Default navbar contains    ${default_nav}

Test Help Nav Link
  Click Link    ${NAV_HOMEPAGE}
  Current Page Is   url=${URL}
  Element should be visible    ${nav_id}
  Default navbar contains    ${default_nav}

Test History Nav Link
  Click Link    ${INNER_HISTORY}

Test Dashboard Nav Link
  Click Link    ${INNER_DASHBOARD}


Default navbar contains
  [Arguments]    ${navbar_content}

  ${0}=    Get From List    ${navbar_content}    0
  ${1}=    Get From List    ${navbar_content}    1
  ${2}=    Get From List    ${navbar_content}    2

  Element Should Contain	${nav_id}	${0}
  Element Should Contain	${nav_id}	${1}
  Element Should Contain	${nav_id}	${2}

Inner navbar contains
  [Arguments]    ${inner_navbar_content}
  ${0}=    Get From List    ${inner_navbar_content}    0
  ${1}=    Get From List    ${inner_navbar_content}    1
  Element Should Contain	${nav_id}	${0}
  Element Should Contain	${nav_id}	${1}

