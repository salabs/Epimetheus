*** Settings ***

Resource        ./variables.robot
Resource        ../common/common_keywords.robot

*** Keywords ***


Hide Tests
  [Arguments]   ${status}
  ${path}=  Set Variable If   '${status}' == 'Failing'  ${fail_checkbox_locator}  ${pass_checkbox_locator}
  Wait Until Element Is Enabled   ${fail_checkbox_locator}
  Click Element   ${path}

Build Should have test executions
  Wait Until Element Is Enabled     ${last_run_table}
  ${count_fail}=    Get Element Count    ${fail_span}
  ${count_pass}=    Get Element Count    ${pass_span}
  ${total_count}=    Evaluate    ${count_fail}+${count_pass}
  Should be true    ${total_count} > 0

Show Tests
  [Arguments]   ${status}
  ${path}=  Set Variable If   '${status}' == 'Failing'  ${fail_checkbox_locator}  ${pass_checkbox_locator}
  Wait Until Element Is Enabled   ${fail_checkbox_locator}
  Click Element   ${path}

The status of all tests should be
  [Arguments]   ${status}
  ${path}=    Set Variable If    '${status}'  == 'Fail'   ${pass_span}    ${fail_span}
  ${count_hidden}=    Get Element Count    ${path}
  Should be Equal As Numbers    ${count_hidden}    0
    
The list of tests should be empty
  
  Wait Until Element is Enabled   ${table_locator}
  ${element_count}=   Get Element Count   ${table_row_locator}
  Should Be Equal As Numbers    ${element_count}    0


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

