***Settings***
Resource                ./keywords.robot

*** Test Cases ***

Test CheckBoxes
  Open a build  TestArchiver   1   1
  Build Should have test executions
  Hide Tests    Failing
  The status of all tests should be   Pass
  Hide Tests    Passing
  The list of tests should be empty
  Show Tests    Failing
  The status of all tests should be   Fail
