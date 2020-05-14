import urllib.parse
import datetime
import sys
from decimal import Decimal

import queries

import sql_queries


class Database:
    def __init__(self, host, dbport, dbname, user, password):
        # Escape password as it may contain special characters.
        # Strip whitespace from other parameters.
        # Strip trailing '/' from host.
        connection_uri = 'postgresql://{user}:{pw}@{host}:{dbport}/{dbname}'.format(
            user=user.strip(),
            pw=urllib.parse.quote_plus(password),
            host=host.strip().rstrip('/'),
            dbport=dbport,
            dbname=dbname.strip(),
        )
        # Check that connection can be established
        try:
            with queries.Session(connection_uri) as session:
                session.query('SELECT 1')
        except Exception as exception:
            print('ERROR: Unable to connect to database:')
            raise exception
        # Check that test archive contains data
        try:
            with queries.Session(connection_uri) as session:
                session.query('SELECT count(*) FROM test_run')
        except Exception:
            print('ERROR: Given database is empty. Consider archiving some results first.')
            sys.exit(1)

        self.session = queries.TornadoSession(connection_uri)

    def test_series(self, series_id=None):
        return self.session.query(sql_queries.test_series(series=series_id)), list_of_dicts

    def teams(self):
        def series_by_team(rows):
            all_series = list_of_dicts(rows)
            teams = []
            current_team_name = None
            current_team = None
            for series in all_series:
                if current_team_name != series['team']:
                    if current_team:
                        teams.append(current_team)
                    current_team = {'name': series['team'], 'series_count': 0, 'series': [],
                                    'all_builds': None}
                if series['name'] == 'All builds':
                    current_team['all_builds'] = series
                else:
                    current_team['series_count'] += 1
                    current_team['series'].append(series)
                current_team_name = series['team']
            if current_team:
                teams.append(current_team)
            return teams
        return self.session.query(sql_queries.test_series(by_teams=True)), series_by_team

    def history_page_data(self, test_series, start_from, num_of_builds, offset):
        history_sql = sql_queries.history_page_data(test_series, start_from, num_of_builds, offset)
        return self.session.query(history_sql), history_data

    def status_counts(self, test_series, start_from, num_of_builds, offset):
        sql = sql_queries.status_counts(test_series, start_from, num_of_builds, offset)
        return self.session.query(sql), list_of_dicts

    def most_stable_tests(self, test_series, start_from, num_of_builds, offset, limit, limit_offset, stable):
        sql = sql_queries.most_stable_tests(test_series, start_from, num_of_builds, offset, limit,
                                            limit_offset, stable)
        return self.session.query(sql), list_of_dicts

    def build_metadata(self, test_series, build_number):
        sql = sql_queries.build_metadata(test_series, build_number)
        return self.session.query(sql), list_of_dicts

    def builds(self, test_series, build_number=None, start_from=None, num_of_builds=None, offset=0,
               reverse=False):
        sql = sql_queries.builds(test_series, build_number, start_from, num_of_builds, offset, reverse)
        return self.session.query(sql), list_of_dicts

    def suite_result_info(self, test_series, build_number, suite):
        sql = sql_queries.suite_result_info(test_series, build_number, suite)
        return self.session.query(sql), _suite_result_info

    def suite_result(self, test_series, build_number, suite):
        sql = sql_queries.suite_result(test_series, build_number, suite)
        return self.session.query(sql), suite_result_data

    def suite_log_messages(self, test_run_id, suite):
        sql = sql_queries.log_messages(test_run_id, suite_id=suite)
        return self.session.query(sql), list_of_dicts

    def test_case_log_messages(self, test_run_id, test_case):
        sql = sql_queries.log_messages(test_run_id, test_id=test_case)
        return self.session.query(sql), list_of_dicts

    def keyword_tree(self, fingerprint):
        sql = "SELECT * FROM keyword_tree WHERE fingerprint=%(fingerprint)s"
        return self.session.query(sql, {'fingerprint': fingerprint}), single_dict

    def subtrees(self, fingerprint):
        return self.session.query(sql_queries.SUBTREES, {'fingerprint': fingerprint}), list_of_dicts


def list_of_dicts(rows):
    results = []
    for row in rows:
        for key in row:
            if isinstance(row[key], (datetime.time, datetime.date, datetime.datetime, datetime.timedelta)):
                row[key] = str(row[key])
        results.append(row)
    return results

def single_dict(rows):
    return list_of_dicts(rows)[0] if rows else None

def history_data(history_rows):
    suites = []
    current_suite = None
    current_test = None
    max_build_num = -1
    for row in list_of_dicts(history_rows):
        suite, test = _separate_suite_and_test_values(row)
        max_build_num = max(test['build_number'], max_build_num)
        # Renaming fields to match old implementation
        suite['suite'] = suite['name']
        suite['suite_full_name'] = suite['full_name']
        suite['suite_id'] = suite['id']
        if not current_suite:
            current_suite = suite
            current_suite['test_cases'] = []
        if current_suite['id'] != suite['id']:
            if current_test:
                current_suite['test_cases'].append(current_test)
                current_test = None
            suites.append(current_suite)
            current_suite = suite
            current_suite['test_cases'] = []
        if test['id']:
            # Renaming fields to match old implementation
            if test['failure_message']:
                test['messages'] = [{'log_level': test['failure_log_level'],
                                     'message': test['failure_message']}]
            else:
                test['messages'] = []
            if not current_test:
                current_test = _test_item(test)
            if current_test['test_id'] != test['id']:
                current_suite['test_cases'].append(current_test)
                current_test = _test_item(test)
            current_test['builds'].append(_test_result_item(test))
    if current_test:
        current_suite['test_cases'].append(current_test)
    if current_suite:
        suites.append(current_suite)
    return suites, max_build_num

def _suite_result_info(rows):
    tests = []
    current_suite = None
    for row in list_of_dicts(rows):
        suite, test = _separate_suite_and_test_values(row)
        test['status'] = test['statuses'][0]
        current_suite = suite
        tests.append(test)
    if current_suite:
        current_suite['tests'] = tests
    return current_suite

def suite_result_data(rows):
    tests = []
    current_suite = None
    for row in list_of_dicts(rows):
        suite, test = _separate_suite_and_test_values(row)
        current_suite = suite
        if test['id']:
            tests.append(test)
    if current_suite:
        current_suite['tests'] = tests
    return current_suite

def _separate_suite_and_test_values(row):
    suite = {key[6:]: row[key] for key in row if key.startswith('suite_')}
    test = {key: row[key] for key in row if not key.startswith('suite_')}
    return suite, test

def _test_item(data_row):
    return {'builds': [], 'test_case': data_row['name'], 'test_id': data_row['id'],
            'full_name': data_row['full_name'], 'name': data_row['name']}

def _test_result_item(data_row):
    return {'build_number': data_row['build_number'], 'test_run_id': data_row['test_run_id'],
            'elapsed': data_row['elapsed'], 'test_run_time': data_row['elapsed'],
            'status': data_row['status'], 'test_status': data_row['status'],
            'start_time': data_row['start_time'],
            'tags': data_row['tags'], 'messages': data_row['messages'],
            'failure_log_level': data_row['failure_log_level'],
            'failure_message': data_row['failure_message'],
            'failure_timestamp': data_row['failure_timestamp']}


if __name__ == '__main__':
    pass
