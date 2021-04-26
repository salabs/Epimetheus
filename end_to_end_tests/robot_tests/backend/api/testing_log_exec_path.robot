*** Settings ***
Force Tags      exec_path

*** Test cases ***

API documentation page
    [Setup]       Run Keywords   Empty Keyword      Info Log Keyword
    [Teardown]      Run Keywords   Empty Keyword      Info Log Keyword
    Empty Keyword
    Info Log Keyword
    Warn Log Keyword
    Empty Keyword
    Info Log Keyword

*** Keywords ***


Empty Keyword
    No Operation

Info Log Keyword
    Log     Keyword     INFO

Warn Log Keyword
    Log     Keyword     WARN