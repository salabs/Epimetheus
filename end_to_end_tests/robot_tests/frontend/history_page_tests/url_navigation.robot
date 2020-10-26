***Settings***

Resource                            ../../../resources/resource.robot
Resource                            ./history_keywords.robot

***Test Cases***

Test Url Navigation
    Current Page Is    url=${URL}
    Wait Until Page Contains                Epimetheus
    Wait Until Element Contains             ${HELP_PAGE_WELCOME_ELEMENT}                Welcome 
    Click Element                           ${NAV_TEAM}       

Test Series History Url Navigation With Offset Parameters
    Open history page of series with url params     3   0   5
    Table should be limited to    number=5
    Left Button Should be disabled

    Open history page of series with url params     3   1   10
    Table should be limited to    number=10
    Left Button Should be enabled
    Set Offset field to   1
    Left Button Should be enabled
    Set Offset field to   2
    Left Button Should be disabled

    Open history page of series with url params     3   2   15
    Table should be limited to    number=15
    Left Button Should be enabled
    Set Offset field to   2
    Left Button Should be enabled
    Set Offset field to   3
    Left Button Should be disabled

Test Series History Url Navigation With Failing
    Open history page of series with checkbox set   3   Passing
    Checkbox is ticked for  Passing

    Open history page of series with checkbox set   3   Failing
    Checkbox is ticked for  Failing


***Keywords***

Checkbox is ticked for
    [Arguments]     ${status}
    Wait Until Element Is Enabled   ${fail_checkbox_locator}
    ${path}=    Set Variable If    '${status}' == 'Passing'   ${clicked_pass}    ${clicked_fail}
    Log     ${status}   Warn
    Log     ${path}     Warn
    ${count}=    Get Element Count   ${path}
    Should be Equal As Numbers    ${count}    1

