***Variables***

#Common
${siteHeading}    xpath://*[@robot_id="siteHeading"]

${team_identifier}          xpath://*[@robot_id="lastRunInfo"]/p[1]/span[2]
${series_identifier}        xpath://*[@robot_id="lastRunInfo"]/p[2]/span[2]
${build_identifier}         xpath://*[@robot_id="lastRunInfo"]/p[3]/span[2]

#Team
${team_breadcrumb}    xpath://*[@robot_id="TeamBreadCrumb"]

#Build Overview
${buildOverviewContainer}    //*[@robot_id="buildGraphDiv"]

#Build Page
${build_breadcrumb}         xpath://*[@robot_id="BuildBreadCrumb"]

#Series Page
${series_breadcrumb}        xpath://*[@robot_id="SeriesBreadCrumb"]

#Suite Page
${suite_breadcrumb}     xpath://*[@robot_id="SuiteBreadCrumb"]

