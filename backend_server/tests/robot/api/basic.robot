*** Settings ***
Library         REST    http://localhost:${PORT}
Library         RequestsLibrary
Metadata        FIXTURE_SERIES_ID   ${FIXTURE_SERIES_ID}

*** Variables ***
${PORT}=  5000
${FIXTURE_SERIES_ID}=  2
${LAST_FIXTURE_TEST_RUN}=  1  # Notice: updated by some test case setups

*** Test cases ***

API documentation page
    [Setup]       Create session  backend  http://localhost:${PORT}
    [Template]    Page status ok
    /
    /data
    /data/
    /data/doc
    /data/doc/

Teams data
    GET                 /data/teams
    Integer             response status     200
    String              $.teams[*].name
    Integer             $.teams[*].series_count

    Object              $.teams[*].all_builds
    Integer             $.teams[*].all_builds.id
    String              $.teams[*].all_builds.name
    String              $.teams[*].all_builds.team
    String              $.teams[*].all_builds.last_imported
    String              $.teams[*].all_builds.last_started
    Integer             $.teams[*].all_builds.builds
    Integer             $.teams[*].all_builds.last_build
    String              $.teams[*].all_builds.last_build_id
    String              $.teams[*].all_builds.last_status

    Array               $.teams[*].series     minItems=1
    Valid series object     $.teams[*].series[*]

Series data
    GET                     /data/series
    Integer                 response status     200
    Array                   $.series     minItems=1
    Valid series object     $.series[*]

Series info data
    GET                     /data/series/${FIXTURE_SERIES_ID}/info
    Integer                 response status     200
    Valid series object     $.series
    Valid build object      $.last_build
    Valid build object      $.first_build

Builds data
    GET                     /data/series/${FIXTURE_SERIES_ID}/builds/
    Integer                 response status     200
    Valid build object      $.builds[*]

Build info data
    GET                     /data/series/${FIXTURE_SERIES_ID}/builds/1/info
    Integer                 response status     200
    Valid series object     $.series
    Valid build object      $.build

Suite result info data
    GET                         /data/series/${FIXTURE_SERIES_ID}/builds/1/suites/3/info
    Integer                     response status     200
    Valid series object         $.series
    Valid build object          $.build
    Object                      $.suite
    Integer                     $.suite.id
    String                      $.suite.name
    String                      $.suite.full_name
    String                      $.suite.repository
    Array                       $.suite.tests
    Integer                     $.suite.tests[*].id
    String                      $.suite.tests[*].name
    String                      $.suite.tests[*].full_name
    String                      $.suite.tests[*].status
    String                      $.suite.tests[*].statuses[*]
    Integer                     $.suite.tests[*].test_runs[*]

History data
    # GET                 /data/history?series=1 Depricated
    GET                 /data/series/${FIXTURE_SERIES_ID}/history
    Integer             response status     200
    Array               $.history     minItems=1

    Integer             $.history[*].id
    Integer             $.history[*].suite_id  # Alias for id
    String              $.history[*].name
    String              $.history[*].suite  # Alias for name
    String              $.history[*].full_name
    String              $.history[*].suite_full_name  # Alias for full name
    String              $.history[*].repository

    Array               $.history[*].test_cases
    String              $.history[*].test_cases[*].name
    String              $.history[*].test_cases[*].test_case  # Alias for name
    String              $.history[*].test_cases[*].full_name
    Integer             $.history[*].test_cases[*].test_id
    Array               $.history[*].test_cases[*].builds

    Integer             $.history[*].test_cases[*].builds[*].build_number
    Integer             $.history[*].test_cases[*].builds[*].elapsed
    Integer             $.history[*].test_cases[*].builds[*].test_run_time  # Alias for elapsed
    Integer             $.history[*].test_cases[*].builds[*].test_run_id
    String              $.history[*].test_cases[*].builds[*].status
    String              $.history[*].test_cases[*].builds[*].start_time

    Array               $.history[*].test_cases[*].builds[*].tags
    Array               $.history[*].test_cases[*].builds[*].messages

Most stable tests data
    GET                 /data/series/${FIXTURE_SERIES_ID}/most_stable_tests
    Integer             response status     200
    Array               $.tests     minItems=1
    Integer             $.tests[*].test_id
    String              $.tests[*].test_name
    String              $.tests[*].test_full_name
    Integer             $.tests[*].suite_id
    String              $.tests[*].suite_name
    String              $.tests[*].suite_full_name
    Integer             $.tests[*].fails_in_window
    Number              $.tests[*].instability

Status counts data
    GET                 /data/series/${FIXTURE_SERIES_ID}/status_counts
    Integer             response status     200
    Array               $.status_counts     minItems=1
    Integer             $.status_counts[*].build_number
    Integer             $.status_counts[*].suites_total
    Integer             $.status_counts[*].suites_passed
    Integer             $.status_counts[*].suites_failed
    Integer             $.status_counts[*].suites_skipped
    Integer             $.status_counts[*].suites_other
    Integer             $.status_counts[*].tests_passed
    Integer             $.status_counts[*].tests_failed
    Integer             $.status_counts[*].tests_skipped
    Integer             $.status_counts[*].tests_other

Build metadata
    #GET                 /data/metadata?series=1&build_number=1 Depricated
    GET                 /data/series/${FIXTURE_SERIES_ID}/builds/1/metadata
    Integer             response status     200
    Array               $.metadata     minItems=1

    Integer             $.metadata[*].suite_id
    Integer             $.metadata[*].test_run_id
    String              $.metadata[*].metadata_name
    String              $.metadata[*].metadata_value

Suite result data
    GET                         /data/series/${FIXTURE_SERIES_ID}/builds/1/suites/3/
    Integer                     response status     200
    Object                      $.suite
    Integer                     $.suite.id
    String                      $.suite.name
    String                      $.suite.full_name
    String                      $.suite.repository
    #Valid log message object    $.suite.log_messages[*]
    Array                       $.suite.tests
    Integer                     $.suite.tests[*].id
    String                      $.suite.tests[*].name
    String                      $.suite.tests[*].full_name
    Integer                     $.suite.tests[*].test_run_id
    String                      $.suite.tests[*].start_time
    String                      $.suite.tests[*].status
    String                      $.suite.tests[*].setup_status
    String                      $.suite.tests[*].execution_status
    String                      $.suite.tests[*].teardown_status
    Integer                     $.suite.tests[*].elapsed
    Integer                     $.suite.tests[*].setup_elapsed
    Integer                     $.suite.tests[*].execution_elapsed
    Integer                     $.suite.tests[*].teardown_elapsed
    String                      $.suite.tests[*].fingerprint
    String                      $.suite.tests[*].setup_fingerprint
    String                      $.suite.tests[*].execution_fingerprint
    String                      $.suite.tests[*].teardown_fingerprint
    String                      $.suite.tests[*].tags[*]
    Valid log message object    $.suite.tests[*].log_messages[*]

Suite log message data
    [Setup]     Get last fixture test run id
    GET                 /data/test_runs/${LAST_FIXTURE_TEST_RUN}/suites/1/log_messages
    Integer             response status     200
    Array               $.log_messages     minItems=1
    Valid log message object    $.log_messages[*]

Test case log message data
    [Setup]     Get last fixture test run id
    GET                 /data/test_runs/${LAST_FIXTURE_TEST_RUN}/test_cases/1/log_messages
    Integer             response status     200
    Array               $.log_messages     minItems=1
    Valid log message object    $.log_messages[*]

Keyword tree data
    # Actual keyword as root
    GET                         /data/keyword_tree/b635250f3188478654825cb08c0c4e0547f81be6/
    Integer                     response status     200
    String                      $.fingerprint      b635250f3188478654825cb08c0c4e0547f81be6
    String                      $.keyword          Log
    String                      $.library          BuiltIn
    String                      $.status           PASS
    String                      $.arguments[*]
    Array                       $.children

    # Test execution with virtual keyword as root
    GET                         /data/keyword_tree/b38e47f8530f32669f42ebda3170fae067dc64bb/
    Integer                     response status     200
    String                      $.fingerprint      b38e47f8530f32669f42ebda3170fae067dc64bb
    Null                        $.keyword
    Null                        $.library
    String                      $.status
    Array                       $.arguments
    Array                       $.children

    String                      $.children[*].call_index
    String                      $.children[*].fingerprint
    String                      $.children[*].keyword
    String                      $.children[*].library
    String                      $.children[*].status
    String                      $.children[*].arguments[*]
    Array                       $.children[*].children


*** Keywords ***

Page status ok
    [Arguments]     ${url}
    ${resp}=    Get Request     backend      ${url}
    Should be equal as strings  ${resp.status_code}   200

Valid series object
    [Arguments]         ${json_path}
    Integer             ${json_path}.id
    String              ${json_path}.name
    String              ${json_path}.team
    Integer             ${json_path}.builds
    Integer             ${json_path}.last_build
    String              ${json_path}.last_build_id
    String              ${json_path}.last_imported
    String              ${json_path}.last_started
    String              ${json_path}.last_status

Valid build object
    [Arguments]         ${json_path}
    Integer             ${json_path}.build_number
    String              ${json_path}.build_id
    String              ${json_path}.name
    String              ${json_path}.team
    Integer             ${json_path}.test_runs[*]
    String              ${json_path}.status
    String              ${json_path}.archiving_time
    String              ${json_path}.start_time

Valid log message object
    [Arguments]         ${json_path}  ${is_test_case}=${true}
    Integer             ${json_path}.id
    String              ${json_path}.timestamp
    String              ${json_path}.message
    String              ${json_path}.log_level
    Integer             ${json_path}.suite_id
    #String              ${json_path}.test_id
    Integer             ${json_path}.test_run_id

Get last fixture test run id
    GET     /data/series/${FIXTURE_SERIES_ID}/builds/?number_of_builds=1
    ${last_fixture_test_run}=  Integer  $.builds[0].test_runs[0]
    Set global variable  ${LAST_FIXTURE_TEST_RUN}  ${last_fixture_test_run}[0]
