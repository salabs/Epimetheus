***Settings***
Resource                ../../resources/resource.robot

*** Test Cases ***

Test CheckBoxes
  Open a build  1   1
  Hide Tests    Failing
  The status of all tests should be   Passing
  Hide Tests    Passing
  The list of tests should be empty
  Show Tests    Failing
  The status of all tests should be   Failing


*** Keywords ***


Open a build
  [Arguments]  ${series}  ${build}
  ${str}=   Catenate  SEPARATOR=  ${url}  series/    ${series}    /build/    ${build}
  Go To  ${str}

Hide Tests
  [Arguments]   ${status}
  ${path}=  Set Variable If   '${status}' == 'Failing'  ${fail_checkbox_locator}  ${pass_checkbox_locator}
  Wait Until Element Is Enabled   ${fail_checkbox_locator}
  Checkbox Should Not Be Selected   ${Path}
  Select Checkbox   ${path}

Show Tests
  [Arguments]   ${status}
  ${path}=  Set Variable If   '${status}' == 'Failing'  ${fail_checkbox_locator}  ${pass_checkbox_locator}
  Wait Until Element Is Enabled   ${fail_checkbox_locator}
  Checkbox Should Be Selected   ${path}
  Unselect Checkbox   ${path}

The status of all tests should be
  [Arguments]   ${status}
  Log   To be Added    WARN

The list of tests should be empty
  
  Wait Until Element is Enabled   ${table_locator}
  ${element_count}=   Get Element Count   ${table_row_locator}
  Should Be Equal As Numbers    ${element_count}    0