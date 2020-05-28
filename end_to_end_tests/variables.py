import os

#SELENIUM_URL = os.environ['SELENIUM_URL']
SELENIUM_URL = 'http://seleniumgrid:4444'
SELENIUM_SPEED = 0
BROWSER = 'chrome'
SCREEN_WIDTH = 1920
SCREEN_HEIGHT = 1080
URL = 'http://frontend-server:3000/'
#URL = 'http://localhost:3000/'
history_url = URL+'series/'
team_url = URL+'team/'
nav_id = 'main-nav'
remote_url= 'epimetheus_seleniumgrid_1:4444/wd/hub'
#remote_url=''
dir_path = os.path.dirname(os.path.realpath(__file__))
Backend= 'http://backend-server'
RESOURCES = os.path.join(dir_path, 'robot', 'resources')
