***Settings***

Resource                            ./keywords.robot
Resource                            ./variables.robot
Library                             Collections

***Variable***

@{default_nav}    About    Teams    GitHub
@{inner_nav}    History    Dashboard

***Test Cases***

Test NavBar Links from index
  Current Page Is    url=${URL}
  ${url}=    Get Location
  Test Page without Inner Nav    ${url}

Test Navbar Links From Team Page
  Open Team Page
  ${url}=    Get Location
  Test Page without Inner Nav    ${url}

Test Navbar Links From Series Page
  Open Series Page of Team    Epimetheus
  ${url}=    Get Location
  Test Page without Inner Nav    ${url}

Test Navbar Links From History Page
  Open history page of series  TestArchiver  3
  ${url}=    Get Location
  Test Page without Inner Nav    ${url}

Test Navbar Links From Build Page
  Open a build   TestArchiver    1    1
  ${url}=    Get Location
  Test Page without Inner Nav    ${url}

Test Navbar links From Dashboard Page
  Open overview page of series  TestArchiver  3
  ${url}=    Get Location
  Test Page without Inner Nav    ${url}
