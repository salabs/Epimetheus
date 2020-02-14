import argparse
import json
import os
import re
import sys

import database as db
import tornado.httpserver
import tornado.ioloop
import tornado.web

APP_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
STATIC_DIRECTORY = os.path.abspath(os.path.join(APP_DIRECTORY, 'static'))
TEMPLATES_DIRECTORY = os.path.abspath(os.path.join(APP_DIRECTORY, 'templates'))


def load_config_file(config_file):
    with open(config_file, 'r') as f:
        return json.load(f)


class Application(tornado.web.Application):
    def __init__(self, database, config):
        handlers = [
            (r"/data/series/", SeriesDataHandler),
            (r"/data/history", HistoryDataHandler),
            (r"/data/metadata", MetaDataHandler),

            # For query testing purposes only
            (r"/data/foo/", FooDataHandler)
        ]

        settings = dict(
            template_path=TEMPLATES_DIRECTORY,
            static_path=STATIC_DIRECTORY,
            debug=True,
        )
        self.database = database
        tornado.web.Application.__init__(self, handlers, **settings)


class BaseHandler(tornado.web.RequestHandler):
    @property
    def database(self):
        return self.application.database

    def free_connection(self, connections):
        if isinstance(connections, list):
            for conn in connections:
                conn.free()
        else:
            connections.free()

    async def async_query(self, querer, *args, **kwargs):
        rows, formatter = querer(*args, **kwargs)
        rows = await rows
        results = formatter(rows)
        self.free_connection(rows)
        return results

    async def async_queries(self, querer, *args, **kwargs):
        rows_1, rows_2, formatter = querer(*args, **kwargs)
        rows_1 = await rows_1
        rows_2 = await rows_2
        results = formatter(rows_1, rows_2)
        self.free_connection(rows_1)
        self.free_connection(rows_2)
        return results

    def send_error_response(self, status, message=''):
        self.set_status(status)
        self.write({'error': {'code': status, 'message': message}})

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Headers",
                        "Origin, X-Requested-With, Content-Type, Accept")


class MetaDataHandler(BaseHandler):
    async def get(self):
        build_number = self.get_argument('build_number', None)
        build_number_pattern = re.compile('^[0-9]*$')
        if build_number and build_number_pattern.match(build_number):
            metadata = await self.async_query(self.database.metadata,
                                              build_number)
            self.write({'metadata': metadata})
        else:
            self.send_error_response(400, 'Missing or invalid build number')


class HistoryDataHandler(BaseHandler):
    async def get(self):
        num_of_builds = self.get_argument('builds', "10")
        test_series_name = self.get_argument('series_name', '')
        builds_pattern = re.compile('^[1-9][0-9]?$|^100$')
        if not builds_pattern.match(num_of_builds):
            self.send_error_response(
                400, 'Amount of builds must be between 1 and 100')
        else:
            history, max_build_num = await self.async_queries(
                self.database.history_page_data, num_of_builds,
                test_series_name)
            self.write({'max_build_num': max_build_num, 'history': history})


class SeriesDataHandler(BaseHandler):
    async def get(self):
        series = await self.async_query(self.database.test_series)
        self.write({'series': series})


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
            'port': args.port
        }

    httpserver = tornado.httpserver.HTTPServer(
        Application(
            db.Database(config['db_host'], config['db_name'],
                        config['db_user'], config['db_password']), config))
    httpserver.listen(int(config['port']))
    print("Server listening port {}".format(config['port']))
    sys.stdout.flush()
    tornado.ioloop.IOLoop.current().start()
