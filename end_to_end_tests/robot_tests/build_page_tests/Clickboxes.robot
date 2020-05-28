***Settings***
Resource                ../../resources/resource.robot

*** Test Cases ***

Test CheckBoxes
  Open a build  1   1
  Build Should have test executions
  Hide Tests    Failing
  The status of all tests should be   Pass
  Hide Tests    Passing
  The list of tests should be empty
  Show Tests    Failing
  The status of all tests should be   Fail


*** Keywords ***


Open a build
  [Arguments]  ${series}  ${build}
  ${str}=   Catenate  SEPARATOR=  ${url}  series/    ${series}    /build/    ${build}    /history
  Go To  ${str}

Hide Tests
  [Arguments]   ${status}
  ${path}=  Set Variable If   '${status}' == 'Failing'  ${fail_checkbox_locator}  ${pass_checkbox_locator}
  Wait Until Element Is Enabled   ${fail_checkbox_locator}
  Checkbox Should Not Be Selected   ${Path}
  Select Checkbox   ${path}

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
  Checkbox Should Be Selected   ${path}
  Unselect Checkbox   ${path}

The status of all tests should be
  [Arguments]   ${status}
  ${path}=    Set Variable If    '${status}'  == 'Fail'   ${pass_span}    ${fail_span}
  ${count_hidden}=    Get Element Count    ${path}
  Should be Equal As Numbers    ${count_hidden}    0
    
The list of tests should be empty
  
  Wait Until Element is Enabled   ${table_locator}
  ${element_count}=   Get Element Count   ${table_row_locator}
  Should Be Equal As Numbers    ${element_count}    0