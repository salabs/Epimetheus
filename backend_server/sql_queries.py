
TEST_SERIES = """
SELECT id, name, team,
        count(*) as builds,
        max(build_number) as last_build,
        to_char(max(generated), 'DD.MM.YYYY HH24:MI:SS') as last_generated,
        to_char(max(imported_at), 'DD.MM.YYYY HH24:MI:SS') as last_imported,
        to_char(max(start_time), 'DD.MM.YYYY HH24:MI:SS') as last_started
FROM (
    SELECT test_series.id, name, team, build_number,
            min(generated) as generated,
            min(imported_at) as imported_at,
            min(start_time) as start_time
    FROM test_series
    JOIN test_series_mapping as tsm ON tsm.series=test_series.id
    JOIN test_run ON tsm.test_run_id=test_run.id
    JOIN suite_result ON suite_result.test_run_id=test_run.id
    WHERE NOT ignored
    GROUP BY test_series.id, name, team, build_number
) AS builds
GROUP BY id, name, team
ORDER BY last_generated DESC, last_started DESC, last_imported DESC;
"""

TEST_SERIES_BY_TEAMS = """
SELECT id, name, team,
        count(*) as builds,
        max(build_number) as last_build,
        to_char(max(generated), 'DD.MM.YYYY HH24:MI:SS') as last_generated,
        to_char(max(imported_at), 'DD.MM.YYYY HH24:MI:SS') as last_imported,
        to_char(max(start_time), 'DD.MM.YYYY HH24:MI:SS') as last_started
FROM (
    SELECT test_series.id, name, team, build_number,
            min(generated) as generated,
            min(imported_at) as imported_at,
            min(start_time) as start_time
    FROM test_series
    JOIN test_series_mapping as tsm ON tsm.series=test_series.id
    JOIN test_run ON tsm.test_run_id=test_run.id
    JOIN suite_result ON suite_result.test_run_id=test_run.id
    WHERE NOT ignored
    GROUP BY test_series.id, name, team, build_number
) AS builds
GROUP BY id, name, team
ORDER BY team, last_generated DESC, last_started DESC, last_imported DESC;
"""

def test_run_ids(series=None, build_num=None, start_from=None, last=None, offset=0):
    filters = []
    if series:
        filters.append("series={series_id}".format(series_id=int(series)))
        if build_num:
            filters.append("build_number={}".format(int(build_num)))
        elif last:
            filters.append("build_number IN ({})".format(build_numbers(series, start_from, last, offset)))
    return """
SELECT test_run_id
FROM test_series_mapping as tsm
JOIN test_run ON test_run.id=tsm.test_run_id
WHERE NOT ignored
{filters}
ORDER BY build_number, test_run_id
""".format(filters='AND ' + ' AND '.join(filters) if filters else '')


def build_numbers(series, start_from, last, offset):
    return """
SELECT build_number
FROM (
    SELECT DISTINCT build_number
    FROM test_series_mapping as tsm
    JOIN test_run ON test_run.id=tsm.test_run_id
    WHERE series={series}
      {starting_filter}
      AND NOT ignored
) as build_numbers
ORDER BY build_number DESC
LIMIT {last} OFFSET {offset}
""".format(series=int(series), last=int(last), offset=int(offset),
           starting_filter="AND build_number <= {}".format(int(start_from)) if start_from else '')


def build_metadata(series, build_num):
    return """
SELECT DISTINCT ON (suite_metadata.name, suite_metadata.value)
    suite_metadata.name as metadata_name,
    suite_metadata.value as metadata_value,
    suite_metadata.suite_id,
    suite_metadata.test_run_id
FROM suite_metadata
JOIN suite ON suite.id=suite_metadata.suite_id
WHERE test_run_id IN ({test_run_ids})
ORDER BY suite_metadata.name, suite_metadata.value, suite.full_name
""".format(test_run_ids=test_run_ids(series, build_num=build_num))


def history_page_data(series, start_from, last, offset=0):
    return """
SELECT *
FROM (
    SELECT DISTINCT ON (suite.id, test_results.id, build_number)
        tsm.build_number,
        suite.id as suite_id, suite.name as suite_name, suite.full_name as suite_full_name,
        suite.repository as suite_repository,
        suite_result.test_run_id as suite_test_run_id,
        suite_result.start_time as suite_start_time,
        suite_result.elapsed as suite_elapsed,

        test_results.id as id, test_results.name as name, test_results.full_name as full_name,
        test_results._test_run_id as test_run_id,
        test_results.status as status,
        -- test_results.setup_status as setup_status,
        -- test_results.execution_status as execution_status,
        -- test_results.teardown_status as teardown_status,
        -- test_results.fingerprint as fingerprint,
        -- test_results.setup_fingerprint as setup_fingerprint,
        -- test_results.execution_fingerprint as execution_fingerprint,
        -- test_results.teardown_fingerprint as teardown_fingerprint,
        test_results.start_time as start_time,
        test_results.elapsed as elapsed,
        -- test_results.setup_elapsed as setup_elapsed,
        -- test_results.execution_elapsed as execution_elapsed,
        -- test_results.teardown_elapsed as teardown_elapsed,
        CASE WHEN tags IS NULL THEN '{array_literal}' ELSE tags END as tags,
        log_messages.log_level as failure_log_level,
        log_messages.message as failure_message
    FROM suite_result
    JOIN suite ON suite.id=suite_result.suite_id
    JOIN test_run ON test_run.id=suite_result.test_run_id
    JOIN test_series_mapping as tsm ON test_run.id=tsm.test_run_id
                                   AND tsm.series={series}
    LEFT OUTER JOIN (
        SELECT DISTINCT ON (test_case.id, build_number) *, test_result.test_run_id as _test_run_id
        FROM test_result
        JOIN test_case ON test_case.id=test_result.test_id
        JOIN test_series_mapping as tsm ON test_result.test_run_id=tsm.test_run_id
                                       AND tsm.series={series}
        WHERE test_result.test_run_id IN ({test_run_ids})
        ORDER BY test_case.id, build_number DESC, start_time DESC, test_result.test_run_id DESC
    ) as test_results ON test_results.suite_id=suite.id
                     AND test_results.build_number=tsm.build_number
    LEFT OUTER JOIN (
        SELECT array_agg(tag ORDER BY tag) as tags, test_id, test_run_id
        FROM test_tag
        WHERE test_run_id IN ({test_run_ids})
        GROUP BY test_id, test_run_id
    ) as test_tags ON test_tags.test_id=test_results.test_id
                  AND test_tags.test_run_id=test_results._test_run_id
    LEFT OUTER JOIN (
        SELECT DISTINCT ON (test_run_id, test_id)
            test_run_id, test_id, log_level, message
        FROM log_message
        WHERE test_run_id IN ({test_run_ids})
          AND test_id IS NOT NULL
          AND log_level IN ('ERROR', 'FAIL')
        ORDER BY test_run_id, test_id, timestamp DESC, id DESC
    ) as log_messages ON log_messages.test_id=test_results.test_id
                     AND log_messages.test_run_id=test_results._test_run_id
    WHERE suite_result.test_run_id IN ({test_run_ids})
      AND NOT ignored
    ORDER BY suite_id, test_results.id, build_number DESC, suite_start_time DESC, suite_test_run_id DESC
) AS results
ORDER BY suite_full_name, full_name, build_number DESC;
""".format(array_literal='{}',
           series=series,
           test_run_ids=test_run_ids(series, start_from=start_from, last=last, offset=offset))


if __name__ == '__main__':
    pass
