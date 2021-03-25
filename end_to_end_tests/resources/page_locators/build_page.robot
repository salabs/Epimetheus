***Variables***
${fail_checkbox_locator}    xpath://*[@id="last-run-checkbox-container"]/label[1]/span
${pass_checkbox_locator}    xpath://*[@id="last-run-checkbox-container"]/label[2]/span
${table_locator}            xpath://*[@id="last-run-table"]/tbody
${table_row_locator}        xpath://*[@id="last-run-table"]/tbody/tr

${pass_span}	            xpath://*[@id="last-run-table"]/tbody/tr[*]/td[*]/span[text()='Status: Pass']
${fail_span}	            xpath://*[@id="last-run-table"]/tbody/tr[*]/td[*]/span[text()='Status: Fail']
${last_run_table}           xpath://*[@id="last-run-table"]

${first_suite}              xpath://*[@id="last-run-table"]/tbody/tr[1]/th[1]/a
