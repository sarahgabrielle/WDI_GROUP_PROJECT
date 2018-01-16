# WDI GROUP PROJECT

For the third project, our instructors partnered us with other classmates to design and collaboratively build a MEAN stack app.

## Technical Requirements:

* Carefully plan wireframes as a team _before starting to code_
* Carefully plan Model schemas as a team _before starting to code_
* Manage team contributions and collaboration using a Git on Github
* Deploy application online so it's publicly accessible

#### Server-side

The app must:

* **Use Mongo, Node & Express** to build a server-side API
* **Your API must have at least 2 related models**, one of which should be a user
* Your API should include **all RESTFUL actions** for at least one of those models
* Include **authentication** to restrict access to appropriate users
* **Include at least one referenced or embedded sub-document**
* Include at least 10 tests.

#### Client-side

* **Use Angular** to build a front-end that consumes your API
* **Use SCSS instead of CSS**
* **Use Bower** to manage your client-side dependencies
* **Use Gulp & Babel** to convert your ES6 code to ES5
* **Use Gulp & Sass** to convert your SCSS code to CSS

## Necessary Deliverables:

* A **working API, built by the whole team**, hosted on Heroku
* A handmade Angular front-end **that consumes your own API**
* A **link to your hosted working app** in the URL section of your Github repo
* A **team git repository hosted on Github**, with a link to your hosted project, and frequent commits from _every_ team member dating back to the _very beginning_ of the project
* **Wireframes** – sketches of major views / interfaces of your application

### Name of App:

Happy Cabby

### App concept:

Happy Cabby is a transportation technology app developed as part of a group project at General Assembly. The app was conceived to help taxi drivers make more money and spend less time on the road. It combines data from multiple 3rd party APIs (Google and Eventful) to help drivers find high demand areas (based on events going on around them) thus enabling them to save time, petrol and earn more.

The app software requires the drivers to have access to the mobile website. It is smartphone and tablet responsive to enable user-friendly website navigation.

Link to app: [https://happy-cabby.herokuapp.com/]()

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

## Approach taken:

* Workflow. The first important hurdle to cross was the workflow implementation. When multiple people are working on a project with as many parts as this, it can be easy to lose track of what another person is doing. GitHub was used to host the repository and keep track of issues, pull requests and code reviews. We used another service, Trello to organise our tasks, by separating them into 'Backlog', 'In Progress', 'In Review' and 'Done' lists. This eased development headaches dramatically as it clearly structured the work we had done and the work that remained to be done.
* One to three manageable tasks were assigned per group member to work on during the day.
* In order to avoid merge conflicts, we ensured that each group member was working on a completely different part of the app.
* We had daily stand-ups to discuss what had been done, any errors encountered and what needed to be done for that specific day to keep on track.
* We pair programmed on various parts of the project when several of us wanted to work on a particular section or one or other of us got stuck.
* We designed the site mobile first, mocking up UI ideas until we settled on a design which worked well on both small and large screens. 
* We decided to use Bulma as our CSS library and used vanilla CSS3 to provide styling to components.
* We researched the APIs that we were going to use to establish how we could use it and what kind of data it provided.
* We used Mongoose as our database engine and used Insomnia to test all of our APIs. Finally, we used the Mocha and Chai frameworks for our TDD on the back end.
* We built the app with reusable components (services, directives, factories) which are injected into the required views.

APIs

Eventful. All event info is gathered from Eventful, an event finder website. We used the API to access data about events happening in the UK. Eventful allows users to search for events by time, location, performer as well as other criterias. We settled on Eventful as it provided the best data for what we wanted.  It also had relatively clear documentation and enabled us to search by various categories and order by popularity/number of attendees.

Google Map and Street View API - to provide the map and display all of the upcoming events. These markers were color coded based on the number of attendees going to the event giving the drivers an idea of popularity on the main map screen. Users could also narrow the search criteria by location, radius, and type of event.

## Unsolved problems/potential improvements:

Had we more time, we would have:
* Done more styling
* Added Google Directions, Google Maps Distance and Google Maps Geolocation API
* Done more TDD.

<img src="https://i.imgur.com/Wn8ByFm.png" width="400">
<img src="https://i.imgur.com/RueY9ie.png" width="400">
<img src="https://i.imgur.com/nKCPqs3.png" width="400">
<img src="https://i.imgur.com/1jQDRHt.png" width="400">
<img src="https://i.imgur.com/db0io4o.png" width="400">
