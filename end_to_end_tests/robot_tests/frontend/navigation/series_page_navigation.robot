***Settings***

Resource                            ./keywords.robot
Resource                            ./variables.robot
Library                             String
Library                             Collections

*** Variables ***
@{series_names}
@{last_builds}

*** Test Cases ***

Test Navigation to Overview Pages
    Open Series Page of Team    Epimetheus
    Store Series Headers
    Test Overview of All Stored Series

Test Navigation to Last Builds
    Open Series Page of Team    Epimetheus
    Store Series Headers
    Test Last Builds of All Stored Series


