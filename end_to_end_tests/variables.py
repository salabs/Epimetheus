import os

#SELENIUM_URL = os.environ['SELENIUM_URL']
SELENIUM_URL = 'http://seleniumgrid:4444'
SELENIUM_SPEED = 0
BROWSER = 'chrome'
SCREEN_WIDTH = 1920
SCREEN_HEIGHT = 1080

if 'CI_PIPELINE_ID' in os.environ:
    URL = 'http://frontend-server:3000/'
else:
    URL = 'http://localhost:3000/'

if 'CI_PIPELINE_ID' in os.environ:
    remote_url= 'epimetheus_seleniumgrid_1:4444/wd/hub'
else:
    remote_url=''
dir_path = os.path.dirname(os.path.realpath(__file__))
if 'CI_PIPELINE_ID' in os.environ:
    Backend= 'http://backend-server'
else:
    Backend= 'http://localhost'

RESOURCES = os.path.join(dir_path, 'robot', 'resources')
