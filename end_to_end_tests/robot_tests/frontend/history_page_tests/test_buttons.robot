***Settings***

Resource                            ../../../resources/resource.robot
Resource                            ./history_keywords.robot
*** Test Cases ***

Test Build Amount Dropdown
  Open history page of series    3
  Select From Dropdown    ${history_build_selector_5}
  Table should be limited to    number=5
  Select From Dropdown    ${history_build_selector_10}
  Table should be limited to    number=10
  Select From Dropdown    ${history_build_selector_30}
  Table should be limited to    number=30

Test Offset Functionality
  Open history page of series   3
  Store Most Recent Builds
  Offset should be    0
  Most Recent Build Number should be    ${most_recent_build}
  Set Offset field to   1000
  Left Button Should be disabled
  Right Button Should be disabled
  Set Offset field to   1
  Right Button Should be enabled
  Click Right Button
  Offset should be    1
  Most Recent Build Number should be    ${second_recent_build}
  Click Right Button
  Offset should be    2
  Most Recent Build Number should be    ${third_recent_build}
  Set Offset field to   1
  Left Button Should be enabled
  Click Left Button
  Offset should be    1
  Most Recent Build Number should be    ${second_recent_build}
  Left Button Should be enabled
  Click Left Button
  Offset should be    0
  Most Recent Build Number should be    ${most_recent_build}

*** Keywords ***

Select From Dropdown
  [Arguments]    ${dropdown_option}
  Wait Until Element Is Enabled   ${series_history_dropdown}
  Click Element   ${series_history_dropdown}
  Wait Until Element Is Visible   ${dropdown_option}
  Click Element   ${dropdown_option}

Browser is on a history page of series
  [Arguments]    ${series}
  ${str}=   Catenate  SEPARATOR=    ${history_url}    ${series}    /history
  Current Page Is     url=${str}
  ${url}=   Get Location
  Should be equal as Strings   ${url}   ${str}

Store Most Recent Builds
  Wait Until Element Is Enabled    ${series_history_most_recent}
  ${temp_most_recent}=    Get Text    ${series_history_most_recent}
  ${temp_second_recent}=    Get Text  ${series_history_second_recent}
  ${temp_third_recent}=   Get Text  ${series_history_third_recent}

  Set Suite Variable      ${most_recent_build}      ${temp_most_recent}
  Set Suite Variable      ${second_recent_build}    ${temp_second_recent}
  Set Suite Variable      ${third_recent_build}     ${temp_third_recent}

Most Recent Build Number should be
  [Arguments]   ${build}
  Wait Until Element Is Enabled    ${series_history_most_recent}
  ${temp_most_recent}=    Get Text    ${series_history_most_recent}

  Should be equal as Strings    ${build}    ${temp_most_recent}

Offset should be
  [Arguments]   ${value}
  ${url}=   Get Location
  Run Keyword if    'offset' in "${url}"  Check offset url    ${value}

Check offset url
  [Arguments]   ${value}
  ${url}=   Get Location
  ${full_string}=   Catenate  SEPARATOR=    offset    =    ${value}
  Should Contain    ${url}    ${full_string}

Click Right Button
  Click Element   ${offset_right}
Click Left Button
  Click Element   ${offset_left}

