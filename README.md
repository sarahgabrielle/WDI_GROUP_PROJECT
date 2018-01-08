![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)
# GA WDI 30 PROJECT 3 - HAPPY CABBY

The third project on our WDI course was a group project, our instructors partnered us with other classmates to work as a team, implementing our new found knowledge of Angular to create a MEAN stack app.

After brainstorming together we came up with Happy Cabby, an app to help taxi drivers make more money and spend less time on the road. It combines data from 3rd party APIs (Google and Eventful) to help drivers find high demand areas (based on events going on around them) thus enabling them to save time, petrol and earn more.

Link to app: [https://happycabby-jonny.herokuapp.com/](https://happycabby-jonny.herokuapp.com/)

## Technologies used:

* HTML
* JWT
* Bluebird
* NodeJS
* ExpressJS
* Express-jwt
* Mongoose
* Mocha & Chai
* AngularJS
* Bulma
* SCSS

## Learnings:

The most important thing for us to learn during this project was to work as a team. It was the first time we had worked on a full project with other people so managing the workflow was a new area for us all.

We did this using the following process:

- We used a trello board to map out all the tasks/elements needed at the beginning
- We then would take on one taks per person at a time so everyone knew clearly what each other was working on.
- To avoid merge conflicts we assigned different jobs each day that worked on different areas of the code to avoid conflicts as best we could.
- We had regular stand-ups to discuss what had been done, any errors encountered and what needed to be done for that specific day to keep on track.  


Other key ways we approached the project:

- We pair programmed on various parts of the project when several of us wanted to work on a particular section or one or other of us got stuck.

- As the site is primarily designed to be used by taxi drivers we designed the site mobile first, mocking up UI ideas until we settled on a design which worked well on both small and large screens. 

- We had used CSS frameworks before but none of us had used Bulma so we decided to use something new for all of us, to learn a new framework.

 

APIs

Using Insomina we tested several APIs for gathering the event data eventually settling on Eventful as it provided the best data for what we wanted.  It also had relatively clear documentation and enabled us to search by various categories and order by popularity/number of attendees. 

We used Google Maps as well as it's Street View API to provide the map and display all of the upcoming events. The markers were color coded based on the number of attendees to the event giving the drivers an idea of popularity on the main map screen.

We also used Google's Geocoding API to give us the Lat and Lang from whatever the usere typed into the location field in the search form.

#### Additional features I would like to add in the future would be:

- Added in the Google Geolocation feature to auto locate the user rather than them having to type into the form when running a search.
- Used the Google Directions API to give the drivers directions from their current location to their chosen event.



