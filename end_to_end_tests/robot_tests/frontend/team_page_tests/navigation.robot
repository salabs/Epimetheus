***Settings***

Resource                            ../../../resources/resource.robot

*** Test Cases ***

Test Teams Page
  Go To   url=${team_url}
  Wait Until Element is Enabled   ${team_xpath}
  Click Element   ${team_xpath}
  Wait Until Element is Enabled   ${series_xpath}
  Click Element   ${series_xpath}
  Wait Until Element is Enabled   ${table_header_xpath}