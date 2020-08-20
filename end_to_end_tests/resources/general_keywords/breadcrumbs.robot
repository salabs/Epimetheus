***Settings***
Resource                ../resource.robot

*** Keywords ***

Navigate to series overview page using breadcrumbs
    Wait Until Element is Enabled    ${series_breadcrumb}
    Click Element    ${series_breadcrumb}

Navigate to team page using breadcrumbs
    Wait Until Element is Enabled    ${team_breadcrumb} 
    Click Element    ${team_breadcrumb} 
    
Navigate to build overview page using breadcrumbs
    Wait Until Element is Enabled   ${build_breadcrumb}
    Click Element   ${build_breadcrumb}

Team page breadcrumb should contain correct value
    [Arguments]     ${team}
    Element Should Contain      ${team_breadcrumb}  ${team}
    
Series page breadcrumbs should contain correct values
    [Arguments]     ${series}   ${team}
    Team page breadcrumb should contain correct value   ${team}
    Element Should Contain      ${series_breadcrumb}        ${series}

Build page breadcrumbs should contain correct values
    [Arguments]     ${build}    ${series}   ${team}
    Series page breadcrumbs should contain correct values   ${series}   ${team}
    Element Should Contain      ${build_breadcrumb}     ${build}

Suite page breadcrumbs should contain correct values
    [Arguments]     ${suite}    ${build}    ${series}   ${team} 
    Build page breadcrumbs should contain correct values    ${build}    ${series}   ${team}
    Element Should Contain      ${suite_breadcrumb}     ${suite}

Series overview page should be of stored series
    [Arguments]     ${series}
    Wait Until Element Is Enabled    ${timeline_locator}
    Element Should Contain      ${siteHeader}       ${series}
    Element Should Contain      ${series_breadcrumb}        ${series} 

Build overview page should be of stored build
    [Arguments]     ${build}
    Wait Until Element Is Enabled   ${buildOverviewContainer}
    Element Should Contain      ${build_identifier}     ${build}
    Element Should Contain      ${siteHeader}       ${build}
    Element Should contain      ${build_breadcrumb}     ${build}

Team page should be of stored team
    [Arguments]     ${team}
    Location should contain    ${stored_team}

Store the team, series and build of build page
    Wait Until Element Is Enabled    ${build_page_info_table}
    ${temp_stored_team}=    Get Text    ${team_identifier}
    ${temp_stored_series}=    Get Text    ${series_identifier}
    ${temp_stored_build}=   Get Text    ${build_identifier}

    Set Suite Variable      ${stored_team}      ${temp_stored_team}
    Set Suite Variable      ${stored_series}        ${temp_stored_series}
    Set Suite Variable      ${stored_build}     ${temp_stored_build}

Store team and series of series history page
    Wait Until Element Is Enabled    ${build_page_info_table}
    ${temp_stored_team}=    Get Text    ${team_identifier}
    ${temp_stored_series}=    Get Text    ${series_identifier}

    Set Suite Variable      ${stored_team}      ${temp_stored_team}
    Set Suite Variable      ${stored_series}        ${temp_stored_series}
