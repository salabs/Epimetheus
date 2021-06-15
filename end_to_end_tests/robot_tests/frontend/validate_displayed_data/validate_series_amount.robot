***Settings***

Resource                            ./keywords.robot


*** Test Cases ***


Series Amount
    Store Amount of Series of team in API  Epimetheus
    Open Series Page of Team    Epimetheus
    Series amount displayed by UI matches API
