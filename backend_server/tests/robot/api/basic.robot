*** Settings ***
Library         REST    http://localhost:${PORT}

*** Variables ***
${PORT}=  5000

*** Test cases ***

Series data
    GET                 /data/series
    Array               $.series     minItems=1
    Integer             $.series[*].id
    String              $.series[*].name
    String              $.series[*].team
    String              $.series[*].last_imported
    String              $.series[*].last_started
    Integer             $.series[*].builds
    Integer             $.series[*].last_build

Teams data
    GET                 /data/teams
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

    Array               $.teams[*].series     minItems=1
    Integer             $.teams[*].series[*].id
    String              $.teams[*].series[*].name
    String              $.teams[*].series[*].team
    String              $.teams[*].series[*].last_imported
    String              $.teams[*].series[*].last_started
    Integer             $.teams[*].series[*].builds
    Integer             $.teams[*].series[*].last_build

History data
    GET                 /data/history?series=1
    Array               $.history     minItems=1

    Integer             $.history[*].id
    Integer             $.history[*].suite_id  # Alias for id
    String              $.history[*].name
    String              $.history[*].suite  # Alias for name
    String              $.history[*].full_name
    String              $.history[*].suite_full_name  # Alias for full name
    String              $.history[*].repository

    String              $.history[*].start_time
    Integer             $.history[*].elapsed
    Integer             $.history[*].suite_run_time  # Alias for elapsed

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

Build metadata
    GET                 /data/metadata?series=1&build_number=1
    Array               $.metadata     minItems=1

    Integer             $.metadata[*].suite_id
    Integer             $.metadata[*].test_run_id
    String              $.metadata[*].metadata_name
    String              $.metadata[*].metadata_value
