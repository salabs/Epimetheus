import argparse
import json
import sys

import tornado.httpserver
import tornado.ioloop
import tornado.web
from tornado.web import url

from tornado_swagger.setup import setup_swagger
from tornado_swagger.model import register_swagger_model

import database as db


def load_config_file(file_name):
    with open(file_name, 'r') as file:
        return json.load(file)


@register_swagger_model
class SeriesModel:
    """
    ---
    type: object
    description: Series object
    properties:
        id:
            type: integer
            description: Series id.
        name:
            type: string
            description: Series name.
        team:
            type: string
            description: Team assigned to series. From TestArchiver.
        builds:
            type: integer
            description: Number of builds in the series.
        last_build:
            type: integer
            description: Latest build number for the series.
        last_build_id:
            type: string
            description: Latest build id for the series.
        last_generated:
            type: string
            format: date-time
            description: When available, the timestamp when the output of the last build was generated.
        last_imported:
            type: string
            format: date-time
            description: Timestamp when the first results of the last build were archived.
        last_started:
            type: string
            format: date-time
            description: The last build starting time i.e. the first timestamp in the last build.
        last_status:
            type: string
            description: The last build status (for so far archived results).
        sorting_value:
            type: string
            format: date-time
            description: Timestamp used for sorting the series. Either last_started or last_imported
    """

@register_swagger_model
class BuildModel:
    """
    ---
    type: object
    description: Build object
    properties:
        build_number:
            type: integer
            description: build number in the series.
        build_id:
            type: string
            description: build identifier string in the series.
        name:
            type: string
            description: Series name.
        team:
            type: string
            description: Team assigned to series.
        test_runs:
            type: array
            description: list of ids of test runs that belong to the build
            items:
                type: integer
                description: test run id
        status:
            type: string
            description: Status of the build
        generation_time:
            type: string
            format: date-time
            description: When available, the timestamp when the test output of the build was generated.
        archiving_time:
            type: string
            format: date-time
            description: Timestamp when the first results of the build were archived.
        start_time:
            type: string
            format: date-time
            description: The build starting time i.e. the first timestamp in the build.
    """

@register_swagger_model
class LogMessageModel:
    """
    ---
    type: object
    description: Log message object
    properties:
        id:
            type: integer
            description: Id of the log message
        timestamp:
            type: string
            format: date-time
            description: Timestamp of the log message
        message:
            type: string
            description: Message logged.
        log_level:
            type: string
            description: Logging level of the message
        suite_id:
            type: integer
            description: Id of the suite that this message belongs to
        test_id:
            type: integer
            description: Id of the test case that this message belongs to. If null the loggin occurred in suite setup or teardown
        test_run_id:
            type: integer
            description: Id of the test run
    """

@register_swagger_model
class KeywordModel:
    """
    ---
    type: object
    description: Keyword or test step object
    properties:
        fingerprint:
            type: string
            description: Fingerprint (SHA1 hash of a execution tree)
        keyword:
            type: string
            description: Keyword/test step name. If null this represents a virtual test step
        library:
            type: string
            description: Library of the keyword/test step. If null this represents a virtual test step
        status:
            type: string
            description: Status of the keyword/test step
        arguments:
            type: array
            description: Arguments given to the keyword/test step
            items:
                type: string
                description: String representation of arguments given to the keyword/test step
        children:
            type: array
            description: Sub keywords/test steps called by invoked by this keyword
            items:
                $ref: '#/definitions/KeywordModel'
    """


class Application(tornado.web.Application):
    def __init__(self, database):
        handlers = [
            url(r"/$", BaseDataHandler),
            url(r"/data/?$", BaseDataHandler),
            url(r"/data/teams/?$", TeamsDataHandler),
            url(r"/data/series/?$", SeriesDataHandler),
            url(r"/data/series/(?P<series>[0-9]+)/info?$", SeriesInfoDataHandler),
            url(r"/data/series/(?P<series>[0-9]+)/builds/?$", BuildsDataHandler),
            url(r"/data/series/(?P<series>[0-9]+)/builds/(?P<build_number>[0-9]+)/info?$",
                BuildInfoDataHandler),
            url(r"/data/series/(?P<series>[0-9]+)/builds/(?P<build_number>[0-9]+)/suites/(?P<suite>[0-9]+)/?$",
                SuiteResultDataHandler),
            url(r"/data/series/(?P<series>[0-9]+)/builds/(?P<build_number>[0-9]+)/suites/(?P<suite>[0-9]+)/info?$",
                SuiteResultInfoDataHandler),
            url(r"/data/series/(?P<series>[0-9]+)/history/?$", HistoryDataHandler),
            url(r"/data/series/(?P<series>[0-9]+)/builds/(?P<build_number>[0-9]+)/metadata/?$",
                MetaDataHandler),
            url(r"/data/test_runs/(?P<test_run>[0-9]+)/suites/(?P<suite>[0-9]+)/log_messages?$",
                SuiteLogMessageDataHandler),
            url(r"/data/test_runs/(?P<test_run>[0-9]+)/test_cases/(?P<test>[0-9]+)/log_messages?$",
                TestCaseLogMessageDataHandler),
            url(r"/data/keyword_tree/(?P<fingerprint>[0-9a-fA-F]{40})/?$", KeywordTreeDataHandler),

            url(r"/data/history/?$", OldHistoryDataHandler), # Depricated see HistoryDataHandler
            url(r"/data/metadata/?$", OldMetaDataHandler), # Depricated see MetaDataHandler

            # For query testing purposes only
            url(r"/data/foo/?$", FooDataHandler)
        ]

        settings = dict(debug=True)
        self.database = database
        setup_swagger(handlers,
                      swagger_url="/data/doc",
                      description='Project repo at https://github.com/salabs/Epimetheus',
                      api_version='0.1.0',
                      title='Epimetheus backend API')
        tornado.web.Application.__init__(self, handlers, **settings)


def free_connection(connections):
    if isinstance(connections, list):
        for conn in connections:
            conn.free()
    else:
        connections.free()

def values_are_integers(self, *values):
    """Checks that given values can be casted to int. None value is considered valid."""
    try:
        [int(val) for val in values if val]
    except ValueError:
        return False
    return True

@tornado.gen.coroutine
def coroutine_query(querer, *args, **kwargs):
    rows, formatter = querer(*args, **kwargs)
    rows = yield rows
    results = formatter(rows)
    free_connection(rows)
    return results

class BaseHandler(tornado.web.RequestHandler):
    # Default error handling is to return HTTP status 500
    def write_error(self, status_code, **kwargs):
        self.send_error_response(500, 'Server error')

    @property
    def database(self):
        return self.application.database

    def data_received(self, chunk):
        pass

    def send_error_response(self, status, message=''):
        self.set_header('Content-Type', 'application/json')
        self.set_status(status)
        self.write({'error': {'code': status, 'message': message}})

    def send_bad_request_response(self):
        self.send_error_response(400, 'Bad request')

    def send_not_found_response(self):
        self.send_error_response(404, 'Not found')

    @tornado.gen.coroutine
    def keyword_tree(self, fingerprint):
        if not fingerprint:
            return None
        keyword_tree = yield coroutine_query(self.database.keyword_tree, fingerprint)
        if keyword_tree:
            keyword_tree['children'] = []
            keyword_tree = yield self.child_trees(keyword_tree)
            return keyword_tree
        return None

    @tornado.gen.coroutine
    def child_trees(self, keyword_tree):
        if 'children' not in keyword_tree:
            keyword_tree['children'] = []
        children = yield coroutine_query(self.database.subtrees, keyword_tree['fingerprint'])
        for child in children:
            child_tree = yield self.child_trees(child)
            keyword_tree['children'].append(child_tree)
        return keyword_tree


class BaseDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self):
        # Redirect api base queries to API doc
        self.redirect('/data/doc')


class TeamsDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self):
        """
        ---
        tags:
        - Teams
        summary: Get teams and their series
        description: Returns an array of all teams found in the database.
            Nested in each team is listed all series for the team in an array.
        produces:
        - application/json
        responses:
            200:
              description: A list of teams
              schema:
                    type: object
                    properties:
                        teams:
                            type: array
                            items:
                                type: object
                                properties:
                                    name:
                                        type: string
                                        description: Team name.
                                    series_count:
                                        type: string
                                        description: Amount of series for a given team.
                                    series:
                                        type: array
                                        description: Array of series for a given team. Most recently updated first
                                        items:
                                            $ref: '#/definitions/SeriesModel'
        """
        teams = yield coroutine_query(self.database.teams)
        self.write({'teams': teams})


class SeriesDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self):
        """
        ---
        tags:
        - Series
        summary: Get series
        description: List all test series. Most recently updated first
        produces:
        - application/json
        responses:
            200:
                description: A list of series
                schema:
                    type: object
                    properties:
                        series:
                            type: array
                            items:
                                $ref: '#/definitions/SeriesModel'
        """
        series = yield coroutine_query(self.database.test_series)
        self.write({'series': series})


class SeriesInfoDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self, series):
        """
        ---
        tags:
        - Item info
        summary: Get series info
        description: Information about a series.
        produces:
        - application/json
        parameters:
        -   name: series
            in: path
            description: series id
            required: true
            type: integer
        responses:
            200:
                description: Object with meta information about a test series
                schema:
                    type: object
                    properties:
                        series:
                            $ref: '#/definitions/SeriesModel'
                        last_build:
                            $ref: '#/definitions/BuildModel'
                        first_build:
                            $ref: '#/definitions/BuildModel'
        """
        series_info = yield coroutine_query(self.database.test_series, series_id=series)
        last_build = yield coroutine_query(self.database.builds, series, num_of_builds=1)
        first_build = yield coroutine_query(self.database.builds, series, num_of_builds=1, reverse=True)
        if series_info and last_build:
            self.write({'series': series_info[0], 'last_build': last_build[0], 'first_build': first_build[0]})
        else:
            self.send_not_found_response()

class BuildsDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self, series):
        """
        ---
        tags:
        - Builds
        summary: Get builds
        description: Build history of a series
        produces:
        - application/json
        parameters:
        -   name: series
            in: path
            description: series id
            required: true
            type: integer
        -   name: start_from
            in: query
            description: build number, history starting from this build (defaults to last build in series)
            required: false
            type: integer
            allowEmptyValue: true
        -   name: builds
            in: query
            description: number of builds, i.e. maximum length of the history
            required: false
            type: integer
            default: 10
        -   name: offset
            in: query
            description: offset for the number of builds, moving further in history
            required: false
            type: integer
            default: 0
        responses:
            200:
                description: A list of build objects
                schema:
                    type: object
                    properties:
                        builds:
                            type: array
                            description: offset
                            items:
                                $ref: '#/definitions/BuildModel'
        """
        start_from = self.get_argument('start_from', None)
        num_of_builds = self.get_argument('builds', 10)
        offset = self.get_argument('offset', 0)

        if values_are_integers(series, start_from, num_of_builds, offset):
            builds = yield coroutine_query(self.database.builds, series, start_from=start_from,
                                                num_of_builds=num_of_builds, offset=offset)
            self.write({'builds': builds})
        else:
            self.send_bad_request_response()


class BuildInfoDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self, series, build_number):
        """
        ---
        tags:
        - Item info
        summary: Get build info
        description: Information about a build.
        produces:
        - application/json
        parameters:
        -   name: series
            in: path
            description: series id
            required: true
            type: integer
        -   name: build_number
            in: path
            description: build number
            required: true
            type: integer
        responses:
            200:
                description: Object with meta information about a build
                schema:
                    type: object
                    properties:
                        series:
                            $ref: '#/definitions/SeriesModel'
                        build:
                            $ref: '#/definitions/BuildModel'
        """
        series_info = yield coroutine_query(self.database.test_series, series_id=series)
        build_info = yield coroutine_query(self.database.builds, series, build_number=build_number)
        if series_info and build_info:
            self.write({'series': series_info[0], 'build': build_info[0]})
        else:
            self.send_not_found_response()


class SuiteResultDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self, series, build_number, suite):
        """
        ---
        tags:
        - Results
        summary: Suite results
        description: All suite result information including test results
        produces:
        - application/json
        parameters:
        -   name: series
            in: path
            description: series id
            required: true
            type: integer
        -   name: build_number
            in: path
            description: build number
            required: true
            type: integer
        -   name: suite
            in: path
            description: suite id
            required: true
            type: integer
        responses:
            200:
                schema:
                    type: object
                    properties:
                        series:
                            $ref: '#/definitions/SeriesModel'
                        build:
                            $ref: '#/definitions/BuildModel'
                        suite:
                            type: object
                            properties:
                                id:
                                    type: integer
                                    description: Id of the suite
                                name:
                                    type: string
                                    description: Name of the suite
                                full_name:
                                    type: string
                                    description: Full name of the suite
                                repository:
                                    type: string
                                    description: Repository of the suite
                                log_messages:
                                    type: array
                                    description: Log messages from suite setup and teardown
                                    items:
                                        $ref: '#/definitions/LogMessageModel'
                                tests:
                                    type: array
                                    description: List of test case results included in the suite
                                    items:
                                        type: object
                                        description: List of test case results included in the suite
                                        properties:
                                            id:
                                                type: integer
                                                description: Id of the test case
                                            name:
                                                type: string
                                                description: Name of the test case
                                            full_name:
                                                type: string
                                                description: Full name of the test case
                                            test_run_id:
                                                type: integer
                                                description: Id of the test run producing this result
                                            start_time:
                                                type: string
                                                format: date-time
                                                description: Timestamp for the test execution start
                                            status:
                                                type: string
                                                description: Final status of the test case
                                            setup_status:
                                                type: string
                                                description: Status of the test case setup phase, null if there was no setup
                                            execution_status:
                                                type: string
                                                description: Status of the test case execution phase, null if there was no execution
                                            teardown_status:
                                                type: string
                                                description: Status of the test case teardown phase, null if there was no teardown
                                            elapsed:
                                                type: string
                                                description: Total running time of the test case in millis
                                            setup_elapsed:
                                                type: string
                                                description: Running time of the test case setup phase in millis, null if there was no setup
                                            execution_elapsed:
                                                type: string
                                                description: Running time of the test case execution phase in millis, null if there was no execution
                                            teardown_elapsed:
                                                type: string
                                                description: Running time of the test case teardown phase in millis, null if there was no teardown
                                            fingerprint:
                                                type: string
                                                description: Fingerprint of the test case
                                            setup_fingerprint:
                                                type: string
                                                description: Fingerprint of the test case setup phase, refers to a keyword tree, null if there was no setup
                                            execution_fingerprint:
                                                type: string
                                                description: Fingerprint of the test case execution phase, refers to a keyword tree, null if there was no execution
                                            teardown_fingerprint:
                                                type: string
                                                description: Fingerprint of the test case teardown phase, refers to a keyword tree, null if there was no teardown
                                            tags:
                                                type: array
                                                items:
                                                    type: string
                                                    description: Tags assigned to the test case
                                            log_messages:
                                                type: array
                                                items:
                                                    $ref: '#/definitions/LogMessageModel'
                                            failure_log_level:
                                                type: string
                                                description: Log level for the representative error message
                                            failure_message:
                                                type: string
                                                description: The representative error message
                                            failure_timestamp:
                                                type: string
                                                format: date-time
                                                description: Timestamp for the representative error message
        """
        suite_result = yield coroutine_query(self.database.suite_result, series, build_number, suite)
        if suite_result:
            suite_result['log_messages'] = yield coroutine_query(self.database.suite_log_messages,
                                                                      suite_result['test_run_id'], suite)
            for test in suite_result['tests']:
                test['log_messages'] = yield coroutine_query(self.database.test_case_log_messages,
                                                                  test['test_run_id'], test['id'])
            self.write({'suite': suite_result})
        else:
            self.send_not_found_response()


class SuiteResultInfoDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self, series, build_number, suite):
        """
        ---
        tags:
        - Item info
        summary: Get suite result info
        description: Information about a suite result.
        produces:
        - application/json
        parameters:
        -   name: series
            in: path
            description: series id
            required: true
            type: integer
        -   name: build_number
            in: path
            description: build number
            required: true
            type: integer
        -   name: suite
            in: path
            description: suite id
            required: true
            type: integer
        responses:
            200:
                schema:
                    type: object
                    properties:
                        series:
                            $ref: '#/definitions/SeriesModel'
                        build:
                            $ref: '#/definitions/BuildModel'
                        suite:
                            type: object
                            properties:
                                id:
                                    type: integer
                                    description: Id of the suite
                                name:
                                    type: string
                                    description: Name of the suite
                                full_name:
                                    type: string
                                    description: Full name of the suite
                                repository:
                                    type: string
                                    description: Repository of the suite
                                tests:
                                    type: array
                                    description: List of test case results included in the suite
                                    items:
                                        type: object
                                        description: List of test case results included in the suite
                                        properties:
                                            id:
                                                type: integer
                                                description: Id of the test case
                                            name:
                                                type: string
                                                description: Name of the test case
                                            full_name:
                                                type: string
                                                description: Full name of the test case
                                            status:
                                                type: string
                                                description: Final status of the test case
                                            statuses:
                                                type: array
                                                description: Statuses of the possibly multiple executions of the test case, last first
                                                items:
                                                    type: string
                                                    description: Status string
                                            test_runs:
                                                type: array
                                                description: Test run ids of the possibly multiple executions of the test case, last first
                                                items:
                                                    type: integer
                                                    description: Test run id
        """
        series_info = yield coroutine_query(self.database.test_series, series_id=series)
        build_info = yield coroutine_query(self.database.builds, series, build_number=build_number)
        suite_result_info = yield coroutine_query(self.database.suite_result_info, series, build_number,
                                                       suite)
        if series_info and build_info and suite_result_info:
            self.write({'series': series_info[0], 'build': build_info[0], 'suite': suite_result_info})
        else:
            self.send_not_found_response()


class HistoryDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self, series):
        """
        ---
        tags:
        - History
        summary: Get series history data
        description: Data for building the test history table
        produces:
        - application/json
        parameters:
        -   name: series
            in: path
            description: series id
            required: true
            type: integer
        -   name: start_from
            in: query
            description: build number, history starting from this build (defaults to last build in series)
            required: false
            type: integer
            allowEmptyValue: true
        -   name: builds
            in: query
            description: number of builds, i.e. length of the history
            required: false
            type: integer
            default: 10
        -   name: offset
            in: query
            description: offset for the number of builds moving further in history
            required: false
            type: integer
            default: 0
        responses:
            200:
              description: History for a given series
              schema:
                    type: object
                    properties:
                        max_build_num:
                            type: integer
                            description: Largest build number in resulted history query
                        history:
                            type: array
                            description: Set of suites with results
                            items:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        description: Suite id.
                                    name:
                                        type: string
                                        description: Suite name.
                                    full_name:
                                        type: string
                                        description: Suite identifying full name.
                                    repository:
                                        type: string
                                        description: Repository that this suite belongs to.
                                    suite:
                                        type: string
                                        description: Alias for name (TO BE DEPRICATED)
                                    suite_full_name:
                                        type: string
                                        description: Alias for full_name (TO BE DEPRICATED)
                                    suite_id:
                                        type: integer
                                        description: Alias for id (TO BE DEPRICATED)
                                    test_cases:
                                        type: array
                                        description: Array of test cases and their build history
                                        items:
                                            type: object
                                            properties:
                                                test_id:
                                                    type: integer
                                                    description: Test case id.
                                                name:
                                                    type: string
                                                    description: Test case name.
                                                full_name:
                                                    type: string
                                                    description: Test case identifying full name.
                                                test_case:
                                                    type: string
                                                    description: Alias for name (TO BE DEPRICATED)
                                                builds:
                                                    type: array
                                                    description: list of test result objects in descending order
                                                    items:
                                                        type: object
                                                        properties:
                                                            build_number:
                                                                type: integer
                                                                description: Build number for the result.
                                                            elapsed:
                                                                type: integer
                                                                description: Running time for the test case in millis.
                                                            test_run_time:
                                                                type: integer
                                                                description: Alias for elapsed (TO BE DEPRICATED)
                                                            test_run_id:
                                                                type: integer
                                                                description: Id of the actual test run this result belongs to.
                                                            status:
                                                                type: string
                                                                description: Final status of the the test execution
                                                            start_time:
                                                                type: string
                                                                format: date-time
                                                                description: Timestamp for the test execution start
                                                            failure_log_level:
                                                                type: string
                                                                description: Log level for the representative error message
                                                            failure_message:
                                                                type: string
                                                                description: The representative error message
                                                            failure_timestamp:
                                                                type: string
                                                                format: date-time
                                                                description: Timestamp for the representative error message
                                                            tags:
                                                                type: array
                                                                description: List of test tags associated with this test and its execution
                                                                items:
                                                                    type: string
                                                            messages:
                                                                type: array
                                                                description: List of log message objects most likely to show the failure
                                                                items:
                                                                    type: object
        """
        start_from = self.get_argument('start_from', None)
        num_of_builds = self.get_argument('builds', 10)
        offset = self.get_argument('offset', 0)

        if values_are_integers(series, start_from, num_of_builds, offset):
            history, max_build_num = yield coroutine_query(self.database.history_page_data, series,
                                                                start_from, num_of_builds, offset)
            self.write({'max_build_num': max_build_num, 'history': history})
        else:
            self.send_bad_request_response()


class MetaDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self, series, build_number):
        """
        ---
        tags:
        - Metadata
        summary: Get metadata for a specific build in a series
        description: metadata handler
        produces:
        - application/json
        parameters:
        -   name: series
            in: path
            description: series id
            required: true
            type: integer
        -   name: build_number
            in: path
            description: build number
            required: true
            type: integer
        responses:
            200:
                description: Array of metadata for a given build in a series
                schema:
                    type: object
                    properties:
                        metadata:
                            type: array
                            items:
                                type: object
                                properties:
                                    metadata_name:
                                        type: string
                                        description: Metadata name.
                                    metadata_value:
                                        type: string
                                        description: Metadata value.
                                    suite_id:
                                        type: integer
                                        description: Target suite id for given metadata. Often links to root suite.
                                    test_run_id:
                                        type: integer
                                        description: Target test run id for given metadata.
        """
        if values_are_integers(series, build_number):
            metadata = yield coroutine_query(self.database.build_metadata, series, build_number)
            self.write({'metadata': metadata})
        else:
            self.send_bad_request_response()


class SuiteLogMessageDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self, test_run, suite):
        """
        ---
        tags:
        - Log messages
        summary: Get log messages of a suite
        description: Get log messages of a specific suite and its execution that are not tied to a test case
        produces:
        - application/json
        parameters:
        -   name: test_run
            in: path
            description: test run id
            required: true
            type: integer
        -   name: suite
            in: path
            description: suite id
            required: true
            type: integer
        responses:
            200:
                description: Array of log messages
                schema:
                    type: object
                    properties:
                        metadata:
                            type: array
                            items:
                                $ref: '#/definitions/LogMessageModel'
        """
        log_messages = yield coroutine_query(self.database.suite_log_messages, test_run, suite)
        self.write({'log_messages': log_messages})


class TestCaseLogMessageDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self, test_run, test):
        """
        ---
        tags:
        - Log messages
        summary: Get log messages of a test case
        description: Get log messages of a specific test case and its execution
        produces:
        - application/json
        parameters:
        -   name: test_run
            in: path
            description: test run id
            required: true
            type: integer
        -   name: test
            in: path
            description: test case id
            required: true
            type: integer
        responses:
            200:
                description: Array of log messages
                schema:
                    type: object
                    properties:
                        metadata:
                            type: array
                            items:
                                $ref: '#/definitions/LogMessageModel'
        """
        log_messages = yield coroutine_query(self.database.test_case_log_messages, test_run, test)
        self.write({'log_messages': log_messages})


class KeywordTreeDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self, fingerprint):
        """
        ---
        tags:
        - Keyword trees
        summary: Get trees of detected test execution steps or keywords
        description: Some fingerprints refer to a tree of execution steps that can be queried here
        produces:
        - application/json
        parameters:
        -   name: fingerprint
            in: path
            description: fingerprint (SHA1 hash of a execution tree)
            required: true
            type: string
            pattern: '^[0-9a-fA-F]{40}$'
        responses:
            200:
                description: Array of log messages
                schema:
                    $ref: '#/definitions/KeywordModel'
        """
        keyword_tree = yield self.keyword_tree(fingerprint.lower())
        if keyword_tree:
            self.write(keyword_tree)
        else:
            self.send_not_found_response()


class OldHistoryDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self):
        """
        ---
        tags:
        - History
        summary: (DEPRICATED) Get series history data
        description: (DEPRICATED) Data for building the test history table
        produces:
        - application/json
        parameters:
        -   name: series
            in: query
            description: series id
            required: true
            type: integer
        -   name: start_from
            in: query
            description: build number, history starting from this build (defaults to last build in series)
            required: false
            type: integer
            allowEmptyValue: true
        -   name: builds
            in: query
            description: number of builds, i.e. length of the history
            required: false
            type: integer
            default: 10
        -   name: offset for the number of builds moving further in history
            in: query
            description: offset
            required: false
            type: integer
            default: 0
        responses:
            200:
              description: History for a given series
              schema:
                    type: object
                    properties:
                        max_build_num:
                            type: integer
                            description: Largest build number in resulted history query
                        history:
                            type: array
                            description: Set of suites with results
                            items:
                                type: object
                                properties:
                                    id:
                                        type: integer
                                        description: Suite id.
                                    name:
                                        type: string
                                        description: Suite name.
                                    full_name:
                                        type: string
                                        description: Suite identifying full name.
                                    repository:
                                        type: string
                                        description: Repository that this suite belongs to.
                                    suite:
                                        type: string
                                        description: Alias for name (TO BE DEPRICATED)
                                    suite_full_name:
                                        type: string
                                        description: Alias for full_name (TO BE DEPRICATED)
                                    suite_id:
                                        type: integer
                                        description: Alias for id (TO BE DEPRICATED)
                                    test_cases:
                                        type: array
                                        description: Array of test cases and their build history
                                        items:
                                            type: object
                                            properties:
                                                test_id:
                                                    type: integer
                                                    description: Test case id.
                                                name:
                                                    type: string
                                                    description: Test case name.
                                                full_name:
                                                    type: string
                                                    description: Test case identifying full name.
                                                test_case:
                                                    type: string
                                                    description: Alias for name (TO BE DEPRICATED)
                                                builds:
                                                    type: array
                                                    description: list of test result objects in descending order
                                                    items:
                                                        type: object
                                                        properties:
                                                            build_number:
                                                                type: integer
                                                                description: Build number for the result.
                                                            elapsed:
                                                                type: integer
                                                                description: Running time for the test case in millis.
                                                            test_run_time:
                                                                type: integer
                                                                description: Alias for elapsed (TO BE DEPRICATED)
                                                            test_run_id:
                                                                type: integer
                                                                description: Id of the actual test run this result belongs to.
                                                            status:
                                                                type: string
                                                                description: Final status of the the test execution
                                                            start_time:
                                                                type: string
                                                                format: date-time
                                                                description: Timestamp for the test execution start
                                                            failure_log_level:
                                                                type: string
                                                                description: Log level for the representative error message
                                                            failure_message:
                                                                type: string
                                                                description: The representative error message
                                                            failure_timestamp:
                                                                type: string
                                                                format: date-time
                                                                description: Timestamp for the representative error message
                                                            tags:
                                                                type: array
                                                                description: List of test tags associated with this test and its execution
                                                                items:
                                                                    type: string
                                                            messages:
                                                                type: array
                                                                description: List of log message objects most likely to show the failure
                                                                items:
                                                                    type: object
        """
        test_series = self.get_argument('series', '')
        start_from = self.get_argument('start_from', None)
        num_of_builds = self.get_argument('builds', 10)
        offset = self.get_argument('offset', 0)

        if values_are_integers(test_series, start_from, num_of_builds, offset):
            history, max_build_num = yield coroutine_query(self.database.history_page_data, test_series,
                                                                start_from, num_of_builds, offset)
            self.write({'max_build_num': max_build_num, 'history': history})
        else:
            self.send_bad_request_response()


class OldMetaDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self):
        """
        ---
        tags:
        - Metadata
        summary: (DEPRICATED) Get metadata for a specific build in a series
        description: (DEPRICATED) metadata handler
        produces:
        - application/json
        parameters:
        -   name: series
            in: query
            description: series id
            required: true
            type: integer
        -   name: build_number
            in: query
            description: build number
            required: true
            type: integer
        responses:
            200:
                description: Array of metadata for a given build in a series
                schema:
                    type: object
                    properties:
                        metadata:
                            type: array
                            items:
                                type: object
                                properties:
                                    metadata_name:
                                        type: string
                                        description: Metadata name.
                                    metadata_value:
                                        type: string
                                        description: Metadata value.
                                    suite_id:
                                        type: integer
                                        description: Target suite id for given metadata. Often links to root suite.
                                    test_run_id:
                                        type: integer
                                        description: Target test run id for given metadata.
        """
        series = self.get_argument('series', '')
        build_number = self.get_argument('build_number', None)
        if values_are_integers(series, build_number):
            metadata = yield coroutine_query(self.database.build_metadata, series, build_number)
            self.write({'metadata': metadata})
        else:
            self.send_bad_request_response()


class FooDataHandler(BaseHandler):
    def get(self):
        self.write({'suites': []})


def main():
    parser = argparse.ArgumentParser(
        description='Test manager 2.0 backend server')
    parser.add_argument(
        '--config',
        dest='config_file',
        help='path to JSON config file containing database credentials')
    parser.add_argument('--database', help='database name')
    parser.add_argument('--host', help='database host name', default=None)
    parser.add_argument('--dbport', default=5432, help='database port (default: 5432)')
    parser.add_argument('--user', help='database user')
    parser.add_argument('--pw', '--password', help='database password')
    parser.add_argument('--port', help='http server port (default: 5000)', default=5000, type=int)
    args = parser.parse_args()

    if args.config_file:
        config = load_config_file(args.config_file)
    else:
        config = {
            'db_name': args.database,
            'db_user': args.user,
            'db_password': args.pw,
            'db_host': args.host,
            'db_port': args.dbport,
            'port': args.port
        }

    httpserver = tornado.httpserver.HTTPServer(
        Application(db.Database(config['db_host'], config['db_port'], config['db_name'],
                                config['db_user'], config['db_password'])))
    httpserver.listen(int(config['port']))
    print("Server listening port {}".format(config['port']))
    sys.stdout.flush()
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
