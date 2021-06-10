***Settings***

Resource                            ./keywords.robot
Resource                            ./variables.robot

*** Test Cases ***

Test Build Amount Dropdown
  Open history page of series   TestArchiver   3
  Select From Dropdown    ${history_build_selector_5}
  History Table should be limited to    number=5
  Select From Dropdown    ${history_build_selector_10}
  History Table should be limited to    number=10
  Select From Dropdown    ${history_build_selector_30}
  History Table should be limited to    number=30

Test Offset Functionality
  Open history page of series  TestArchiver   3
  Store Most Recent Builds
  Offset should be    0
  Most Recent Build Number should be    ${most_recent_build}
  Set Offset field to   1000
  Left Button Should be disabled
  Right Button Should be disabled
  Set Offset field to   1
  Right Button Should be enabled
  Click Right Button
  Offset should be    1
  Most Recent Build Number should be    ${second_recent_build}
  Click Right Button
  Offset should be    2
  Most Recent Build Number should be    ${third_recent_build}
  Set Offset field to   1
  Left Button Should be enabled
  Click Left Button
  Offset should be    1
  Most Recent Build Number should be    ${second_recent_build}
  Left Button Should be enabled
  Click Left Button
  Offset should be    0
  Most Recent Build Number should be    ${most_recent_build}
