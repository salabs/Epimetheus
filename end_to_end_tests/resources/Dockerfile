FROM python:3.6

RUN groupadd -rf robot && useradd -g robot --create-home --shell /bin/bash robot

WORKDIR /home/robot/test

ADD test/robot ./robot
ADD test/variables.py .
ADD test/requirements.txt .
ADD test/run_tests.sh .
ADD resources/scripts/wait-for-selenium.sh .
ADD test/getChangedFilesWithApi.py .

RUN pip install -r requirements.txt

RUN chown -R robot:robot /home/robot
RUN mkdir /home/robot/test/logs

RUN chown -R robot:robot /home/robot/test/logs
VOLUME /home/robot/test/logs

ENV CI_JOB_ID=$CI_JOB_ID
ENV CI_COMMIT_SHA=$CI_COMMIT_SHA
ENV CI_COMMIT_REF_NAME=$CI_COMMIT_REF_NAME
ENV KNOME_REDUX_GITLAB_API_KEY=$KNOME_REDUX_GITLAB_API_KEY
ENV CI_JOB_URL=$CI_JOB_URL
ENV GITLAB_USER_NAME=$GITLAB_USER_NAME
ENV CI_PIPELINE_IID=$CI_PIPELINE_IID

USER robot

ENTRYPOINT ./wait-for-selenium.sh ${SELENIUM_URL} ./run_tests.sh