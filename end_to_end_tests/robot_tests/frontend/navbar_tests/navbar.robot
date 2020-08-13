***Settings***

Resource                            ../../../resources/resource.robot
Library                             Collections

***Variable***

${nav_id}=    'main-nav'
@{default_nav}    Help    Team    GitHub
@{inner_nav}    History    Dashboard

***Test Cases***

Test NavBar Links from index
  Current Page Is    url=${URL}
  ${url}=    Get Location
  Test Page without Inner Nav    ${url}

Test Navbar Links From Team Page
  Open Team Page
  ${url}=    Get Location
  Test Page without Inner Nav    ${url}

Test Navbar Links From Series Page
  Open Series Page of Team    Epimetheus
  ${url}=    Get Location
  Test Page without Inner Nav    ${url}

Test Navbar Links From History Page
  Open history page of series    3
  ${url}=    Get Location
  Test Page with Inner Nav    ${url}


Test Navbar Links From Build Page
  Open a build    1    1
  ${url}=    Get Location
  Test Page with Inner Nav    ${url}

Test Navbar links From Dashboard Page
  Open overview page of series    3
  ${url}=    Get Location
  Test Page with Inner Nav    ${url}

*** Keywords ***

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

