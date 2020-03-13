FROM python:3.6

RUN groupadd -rf robot && useradd -g robot --create-home --shell /bin/bash robot

WORKDIR /home/robot/test

ADD robot_tests/ .
ADD resources/ .
ADD requirements.txt .
ADD run-e2e-tests.sh .
ADD wait-for-selenium.sh .
ADD variables.py .

RUN pip install -r requirements.txt

RUN chown -R robot:robot /home/robot
RUN mkdir /home/robot/test/logs

RUN chown -R robot:robot /home/robot/test/logs
VOLUME /home/robot/test/logs

ENV SELENIUM_URL=$SELENIUM_URL

USER robot

ENTRYPOINT ./wait-for-selenium.sh epimetheus_seleniumgrid_1:4444 ./run-e2e-tests.sh