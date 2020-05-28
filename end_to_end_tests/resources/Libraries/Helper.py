import requests

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
    def get_series_number(self, team):
        r = requests.get(self.host+"data/series")
        print(r.json())
        series_array = r.json()["series"]
        series_amount = 0
        for series in series_array:
            if(series["team"] == team):
                series_amount += 1
        return series_amount

    @keyword
    def get_amount_of_builds(self, series, team):
        r = requests.get(self.host+"data/series")
        print(r.json())
        series_array = r.json()["series"]
        amount = 0
        for series in series_array:
            if(series["name"] == series and series["team"] == team):
                amount = series["builds"]
        return amount

    @keyword
    def get_latest_build(self, series, team):
        r = requests.get(self.host+"data/series")
        print(r.json())
        series_array = r.json()["series"]
        last_build = 0
        for series in series_array:
            if(series["name"] == series and series["team"] == team):
                last_build = series["last_build"]
        return last_build

    @keyword
    def set_number(self, number):
        self.value = number

    @keyword
    def get_number(self):
        return self.value