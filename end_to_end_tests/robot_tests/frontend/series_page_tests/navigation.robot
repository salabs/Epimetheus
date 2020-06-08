***Settings***

Resource                            ../../../resources/resource.robot
Library                             String
Library                             Collections

*** Variables ***
@{series_names}
@{last_builds}

*** Test Cases ***

Test Navigation to History Pages
    Open Series Page of Team    Epimetheus
    Store Series Headers
    Test History of All Stored Series


Test Navigation to Last Builds
    Open Series Page of Team    Epimetheus
    Store Series Headers
    Test Last Builds of All Stored Series


*** Keywords ***


Store Series Headers
  Wait Until Element is Enabled   ${series_list}
  ${series}=  Get WebElements   ${series_list}
  
  FOR    ${serial}    IN    @{series}
      
      ${header_text}=    Get Line    ${serial.text}    0
      Append To List    ${series_names}    ${header_text}
  END

Test History of All Stored Series
    Wait Until Element is Enabled   ${series_list}
    
    FOR    ${header}    IN    @{series_names}
      Click Element     //h3[.="${header}"]/ancestor-or-self::div[2]/div[2]/div[1]
      Wait Until Element is Enabled    ${table_header_xpath}
      Go Back 
      Wait Until Element is Enabled   ${series_list}
    END


Test Last Builds of All Stored Series
    Wait Until Element is Enabled   ${series_list}
    FOR    ${header}    IN    @{series_names}
      Click Element     //h3[.="${header}"]/ancestor-or-self::div[2]/div[2]/div[2]
      Wait Until Element is Enabled    ${build_page_info_table}
      Go Back 
      Wait Until Element is Enabled   ${series_list}
    END