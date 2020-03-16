import argparse
import json
import os
import re
import sys

import tornado.httpserver
import tornado.ioloop
import tornado.web

import database as db


def load_config_file(config_file):
    with open(config_file, 'r') as f:
        return json.load(f)


class Application(tornado.web.Application):
    def __init__(self, database, config):
        handlers = [
            (r"^/data/series/?$", SeriesDataHandler),
            (r"^/data/teams/?$", TeamsDataHandler),
            (r"^/data/history/?$", HistoryDataHandler),
            (r"^/data/metadata/?$", MetaDataHandler),

            # For query testing purposes only
            (r"^/data/foo/?$", FooDataHandler)
        ]

        settings = dict(debug=True)
        self.database = database
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
        series = yield self.coroutine_query(self.database.test_series)
        self.write({'series': series})


class TeamsDataHandler(BaseHandler):
    @tornado.gen.coroutine
    def get(self):
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
