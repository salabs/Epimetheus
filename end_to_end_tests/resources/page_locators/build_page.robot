***Variables***
${fail_checkbox_locator}  //*[@id="last-run-checkbox-container"]/label[1]/input
${pass_checkbox_locator}  //*[@id="last-run-checkbox-container"]/label[2]/input
${table_locator}  //*[@id="last-run-table"]/tbody
${table_row_locator}  //*[@id="last-run-table"]/tbody/tr


${pass_span}	//*[@id="last-run-table"]/tbody/tr[*]/td[*]/span[text()='Pass']
${fail_span}	//*[@id="last-run-table"]/tbody/tr[*]/td[*]/span[text()='Fail']
${last_run_table}    //*[@id="last-run-table"]

${series_breadcrumb}    //*[@id="last-run"]/div[3]/div/div/div/a[2]
${team_breadcrumb}    //*[@id="last-run"]/div[3]/div/div/div/a[1]

${team_identifier}    //*[@id="last-run"]/div[4]/div/table/tbody/tr/td[2]
${series_identifier}    //*[@id="last-run"]/div[4]/div/table/tbody/tr/td[1]
