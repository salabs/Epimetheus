# Epimetheus End-to-End testing with Robot Framework

This directory contains the test automation for Epimetheus.
The tests are created with Robot Framework's Selenium Library and executed with docker-compose, they can be executed locally as well though.

## Robot Framework Documentation

The Test Automation Utilizes mostly 2 Libraries from Robot Framework

The BuiltIn Library:

https://robotframework.org/robotframework/latest/libraries/BuiltIn.html

The Selenium Library:

https://robotframework.org/SeleniumLibrary/SeleniumLibrary.html

If you are unfamiliar with robot framework this document contains all you need to know.
It is very long and some parts of it are not very relavant for this project though.

Robot Framework User Guide:

https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html

## How to Develop Tests for this Project

### Local Development / Executing Tests Locally

If you wish to execute tests locally you need to have a few things covered.
- You need Epimetheus Running Somewhere, while developing this will usually be local installation
- You need to have the correct python packages installed to execute robot framework tests.
- You need to have chromedriver installed correctly.

#### Installing Robot Framework Packages

- First verify that you have python and pip installed with you terminal

```
python3 --version
```

```
pip3 --version
```

Both of these commands should give you version as output, the packages names might be different depending on your platform. Notice that we want to use python3 version of pip. If you machine does not have python2 installed only pip should be enough.

- Installing a virtual environment for pip

We want to install a project specific virtual environment for pip to avoid conflicts with other projects on your system. Pip dependancy issues can be hard to solve so this isolation is done in order to not face them.

```
pip3 install virtualenv
```

After which we can execute 

```
virtualenv venv
```

Notice that the venv part can be swapped with whatever you want your virtualenv to be called. This command will create an isolated environment for you pip packages.

Then depending on your OS

Mac, Linux
```
source ./venv/bin/activate
```

Windows
```
source ./venv/Scripts/activate
```

With these commands you should now have a (venv) added in your terminal before/after your commands to display that the virtualenv has been activated correctly.

- Installing the actual pip packages

You have now created an isolated enviroment so lets install some pip packages. This command should be run inside the end_to_end_tests folder

```
pip install -r requirements.txt
```

With this all the necessary packages should be installed.

#### Installing Chromedriver

Chromedriver can be installed in two different ways

One way is to use the method used in the CI and run a docker-container "elgalu/selenium:latest". This Container will allow for remote execution of selenium tests, utilizing the remote_url parameter of Selenium Library. Make sure that the selenium container is created so that it supports chromedriver.

The otherway is to install chromedriver locally, this can take a while to get working though.

- Make sure that your virtualenv is active
- Install pip package called webdrivermanager

```
pip install webdrivermanager
```

- Use webdrivermanager to install chromedriver

```
webdrivermanager chrome
```

With this chromedriver should work. Verification can be done by executing frontend tests locally.
If you face a version conflict with your installed chrome browser and chromedriver try to find a solution using google.

#### Executing tests

All of the tests can be executed with the following command

```
robot --variablefile variables.py ./robot_tests
```

If you wish to limit the amount of tests ran, you can add an "--include flag"

```
robot --variablefile variables.py --include Frontend ./robot_tests
```

If you have exported the correct variables for a TestArchiver Database to your enviroment. Read more on this in the backend documentation
Execute the following command to port your local test executions to your chosen TestArchiver Database
```
./run-e2e-tests.sh
```

The Test Execution is created in such a way that variables regarding the local and remote execution of the suite will be automatically chosen by the variable file variables.py. If you want to execute your local test cases facing a different URL than "localhost:3000" the variable should be changed here. 
Variables.py will also decide whether to use local selenium/webdriver for testing or to use a remotely created selenium container.

If you decided to create a selenium container for local testing, please change the local remote url in variables.py to match the url of your selenium container. By default the application uses a local webdriver so the remote url paramater is left empty for local development.

### Directory Structure

The directory structure of end_to_end tests is as follows.

The parent directory contains all necessary scripts for the purpose of executing the test automation through CI.
- wait-for-selenium.sh is used to verify that the remote selenium container is up before we start executing tests.
- run-e2e-tests.sh is used to execute tests and upload their results to testarchiver
- variables.py is used to automatically choose correct variables depending on the environment used for testing.

A directory called logs is created by the test execution which will contain robot-framework logs for the previous execution. This folder is not present in source control.

The two main folders regarding test automation are resources and robot_tests. A split is made here so that variables required by robot framework are stored under resources and the actual keywords and test cases are stored under robot_tests. The resources folder also contains the Dockerfile for the robot_framework image.

Under resources we find 3 folders:
- general_keywords, which contain common keywords used across multiple different test suites
- Libraries, which contains a simple library to fetch API results from the backend
- page_locators, which contains element locators split into page specific files. 
We also find a file called resource.robot which is used to import common ( currently all ) elements to robot tests.


Under robot_tests we find a split between backend and frontend, after which we find folders designated for different pages. We also find some more common suites such as navbar tests. Notice that most of the folder contain an __init__.robot file, this is used to force tags to the underlying files which can then be used to limit test execution with the --include flag in the execution of robot.

### How the automated tests are executed with github actions

As the flow of actions here is quite complicated this section is given its own section.

The github action initially starts the workflow by executing run-docker.sh
- run-docker.sh, this file first creates a file from the secret environmental variables of github which will then be used to send logs to TestArchiver. Then the script executes docker-compose of the file docker-compose-robot-tests.yml
- docker-compose-robot-tests.yml, this file creates containers of the frontend and backend as well as creates a container for selenium and for robot framework execution. The robot-framework container is created from the image under end_to_end_tests/resources/Dockerfile
- Dockerfile, A docker image is created containing all the necessary scripts as well as the test files for robot framework. The execution of robotframework begins by first executing the script: wait-for-selenium.sh after which the script run-e2e-tests.sh will be ran.
- run-e2e-tests.sh, this file will first distinguish between a local and remote run after which the script will execute the robot tests and upload their results to testarchiver.


## Refactoring Ideas

Few ideas for the purpose of refactoring the test automation.

- Create a script which will run the test execution with docker-compose so that the user does not need to install all python dependencies/webdriver
- Create better suites for frontend, instead of having page specific suites have for example breadcrumbs suite, verification suite etc. The locators could also be located inside the robot_tests folder within their corresponding suites, in a separate file of course. This would make the editing of tests easier as their corresponding variables would be located within the folder.
- Change locators to work with a robot-id instead of html ids.
- Split keywords away from test cases, so that the test case files would not be crowded by keyword implementations.
- general_keywords folder could be under robot_tests as well, as the folder contains no test cases.
- For the future maybe move towards browser library from seleniumlibrary.