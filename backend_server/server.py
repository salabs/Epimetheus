import argparse
import json
import sys

import tornado.httpserver
import tornado.ioloop
import tornado.web

from tornado_swagger.setup import setup_swagger

import database as db


def load_config_file(config_file):
    with open(config_file, 'r') as f:
        return json.load(f)


class Application(tornado.web.Application):
    def __init__(self, database, config):
        handlers = [
            tornado.web.url(r"/data/series/?$", SeriesDataHandler),
            tornado.web.url(r"/data/teams/?$", TeamsDataHandler),
            tornado.web.url(r"/data/history/?$", HistoryDataHandler),
            tornado.web.url(r"/data/metadata/?$", MetaDataHandler),

            # For query testing purposes only
            tornado.web.url(r"/data/foo/?$", FooDataHandler)
        ]

        settings = dict(debug=True)
        self.database = database
        setup_swagger(handlers,
            swagger_url="/data/doc",
            description='Project repo at https://github.com/salabs/Epimetheus',
            api_version='0.0.1',
            title='Epimetheus backend API',)
        tornado.web.Application.__init__(self, handlers, **settings)


class BaseHandler(tornado.web.RequestHandler):
    # Default error handling is to return HTTP status 500
    def write_error(self, status_code, **kwargs):
        self.send_error_response(500, 'Server error')

    @property
    def database(self):
        return self.application.database

    def free_connection(self, connections):
        if isinstance(connections, list):
            for conn in connections:
                conn.free()
        else:
            connections.free()

    @tornado.gen.coroutine
    def coroutine_query(self, querer, *args, **kwargs):
        rows, formatter = querer(*args, **kwargs)
        rows = yield rows
        results = formatter(rows)
        self.free_connection(rows)
        return results

    def send_error_response(self, status, message=''):
        self.set_header('Content-Type', 'application/json')
        self.set_status(status)
        self.write({'error': {'code': status, 'message': message}})

    def send_bad_request_response(self):
        self.send_error_response(400, 'Bad request')

    # Checks that given values can be casted to int. None value is considered valid.
    @staticmethod
    def values_are_integers(self, *values):
        try:
            for val in values:
                if val: int(val)
        except ValueError:
            return False
        return True

class MetaDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self):
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
            in: query
            description: series
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
                                        description: Target suite for given metadata. Often links to root suite.
                                    test_run_id:
                                        type: integer
                                        description: Target test run id for given metadata.
        """
        test_series = self.get_argument('series', '')
        build_number = self.get_argument('build_number', None)
        if self.values_are_integers(test_series, build_number) :
            metadata = yield self.coroutine_query(self.database.build_metadata, test_series, build_number)
            self.write({'metadata': metadata})
        else:
            self.send_bad_request_response()


class HistoryDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self):
        """
        ---
        tags:
        - History
        summary: Get series history data
        description: historydata handler
        produces:
        - application/json
        parameters:
        -   name: series
            in: query
            description: series
            required: true
            type: integer
        -   name: start_from
            in: query
            description: build number
            required: false
            type: integer
            allowEmptyValue: true
        -   name: builds
            in: query
            description: number of builds
            required: false
            type: integer
            default: 10
        -   name: offset
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
                            items:
                                properties:
                                    id:
                                        type: integer
                                        description: Test id.
                                    name:
                                        type: string
                                        description: Test name.
                                    repository:
                                        type: string
                                        description: .
                                    test_run_id:
                                        type: integer
                                        description: .
                                    start_time:
                                        type: string
                                        format: date-time
                                        description: Suite execution start timestamp
                                    elapsed:
                                        type: integer
                                        description: Test execution time in milliseconds
                                    suite:
                                        type: string
                                        description: Suite name
                                    suite_full_name:
                                        type: string
                                        description: Full suite name with parent data included
                                    suite_id:
                                        type: integer
                                        description: Suite id
                                    suite_run_time:
                                        type: integer
                                        description: Suite execution time in milliseconds
                                    test_cases:
                                        type: array
                                        description: Array of test cases and their build history
                                        items:
                                            type: object
        """
        test_series = self.get_argument('series', '')
        start_from = self.get_argument('start_from', None)
        num_of_builds = self.get_argument('builds', 10)
        offset = self.get_argument('offset', 0)

        if self.values_are_integers(test_series, start_from, num_of_builds, offset):
                history, max_build_num = yield self.coroutine_query(
                    self.database.history_page_data, test_series, start_from, num_of_builds, offset)
                self.write({'max_build_num': max_build_num, 'history': history})
        else:
            self.send_bad_request_response()


class SeriesDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self):
        """
        ---
        tags:
        - Series
        summary: Get series
        description: seriesdata handler
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
                                type: object
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
                                        description: Amount of builds in series.
                                    last_build:
                                        type: integer
                                        description: Latest build number for series.
                                    last_generated:
                                        type: string
                                        format: date-time
                                        description: .
                                    last_imported:
                                        type: string
                                        format: date-time
                                        description: .
                                    last_started:
                                        type: string
                                        format: date-time
                                        description: .
                                    sorting_value:
                                        type: string
                                        format: date-time
                                        description: .
        """
        series = yield self.coroutine_query(self.database.test_series)
        self.write({'series': series})


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
                                        description: Array of series for a given team.
                                        items:
                                            type: object
        """
        teams = yield self.coroutine_query(self.database.teams)
        self.write({'teams': teams})


class FooDataHandler(BaseHandler):
    def get(self):
        self.write({'suites': []})


if __name__ == "__main__":
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
    parser.add_argument('--port',
                        help='http server port (default: 5000)',
                        default=5000,
                        type=int)
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
        Application(
            db.Database(config['db_host'], config['db_port'], config['db_name'],
                        config['db_user'], config['db_password']), config))
    httpserver.listen(int(config['port']))
    print("Server listening port {}".format(config['port']))
    sys.stdout.flush()
    tornado.ioloop.IOLoop.current().start()
