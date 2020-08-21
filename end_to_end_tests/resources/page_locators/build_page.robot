***Variables***
${fail_checkbox_locator}    xpath://*[@id="last-run-checkbox-container"]/label[1]/input
${pass_checkbox_locator}    xpath://*[@id="last-run-checkbox-container"]/label[2]/input
${table_locator}            xpath://*[@id="last-run-table"]/tbody
${table_row_locator}        xpath://*[@id="last-run-table"]/tbody/tr

${pass_span}	            xpath://*[@id="last-run-table"]/tbody/tr[*]/td[*]/span[text()='Pass']
${fail_span}	            xpath://*[@id="last-run-table"]/tbody/tr[*]/td[*]/span[text()='Fail']
${last_run_table}           xpath://*[@id="last-run-table"]

${series_breadcrumb}        //*[@id="SeriesBreadCrumb"]

${team_identifier}          xpath://*[@id="LastRunTable"]/tbody/tr/td[1]
${series_identifier}        xpath://*[@id="LastRunTable"]/tbody/tr/td[2]
${build_identifier}         xpath://*[@id="LastRunTable"]/tbody/tr/td[3]
${build_breadcrumb}         xpath://*[@id="BuildBreadCrumb"]
${build_page_info_table}    xpath://*[@id="LastRunTable"]/tbody

${first_suite}              xpath://*[@id="last-run-table"]/tbody/tr[1]/td[1]/a