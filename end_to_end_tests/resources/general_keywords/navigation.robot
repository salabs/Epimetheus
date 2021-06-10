*** Keywords ***

Current Page Is
  [Arguments]	${url}
  Go To     ${url}

Page contains id
  [Arguments]	${id}
  Element should be Enabled   ${id}

Open Team Page
    Go To   url=${team_url}


Open Index Page
    Go To    url=${URL}

Open Series Page of Team
  [Arguments]    ${team}
  ${url} =   Catenate  SEPARATOR=    ${team_url}    ${team}
  Go To   ${url}

Open a build
  [Arguments]  ${team}   ${series}  ${build}
  ${str}=   Catenate  SEPARATOR=  ${url}   team/   ${team}   /series/    ${series}    /build/    ${build}    /history
  Set Suite Variable    ${navigated_series}   ${series}
  Set Suite Variable    ${navigated_build}    ${build}
  Go To  ${str}
  Wait Until Element is Enabled   ${lastRunInfo}


Open history page of series
  [Arguments]   ${team}   ${series}
  ${str}=   Catenate  SEPARATOR=   ${url}   team/   ${team}   /series/   ${series}   /history
  Current Page Is     url=${str}
  ${url}=   Get Location
  Set Suite Variable    ${navigated_series}   ${series}
  Should be equal as Strings   ${url}   ${str}
  Wait Until Element is Enabled   ${lastRunInfo}

Open history page of series with url params
  [Arguments]   ${team}    ${series}    ${offset}   ${numberofbuilds}
  ${str}=   Catenate  SEPARATOR=    ${url}   team/   ${team}   /series/    ${series}    /history   ?offset=    ${offset}   &numberofbuilds=    ${numberofbuilds}
  Current Page Is     url=${str}
  ${url}=   Get Location
  Set Suite Variable    ${navigated_series}   ${series}
  Should be equal as Strings   ${url}   ${str}
  Wait Until Element is Enabled   ${lastRunInfo}


Open history page of series with checkbox set
  [Arguments]   ${team}   ${series}   ${boolean}
  ${str}=   Catenate  SEPARATOR=    ${url}   team/   ${team}   /series/   ${series}    /history   ?tag=   ${boolean}
  Current Page Is     url=${str}
  ${url}=   Get Location
  Set Suite Variable    ${navigated_series}   ${series}
  Should be equal as Strings   ${url}   ${str}
  Wait Until Element is Enabled   ${lastRunInfo}

Open overview page of series
  [Arguments]   ${team}    ${series}
  ${str}=   Catenate  SEPARATOR=    ${url}   team/   ${team}   /series/    ${series}    /overview
  Current Page Is     url=${str}
  ${url}=   Get Location
  Set Suite Variable    ${navigated_series}   ${series}
  Should be equal as Strings   ${url}   ${str}
  Wait Until Element is Enabled   ${timeline_locator}


Open overview page of build
  [Arguments]   ${team}   ${series}   ${build}
  ${url}=   Catenate  SEPARATOR=  ${url}   team/   ${team}   /series/   ${series}   /build/   ${build}    /overview
  Set Suite Variable    ${navigated_series}   ${series}
  Set Suite Variable    ${navigated_build}    ${build}
  Go To   ${url}
  Wait Until Element is Enabled   ${buildOverviewContainer}

Open a suite
  [Arguments]   ${team}   ${series}   ${build}    ${suite}
  ${url}=   Catenate  SEPARATOR=  ${url}   team/   ${team}  series/   ${series}   /build/   ${build}    /suite/   ${suite}    /history
  Set Suite Variable    ${navigated_series}   ${series}
  Set Suite Variable    ${navigated_build}    ${build}
  Set Suite Variable    ${navigated_suite}    ${suite}
  Go To   ${url}
  Wait Until Element is Enabled   ${lastRunInfo}


Navigate to first suite of build
  [Arguments]    ${team}   ${series}   ${build}
  ${url}=   Catenate  SEPARATOR=  ${url}   team/   ${team}   /series/   ${series}   /build/   ${build}    /history
  Go To   ${url}
  Wait Until Element is Enabled   ${first_suite}
  Click Element     ${first_suite}
  Wait Until Element is Enabled   ${suite_id_locator}
  Wait Until Element is Enabled   ${lastRunInfo}
