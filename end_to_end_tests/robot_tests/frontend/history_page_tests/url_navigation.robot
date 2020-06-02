***Settings***

Resource                            ../../../resources/resource.robot

***Test Cases***

Test Url Navigation
    Current Page Is    url=${URL}
    Wait Until Page Contains                Epimetheus
    Wait Until Element Contains             ${HELP_PAGE_WELCOME_ELEMENT}                Welcome 
    Click Element                           ${NAV_TEAM}             

