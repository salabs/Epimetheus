import os

SELENIUM_URL = os.environ['SELENIUM_URL']
SELENIUM_SPEED = 0
BROWSER = 'chrome'
SCREEN_WIDTH = 1920
SCREEN_HEIGHT = 1080

dir_path = os.path.dirname(os.path.realpath(__file__))

RESOURCES = os.path.join(dir_path, 'robot', 'resources')
