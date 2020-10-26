FROM python:3.7-slim-stretch

WORKDIR /python-back-end

COPY . /python-back-end

RUN pip install -r requirements.txt

RUN adduser --disabled-password --gecos '' backendserver
RUN chown -R backendserver:backendserver /python-back-end
USER backendserver

CMD python server.py --database $DATABASE --host $HOST --user $USER --pw $PASSWORD  --port $PORT

EXPOSE $PORT
