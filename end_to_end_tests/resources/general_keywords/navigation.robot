*** Keywords ***

Current Page Is
  [Arguments]	${url}
  Go To     ${url}

Page contains id
  [Arguments]	${id}
  Element should be Enabled	${id}

Open Team Page
    Go To   url=${team_url}


Open Index Page
    Go To    url=${URL}

Open Series Page of Team
  [Arguments]    ${team}
  ${url} =   Catenate  SEPARATOR=    ${team_url}    ${team}
  Go To   ${url}

Open a build
  [Arguments]  ${series}  ${build}
  ${str}=   Catenate  SEPARATOR=  ${url}  series/    ${series}    /build/    ${build}    /history
  Go To  ${str}

Open history page of series
  [Arguments]    ${series}
  ${str}=   Catenate  SEPARATOR=    ${history_url}    ${series}    /history
  Current Page Is     url=${str}
  ${url}=   Get Location
  Should be equal as Strings   ${url}   ${str}

Open overview page of series
  [Arguments]    ${series}
  ${str}=   Catenate  SEPARATOR=    ${history_url}    ${series}    /overview
  Current Page Is     url=${str}
  ${url}=   Get Location
  Should be equal as Strings   ${url}   ${str}

Open overview page of build
  [Arguments]   ${series}   ${build}
  ${url}=   Catenate  SEPARATOR=  ${url}  series/   ${series}   /build/   ${build}    /overview
  Go To   ${url}

Open a suite 
  [Arguments] ${series} ${build}  ${suite}
  ${url}=   Catenate  SEPARATOR=  ${url}  series/   ${series}   /build/   ${build}    /suite/   ${suite}    /history
  Go To   ${url}