*** Variables ***

${timeline_locator}         xpath://*[@robot_id="timeLineContainer"]
${lastRunInfo}              xpath://*[@robot_id="lastRunInfo"]/p
${suite_id_locator}         xpath://*[@robot_id="datatable"]/tbody/tr/td[2]/span

${history_url}          ${URL}series/
${team_url}             ${URL}team/
${nav_id}               xpath://*[@robot_id="main-nav"]

#history page table
${table_header_xpath}        xpath://*[@robot_id="history-table-head"]/tr/th

${offset_latest}        xpath://*[@robot_id="latest_offset_button"]
${offset_field}     xpath://*[@robot_id="offset_field"]
${offset_left}      xpath://*[@robot_id="left_offset_button"]
${offset_right}     xpath://*[@robot_id="right_offset_button"]

${enabled_offset_right}      xpath://*[contains(@class, 'rightfalse')]
${enabled_offset_left}      xpath://*[contains(@class, 'leftfalse')]
${disabled_offset_right}      xpath://*[contains(@class, 'rightrue')]
${disabled_offset_left}      xpath://*[contains(@class, 'leftrue')]

${clicked_pass}      css:input[value="PASS"][type="checkbox"]:checked

${clicked_fail}      css:input[value="FAIL"][type="checkbox"]:checked


#Should be build page
${fail_checkbox_locator}    xpath://*[@robot_id="last-run-checkbox-container"]/label[2]
${pass_checkbox_locator}    xpath://*[@robot_id="last-run-checkbox-container"]/label[1]

${buildOverviewContainer}    //*[@robot_id="buildGraphDiv"]

${first_suite}              xpath://*[@robot_id="last-run-table"]/tbody/tr[1]/th[1]/a

${series_list}    xpath://*[@robot_id="selectedTeam"]/div[4]/div/div[2]/section[*]
${teams_xpath}    xpath://*[@robot_id="team"]/div[2]/div/div/section[*]

