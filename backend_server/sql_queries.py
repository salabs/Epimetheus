
LIMIT_STATEMENT = "LIMIT {last} OFFSET {offset}"

SUBTREES = """
SELECT keyword_tree.fingerprint, keyword, library, status, arguments, call_index
FROM keyword_tree
JOIN tree_hierarchy ON tree_hierarchy.subtree=keyword_tree.fingerprint
WHERE tree_hierarchy.fingerprint=%(fingerprint)s
ORDER BY call_index;
"""

def test_series(by_teams=False, series=None):
    return """
SELECT id, name, team,
        count(*) as builds,
        max(build_number) as last_build,
        max(generated) as last_generated,
        max(imported_at) as last_imported,
        max(start_time) as last_started,
        CASE WHEN max(start_time) IS NOT NULL THEN max(start_time)
             ELSE max(imported_at) END as sorting_value
FROM (
    SELECT test_series.id, name, team, build_number,
            min(generated) as generated,
            min(imported_at) as imported_at,
            min(start_time) as start_time
    FROM test_series
    JOIN test_series_mapping as tsm ON tsm.series=test_series.id
    JOIN test_run ON tsm.test_run_id=test_run.id
    JOIN suite_result ON suite_result.test_run_id=test_run.id
    WHERE NOT ignored {series_filter}
    GROUP BY test_series.id, name, team, build_number
) AS builds
GROUP BY id, name, team
ORDER BY {team_sorting} sorting_value;
""".format(team_sorting="team," if by_teams else '',
           series_filter='AND test_series.id={}'.format(int(series)) if series else '') # nosec


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


def build_numbers(series, start_from=None, last=None, offset=0):
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
{limit}
""".format(series=int(series),
           limit=LIMIT_STATEMENT.format(last=int(last), offset=int(offset)) if last else '',
           starting_filter="AND build_number <= {}".format(int(start_from)) if start_from else '')


def builds(series, build_number=None, start_from=None, last=None, offset=0, reverse=False):
    if build_number:
        build_filter = "AND build_number={}".format(int(build_number))
    elif start_from or last:
        build_filter = "AND build_number IN ({})".format(build_numbers(series, start_from, last, offset))
    else:
        build_filter = ""
    return """
SELECT team, name,
       build_number,
       CASE WHEN build_id IS NULL THEN build_number::text ELSE build_id END as build_id,
       array_agg(test_run_id) as test_runs,
       min(status) as status,
       min(imported_at) as archiving_time,
       min(generated) as generation_time,
       min(start_time) as start_time
FROM (
    SELECT team, name,
           build_number, build_id,
           test_run.id as test_run_id,
           min(status) as status,
           min(imported_at) as imported_at,
           min(generated) as generated,
           min(start_time) as start_time
    FROM test_series_mapping as tsm
    JOIN test_series ON test_series.id=tsm.series
    JOIN test_run ON test_run.id=tsm.test_run_id
    JOIN suite_result ON suite_result.test_run_id=test_run.id
    WHERE tsm.series={series} {build_filter}
    GROUP BY team, name, build_number, build_id, test_run.id
    ORDER BY build_number, test_run.id
) AS test_runs
GROUP BY team, name, build_number, build_id
ORDER BY build_number {order};
""".format(series=int(series),
           build_filter=build_filter,
           order='ASC' if reverse else 'DESC')


def suite_result_info(series, build_num, suite):
    return """
SELECT array_agg(test_result.test_run_id ORDER BY test_result.start_time DESC) as test_runs,
       array_agg(test_result.status ORDER BY test_result.start_time DESC) as statuses,
       suite.id as suite_id,
       suite.name as suite_name,
       suite.full_name as suite_full_name,
       suite.repository as suite_repository,
       test_case.id as id,
       test_case.name as name,
       test_case.full_name as full_name
FROM suite_result
JOIN suite ON suite_result.suite_id=suite.id
JOIN test_case ON test_case.suite_id=suite.id
JOIN test_result ON test_result.test_id=test_case.id
                AND test_result.test_run_id=suite_result.test_run_id
WHERE suite_result.suite_id={suite_id}
  AND test_result.test_run_id IN ({test_run_ids})
GROUP BY suite.id, suite.name, suite.full_name,
         test_case.id, test_case.name, test_case.full_name
ORDER BY test_case.name;
""".format(test_run_ids=test_run_ids(series, build_num), suite_id=int(suite))


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
SELECT build_number,
       suite_id,
       suite_name,
       suite_full_name,
       suite_repository,
       id,
       name,
       full_name,
       test_run_id,
       status,
       start_time,
       elapsed,
       tags,
       failure_log_level,
       failure_message,
       failure_timestamp
FROM (
    SELECT DISTINCT ON (suite.id, test_results.id, build_number)
        tsm.build_number,
        suite.id as suite_id, suite.name as suite_name, suite.full_name as suite_full_name,
        suite.repository as suite_repository,
        suite_result.test_run_id as suite_test_run_id,
        suite_result.start_time as suite_start_time,

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
        log_messages.message as failure_message,
        log_messages.timestamp as failure_timestamp
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
            test_run_id, test_id, log_level, message, timestamp
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


def suite_result(series, build_number, suite):
    return """
SELECT *
FROM (
    SELECT DISTINCT ON (suite.id, test_results.id)
        suite.id as suite_id, suite.name as suite_name, suite.full_name as suite_full_name,
        suite.repository as suite_repository,
        suite_result.test_run_id as suite_test_run_id,
        suite_result.start_time as suite_start_time,

        test_results.id as id, test_results.name as name, test_results.full_name as full_name,
        test_results._test_run_id as test_run_id,
        test_results.status as status,
        test_results.setup_status as setup_status,
        test_results.execution_status as execution_status,
        test_results.teardown_status as teardown_status,
        test_results.fingerprint as fingerprint,
        test_results.setup_fingerprint as setup_fingerprint,
        test_results.execution_fingerprint as execution_fingerprint,
        test_results.teardown_fingerprint as teardown_fingerprint,
        test_results.start_time as start_time,
        test_results.elapsed as elapsed,
        test_results.setup_elapsed as setup_elapsed,
        test_results.execution_elapsed as execution_elapsed,
        test_results.teardown_elapsed as teardown_elapsed,
        CASE WHEN tags IS NULL THEN '{array_literal}' ELSE tags END as tags,
        log_messages.log_level as failure_log_level,
        log_messages.message as failure_message,
        log_messages.timestamp as failure_timestamp
    FROM suite_result
    JOIN suite ON suite.id=suite_result.suite_id
    JOIN test_run ON test_run.id=suite_result.test_run_id
    JOIN test_series_mapping as tsm ON test_run.id=tsm.test_run_id
                                   AND tsm.series={series}
    LEFT OUTER JOIN (
        SELECT DISTINCT ON (test_case.id) *, test_result.test_run_id as _test_run_id
        FROM test_result
        JOIN test_case ON test_case.id=test_result.test_id
        JOIN test_series_mapping as tsm ON test_result.test_run_id=tsm.test_run_id
                                       AND tsm.series={series}
        WHERE test_result.test_run_id IN ({test_run_ids})
        ORDER BY test_case.id, start_time DESC, test_result.test_run_id DESC
    ) as test_results ON test_results.suite_id=suite.id
    LEFT OUTER JOIN (
        SELECT array_agg(tag ORDER BY tag) as tags, test_id, test_run_id
        FROM test_tag
        WHERE test_run_id IN ({test_run_ids})
        GROUP BY test_id, test_run_id
    ) as test_tags ON test_tags.test_id=test_results.test_id
                  AND test_tags.test_run_id=test_results._test_run_id
    LEFT OUTER JOIN (
        SELECT DISTINCT ON (test_run_id, test_id)
            test_run_id, test_id, log_level, message, timestamp
        FROM log_message
        WHERE test_run_id IN ({test_run_ids})
          AND test_id IS NOT NULL
          AND log_level IN ('ERROR', 'FAIL')
        ORDER BY test_run_id, test_id, timestamp DESC, id DESC
    ) as log_messages ON log_messages.test_id=test_results.test_id
                     AND log_messages.test_run_id=test_results._test_run_id
    WHERE suite_result.test_run_id IN ({test_run_ids})
      AND suite_result.suite_id={suite_id}
      AND NOT ignored
    ORDER BY suite_id, test_results.id, suite_start_time DESC, suite_test_run_id DESC
) AS results
ORDER BY suite_full_name, full_name;
""".format(array_literal='{}',
           series=int(series),
           suite_id=int(suite),
           test_run_ids=test_run_ids(series, build_num=build_number))

def log_messages(test_run_id, suite_id=None, test_id=None):
    return """
SELECT *
FROM log_message
WHERE test_run_id={test_run_id}
  AND {test_filter}
  {suite_filter}
ORDER BY timestamp, id
""".format(test_run_id=int(test_run_id),
           suite_filter="AND suite_id={}".format(int(suite_id)) if suite_id else '',
           test_filter="test_id={}".format(int(test_id)) if test_id else 'test_id IS NULL')
