import requests
import json

from robot.api.deco import keyword, library

#Helper class for tests

@library
class Helper:

    ROBOT_LIBRARY_SCOPE = 'TEST SUITE'
    
    def __init__(self, host):
        self.host = host
        self.value=0
        print(self.host)
    
    @keyword
    def get_team_number(self):
        r = requests.get(self.host+"data/teams")
        print(r.json())
        return (len(r.json()["teams"]))

    @keyword
    def get_series_number(self, teami):
        r = requests.get(self.host+"data/teams")
        print(r.json())
        team_array = r.json()["teams"]
        series = 0
        for team in team_array:
            if(team["name"] == teami):
                series += team["series_count"]
                if(team["all_builds"]):
                    series = series +1
        
        return series

    @keyword
    def set_number(self, number):
        self.value = number

    @keyword
    def get_number(self):
        return self.value
