#!/bin/bash -ue

url="${1}/wd/hub/status"
output_match=\"ready\":.*true

shift
cmd="$@"

>&2 echo "wait-for-selenium.sh: checking status of URL ${url}"

until curl -s "${url}" | grep "${output_match}" 2>&1 > /dev/null; do
    >&2 echo "wait-for-selenium.sh: waiting for URL ${url}"
    sleep 1
done

${cmd}
