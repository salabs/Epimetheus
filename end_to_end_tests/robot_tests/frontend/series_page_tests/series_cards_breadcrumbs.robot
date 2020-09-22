***Settings***
Resource                ../../../resources/resource.robot

*** Test Cases ***

Test Series Selector Breadcrubs
    Open Series Page of Team    Epimetheus
    Team page should be of stored team      Epimetheus
    Team page breadcrumb should contain correct value   Epimetheus