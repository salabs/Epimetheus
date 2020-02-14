import urllib.parse
import queries
import sql_queries


class Database:
    def __init__(self, host, dbname, user, password):
        # Escape password as it may contain special characters.
        # Strip whitespace from other parameters.
        # Strip trailing '/' from host.
        connection_uri = 'postgresql://{user}:{pw}@{host}/{dbname}'.format(
            user=user.strip(),
            pw=urllib.parse.quote_plus(password),
            host=host.strip().rstrip('/'),
            dbname=dbname.strip(),
        )
        self.session = queries.TornadoSession(connection_uri)

    def test_series(self):
        return self.session.query(sql_queries.TEST_SERIES), list_of_dicts

    def history_page_data(self, num_of_builds, test_series_name):
        history_sql = sql_queries.history_page_data(num_of_builds,
                                                    test_series_name)
        log_messages_sql = sql_queries.log_messages_by_test_series_name(
            num_of_builds, test_series_name)
        return self.session.query(history_sql), self.session.query(
            log_messages_sql), list_of_suite_dicts

    def metadata(self, build_number):
        sql = sql_queries.metadata_by_build_number(build_number)
        return self.session.query(sql), list_of_metadata


def create_dict(keys, row):
    return {key: value for (key, value) in row.items() if key in keys}


def list_of_dicts(rows):
    return [row for row in rows]


def list_of_suite_dicts(history_rows, message_rows):
    history_rows = list_of_dicts(history_rows)
    message_rows = list_of_dicts(message_rows)
    suites = []
    suite_names = []
    max_build_num = history_rows[0].get(
        'max_build_num') if history_rows else None
    for row in history_rows:
        s_name = row.get('suite')
        if s_name not in suite_names:
            new_suite = create_dict([
                'suite_id', 'suite', 'suite_full_name', 'suite_run_time',
                'test_cases'
            ], row)
            new_suite.update({
                'test_cases':
                    list_of_testcases(history_rows, message_rows,
                                      row.get('suite_id'))
            })
            suites.append(new_suite)
            suite_names.append(row.get('suite'))
    return suites, max_build_num


def list_of_testcases(history_rows, message_rows, suite_id):
    test_cases = []
    test_names = []
    for row in history_rows:
        if row.get('suite_id') == suite_id:
            if row.get('test_case') not in test_names:
                test_case = create_dict(['test_id', 'test_case'], row)
                test_case.update({
                    'builds':
                        list_of_builds(history_rows, message_rows,
                                       row.get('test_case'), suite_id)
                })
                test_cases.append(test_case)
                test_names.append(row.get('test_case'))
    return test_cases


def list_of_log_messages(message_rows, build_number, test_id):
    return [
        create_dict(['log_level', 'message'], row) for row in message_rows
        if build_number == row.get('build_number')
           and test_id == row.get('test_id')
    ]


def list_of_builds(history_rows, message_rows, test_case, suite_id):
    builds = []
    build_nums = []
    for row in history_rows:
        build_num = row['build_number']
        if (row.get('test_case') == test_case
                and row.get('suite_id') == suite_id
                and build_num not in build_nums):
            build = create_dict(
                ['build_number', 'test_status', 'test_run_time'], row)
            build.update({
                'messages':
                    list_of_log_messages(message_rows, build_num,
                                         row.get('test_id', ''))
            })
            build_nums.append(build_num)
            builds.append(build)
    return builds


def list_of_metadata(rows):
    return [
        create_dict([
            'suite_id', 'test_run_id', 'metadata_name', 'metadata_value',
            'build_number'
        ], row) for row in rows
    ]


if __name__ == '__main__':
    pass
