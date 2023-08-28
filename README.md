
# DRIVEHIVE

A virtual space for Formula One fans to show off their favorite driver and add their own.

# User Stories
As a logged in user, I want to see all drivers, to pick a favorite.
As a logged in user, I want to navigate to each driver profile, to see information on them.
As a logged in user, I want to choose any driver as a favorite.
As a logged in user, I want to navigate to the favorites tab to see my selected driver.
As a logged in user, I want to navigate to the home page, and be able to log out.
As a logged in user, I want to add edit or delete my comments on my favorite drivers profile.
As a logged in user, I want to add my own driver to the database.
As a logged out user, I want to be able to sign in.

# Screenshot

![image](https://github.com/JordonM/Unit2Project/assets/14878928/3f1025be-43ef-4567-b494-f19cbf2fd86f)
![image](https://github.com/JordonM/Unit2Project/assets/14878928/8e5a4f8b-0db0-4a71-bbf6-713beefe5da4)
![image](https://github.com/JordonM/Unit2Project/assets/14878928/075008f9-82ce-4394-b042-de4657192008)
![image](https://github.com/JordonM/Unit2Project/assets/14878928/ce96e893-5bab-44fb-83d6-e6ba33082ab7)
![image](https://github.com/JordonM/Unit2Project/assets/14878928/738bb4c7-f2a8-4556-b041-3114985f1bcd)


# Technologies Used

- JavaScript
- HTML
- CSS
- CardStarter CSS Library

# Getting Started

![image](https://github.com/JordonM/Unit2Project/assets/14878928/f4c01417-f942-4850-88c4-67e7b4587ef4)


# Routing 
|HTTP<br>Method|URL<br>Endpoint|Controller<br>Action|Purpose|
|---|---|---|---|
| GET | /drivers | driversCtrl.index | View all the F1 drivers picked by the logged in user |
| GET | /drivers/all | driversCtrl.allDrivers | All public can see all drivers) |
| GET | /drivers/:id | driversCtrl.show | View the details of a specific driver |
| GET | /drivers/new | driversCtrl.new | Create your on driver
| POST | /drivers | driversCtrl.create | New driver submitted |
| GET | /drivers/:id/edit | driversCtrl.edit | View editing a driver |
| PUT | /drivers/:id| driversCtrl.update | Handle the edit driver form being submitted (restrict to user who submitted a driver) |
| DELETE | /drivers/:id| driversCtrl.delete | Delete a driver (restrict to user who submitted the driver) |


#### Comments

|HTTP<br>Method|URL<br>Endpoint|Controller<br>Action|Purpose|
|---|---|---|---|
| n/a | n/a | index action | View all the comments for a driver - no route needed since comments are embedded and displayed with the driver |
| n/a | n/a | show action | Viewing a single comment does not make sense |
| n/a | n/a | new action | The form to add a new comment should be displayed on the drivers profile |
| POST | /drivers/:id/comments | commentsCtrl.create | Handle the new comment form being submitted |
| GET | /comments/:id/edit | commentsCtrl.edit | View a form for editing a comment (restrict to user who submitted the comment) |
| PUT | /comments/:id| commentsCtrl.update | Handle the edit comment form being submitted (restrict to user who submitted the comment) |
| DELETE | /comments/:id| commentsCtrl.delete | Delete a comment (restrict to user who submitted the comment) |


# Next Steps

- Add the Formula One API by Ergast
- http://ergast.com/mrd/
- Add the option to see rank driver


