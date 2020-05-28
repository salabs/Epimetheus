***Settings***
Resource                ../../resources/resource.robot

*** Test Cases ***

Test Buttons
  Browser is on a history page of series    3
  Check history buttons
  Click Button		5
  Table should be limited to    number=5
  Click Button		10
  Table should be limited to    number=10
  Click Button		100
  Table should be limited to    number=100


*** Keywords ***


Browser is on a history page of series
  [Arguments]    ${series}
  ${str}=   Catenate  SEPARATOR=    ${history_url}    ${series}    /history
  Current Page Is     url=${str}
  ${url}=   Get Location
  Should be equal as Strings   ${url}   ${str}

Check history buttons

  Page Should Contain Button 	Passing 	
  Page Should Contain Button	Failing 	
  Page Should Contain Button	5 	
  Page Should Contain Button	10 	
  Page Should Contain Button	15 	
  Page Should Contain Button	30 	
  Page Should Contain Button	100

Table should be limited to
  [Arguments]   ${number}
  Wait Until Element Is Enabled   ${table_header_xpath}
  ${elements} =		Get Element Count   ${table_header_xpath}
  ${sum} =   Evaluate  ${number} + 2
  Should be True 	${sum}>=${elements} 
