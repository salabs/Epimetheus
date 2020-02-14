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


def max_build_number_by_test_series_name(test_series_name):
    return f"""
  (SELECT
   MAX(build_number) 
  FROM test_series_mapping 
  INNER JOIN test_series
  ON test_series.id=test_series_mapping.series 
  WHERE test_series.name ILIKE '{test_series_name}'
  LIMIT 1)
  """


def max_build_number():
    return """
    (SELECT MAX(build_number) FROM test_series_mapping LIMIT 1)
    """


def log_messages_by_test_series_name(num_of_builds, test_series_name):
    test_series_name_filter = f"AND test_series.name ILIKE '{test_series_name}'" if test_series_name else ''
    max_build_num = max_build_number_by_test_series_name(
        test_series_name) if test_series_name else max_build_number()
    return f"""
    SELECT
      test_series_mapping.build_number,
	  log_message.message,
	  log_message.log_level,
	  log_message.test_id
    FROM
        test_run
        INNER JOIN public.log_message
         ON public.test_run.id = public.log_message.test_run_id
        INNER JOIN public.test_series_mapping
         ON public.test_run.id = public.test_series_mapping.test_run_id
        INNER JOIN test_series
        ON test_series_mapping.series = test_series.id 
    WHERE
        test_series_mapping.build_number > {max_build_num} - {num_of_builds}
        AND log_message.log_level = 'FAIL'
        {test_series_name_filter}
    ORDER BY
        build_number DESC
    """


def max_test_run_id_by_build_number(build_number):
    return f"""
    SELECT MAX(test_run.id) FROM test_run INNER JOIN test_series_mapping ON test_run.id = test_series_mapping.test_run_id WHERE build_number = {build_number} LIMIT 1
    """


def metadata_by_build_number(build_number):
    return f"""
  SELECT
	  suite_metadata.suite_id,
	  suite_metadata.test_run_id,
	  suite_metadata.name AS metadata_name,
	  suite_metadata.value AS metadata_value,
	  test_series_mapping.build_number
  FROM
	  test_run
	  INNER JOIN public.suite_metadata
	   ON public.test_run.id = public.suite_metadata.test_run_id
	  INNER JOIN public.test_series_mapping
	   ON public.test_run.id = public.test_series_mapping.test_run_id
  WHERE
	  build_number = {build_number}
	  AND test_run.id = ({max_test_run_id_by_build_number(build_number)})
  ORDER BY
	  test_run_id DESC, suite_id
    """


def history_page_data(num_of_builds, test_series_name):
    test_series_name_filter = f"AND test_series.name ILIKE '{test_series_name}'" if test_series_name else ''
    max_build_num = max_build_number_by_test_series_name(
        test_series_name) if test_series_name else max_build_number()
    return f"""
  SELECT
    suite.id AS suite_id,
    suite.name AS suite,
    suite.full_name AS suite_full_name,
    test_case.id AS test_id,
    test_case.name AS test_case,
    test_series_mapping.build_number,
    test_result.status AS test_status,
    {max_build_num} AS max_build_num,
    COALESCE(test_result.elapsed, 0) AS test_run_time,
    TO_CHAR(COALESCE(suite_result.elapsed, 0) * interval '1 millisecond', 'MI:SS:MS') AS suite_run_time
  FROM
    suite
    INNER JOIN suite_result
    ON suite.id = suite_result.suite_id
    INNER JOIN test_case
    ON suite.id = test_case.suite_id
    INNER JOIN test_result
    ON test_case.id = test_result.test_id
    INNER JOIN test_run
    ON test_result.test_run_id = test_run.id
      AND suite_result.test_run_id = test_run.id
    INNER JOIN suite_metadata
    ON test_run.id = suite_metadata.test_run_id
    INNER JOIN test_series_mapping
    ON test_run.id = test_series_mapping.test_run_id
    INNER JOIN test_series
    ON test_series_mapping.series = test_series.id
  GROUP BY
    suite.id,
    suite.name,
    suite.full_name,
    suite_result.start_time,
    suite_result.elapsed,
    test_case.id,
    test_case.name,
    test_series_mapping.build_number,
    test_result.status,
    test_result.elapsed,
    test_series.name
  HAVING
    test_series_mapping.build_number > {max_build_num} - {num_of_builds}
    {test_series_name_filter}
  ORDER BY
    test_series_mapping.build_number DESC, suite_result.start_time
  """
