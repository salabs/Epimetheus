***Settings***
Resource                ../../resources/resource.robot

***Variable***

${nav_id}=    'main-nav'

***Test Cases***

Test NavBar Links from index
  Current Page Is    url=${URL}
  Page contains id	id=${nav_id}
  Id contains	id=${nav_id}	1=Help	2=Team	3=GitHub

  Click Link	Team
  Current Page Is   url=${team_url}
  Element should be visible	${nav_id}
  Id contains	id=${nav_id}	1=Help	2=Team	3=GitHub

  Click Link	Help
  Current Page Is   url=${URL}
  Element should be visible	${nav_id}
  Id contains	id=${nav_id}	1=Help	2=Team	3=GitHub

#Test Navbar Links From Team Page


#Test Navbar Links From Series Page


#Test Navbar Links From History Page


