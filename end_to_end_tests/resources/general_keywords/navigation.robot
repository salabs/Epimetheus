*** Keywords ***

Current Page Is 
  [Arguments]	${url}
  Go To     ${url}

Page contains id
  [Arguments]	${id}
  Element should be Enabled	${id}
 
Id contains  
  [Arguments]	${id}	${1}	${2}	${3}
  Element Should Contain	${id}	${1}
  Element Should Contain	${id}	${2}
  Element Should Contain	${id}	${3}
  ${page} = 	Log Location