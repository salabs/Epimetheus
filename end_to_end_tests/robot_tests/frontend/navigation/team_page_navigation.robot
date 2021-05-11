***Settings***

Resource                            ./keywords.robot
Resource                            ./variables.robot
Library                             String
Library                             Collections

*** Variables ***
@{team_names}

*** Test Cases ***

Test Teams Page Component Usage
  Open Team Page
  Store Team Headers
  Test Team Navigation using Team Headers

