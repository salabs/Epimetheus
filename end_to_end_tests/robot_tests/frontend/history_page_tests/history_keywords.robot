***Keywords***

Table should be limited to
  [Arguments]   ${number}
  Wait Until Element Is Enabled   ${table_header_xpath}
  ${elements} =		Get Element Count   ${table_header_xpath}
  ${sum} =   Evaluate  ${number} + 2
  Should be True 	${sum}>=${elements} 

Set Offset field to
  [Arguments]   ${text}
  Input Text    ${offset_field}   ${text}

Left Button Should be disabled
  Wait Until Element Is Visible    ${offset_left}     
  ${count}=   Get Element Count	   ${disabled_offset_left}
  Should be equal as Integers   ${count}    0
  
Left Button Should be enabled
  Wait Until Element Is Enabled    ${offset_left} 
  ${count}=   Get Element Count	   ${enabled_offset_left}
  Should be equal as Integers   ${count}    1

Right Button Should be enabled
  Wait Until Element Is Enabled    ${offset_right} 
  ${count}=   Get Element Count	   ${enabled_offset_right}
  Should be equal as Integers   ${count}    1

Right Button Should be disabled
  Wait Until Element Is Visible    ${offset_right} 
  ${count}=   Get Element Count	   ${disabled_offset_right}
  Should be equal as Integers   ${count}    0
  