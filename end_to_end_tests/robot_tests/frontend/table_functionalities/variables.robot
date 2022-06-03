***Variables***
#History

#These Point to IDs as react-ally-option
${series_history_dropdown}      xpath://*[@id="build_amount_dropdown"]
${history_build_selector_5}     xpath://*[@id="react-a11y-option-.$5_option"]
${history_build_selector_10}        xpath://*[@id="react-a11y-option-.$10_option"]
${history_build_selector_15}        xpath://*[@id="react-a11y-option-.$15_option"]
${history_build_selector_30}        xpath://*[@id="react-a11y-option-.$30_option"]


${series_history_most_recent}       //*[@robot_id="history-table-head"]/tr/th[3]/a
${series_history_second_recent}     //*[@robot_id="history-table-head"]/tr/th[4]/a
${series_history_third_recent}      //*[@robot_id="history-table-head"]/tr/th[5]/a

#Build Page
${table_locator}            xpath://*[@robot_id="last-run-table"]/tbody
${table_row_locator}        xpath://*[@robot_id="last-run-table"]/tbody/tr

${pass_span}	            xpath://*[@robot_id="last-run-table"]/tbody/tr[*]/td[*]/span[text()='Status: Pass']
${fail_span}	            xpath://*[@robot_id="last-run-table"]/tbody/tr[*]/td[*]/span[text()='Status: Fail']
${last_run_table}           xpath://*[@robot_id="last-run-table"]
