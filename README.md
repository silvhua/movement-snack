# Project Title

Check out the live demo of this project [here](https://www.defytimefitness.com/).

Note: There is currently no option to sign up.

## Overview

The Movement Snack App is the Duolingo of strength training: You can get stronger in just 30 seconds a day, even if you are at work or wearing heels.

The gamification and structure of the Movement Snack App make it so easy so that even the most time-crunched professionals can keep their bodies strong.

### Problem

As people get older, they experience the effects of age and desk work on their bodies. People accept that this is a normal part of aging, which becomes a self-fulfilling prophecy. However, a true fountain of youth exists: exercise.

Everyone knows about the importance of exercise for health, yet very few people exercise at all, let alone strength train, which provides the best return on investment of all forms of exercise. Common reasons that prevent people from strength training include:
* Lack of time and motivation
* Misconceptions that you have to block off time for full workout and/or get sweaty in order for the exercise to "count".
* Not knowing where to start

Exercise, including muscle strengthening exercise, is not simply something to do for vanity, but essential for you to do what you want without feeling the effects of age and sedentary lifestyles. Not only does it get you stronger, but it can improve your coordination, flexibility, and cardiovascular health when done properly.


### User Profile

The Movement Snack App is targeted to people in the workforce who struggle to strength train consistently due to lack of time or motivation. The selection of exercises was curated to allow people to fit in exercise during their daily routine, whether it be at the workplace or while watching shows. There is no need to change into workout gear or block off extra time.

### Features

* Dashboard: This shows upcoming exercises and a button to start exercising. It also has an abbreviated version of their data visualization.
* Data visualization page: The user can see their exercise stats and activities at-a-glance. 
* Exercise log: Data-driven users can track their exercise over time.
* The user can filter exercises based on:
  * Level of discreetness: When the user is at work or in a Zoom meeting, they exercise discreetly if they choose.
  * Environment: The user can indicate whether they have access to things such as a couch, wall, desk, stairs, etc. that can be used for certain exercises.
  * Context: The user can filter for exercises that can be done while:
      * Watching TV
      * In limited space
      * While wearing high heels
      * While wearing boots
* Default exercise program: The user will be presented with an exercise so they don't have to decide what to do.
* Repeated exposure: The user gets to practice the same exercise over several weeks so they can make progress with it.
* Swap exercise: The user can swap to a different exercise if they don't prefer the one that is presented. The default exercises shown for swapping to are for the same movement category.
* Balanced movement diet: The user's movement repertoire includes all major movement categories: squat, hip hinge, lunge, push, pull, and core.
* Systematic and structured: Instead of doing random Youtube workouts, the user follows a program based on the expertise of a kinesiologist/exercise physiologist with 10 years of experiencing helping people move better and rehabilitate from injury.
* Current exercise streak: After logging each exercise, they will be shown their current streak. This is a gamification element to encourage users to be consistent.

## Implementation

### Tech Stack

Item | Function
--- | ---
Notion and Notion API | GUI content management software for no-code content updates with relational database features. Exercise data are added to the Notion app. Data are migrated from the Notion API to the server.
Node.js | Data migration pipeline.
Knex | Data migration to MySQL
MySQL | Structured database
Next.js and React | Server and Front end
Plotly | Data visualization
Figma | Mockups

### APIs

Item | Function
--- | ---
Notion | The content of the exercise library is managed in Notion because of it is a no-code relational database with a nice UI. Notion has a SKD to allow for programmatic data extraction. A pipeline has been created to easily update the SQL database from Notion.

### Sitemap

Page | Description | Notes
--- | --- | ---
`/` | Login page.
`/dashboard` | Shows upcoming exercises and an abbreviated version of their data visualization. | Each exercise has a icon indicating the level of discreetness of the exercise, ranging from 1 ("invisible") to 5 ("full-on workout mode"). Hovering over the number icon shows a tooltip describing the discreetness level.
`/training` | - View and log details for the current exercise. <br>- Allows for the option to swap the exercise for any other exercise. | - The form fields are optional for logging activity to minimize friction with exercising. <br>- Once the "Done" button is clicked, a confirmation modal shows their new streak.<br>- When the user clicks the "swap exercise" icon next to the page header, the default exercises that are shown are for the same movement category, but they can browse the entire exercise list.
`/stats` | Shows stats and data visualization on the user's consistency with exercise | The first figure is interactive and shows additional information upon hover. The default interaction is zoom, but the user can also pan or export the figure. The first figure is inspired by the green contributions plot found on each user's GitHub profile.

<img src="./documentation/dashboard-with-tooltip.PNG" width="350" alt="dashboard" />*Dashboard page

<img src="./documentation/filter-menu.PNG" width="350" alt="filter menu" />*Filter menu on the Dashboard page

<img src="./documentation/training-page-top.PNG" width="350" alt="training page top" />*Training page, top

<img src="./documentation/training-page-bottom.PNG" width="350" alt="training page bottom" />*Training page, bottom

<img src="./documentation/swap-exercise.PNG" width="350" alt="training page swap exercise menu" />*Swap exercise menu on the Training page

<img src="./documentation/activity-logged-confirmation.PNG" width="350" alt="activity logged confirmation" />*Confirmation after activity is logged on the training page

<img src="./documentation/stats-page.PNG" width="350" alt="stats page" />*Stats page

### Data

The tables in the database are grouped into:
1. Content data, i.e. related to exercises. The content for this app is in the `exercise` table.
2. User and activity data.

There are many-to-many relationships between some tables which are not explicitely listed in the table below but shown in the [entity relationship diagram](#entity-relationship-diagram).

Table | Group | What each record represents | Relations
--- | ---- | --- | ---
exercise | 1 | Properties of a single exercise. | Several
movement | 1 | A movement category into which exercises are classified, e.g. squat, push. | Relates to `exercise` via `exercise_movement`
context | 1 | A non-gym context in which a user can perform the exercise, e.g. while wearing high heels, watching TV | Relates to `exercise` via `exercise_context`
discreetness | 1 | The level of discreetness of a given exercise, ranging from "invisible" to "full workout-mode". | `id` -> `exercise.discreetness`
environment | 1 | The equipment or environment required for a given exercise, e.g. couch, wall | Relates to `exercise` via `exercise_environment`
focus | 1 | The focus of the exercise, e.g. strength, posture. | Relates to `exercise` table via the `exercise_focus` table.
modifier | 1 | A single way in which exercise execution can be modified, e.g. slow eccentric, add pause. This table is not utilized as this time but may be used for future releases. | Relates to `exercise` via `exercise_modifier`
muscle | 1 | A muscle group that may be trained by an exercise, e.g. glutes. | Relates to `exercise` via `exercise_muscle`
tip | 1 | An exercise tip | Relates to `exercise` via `exercise_tip`
video | 1 | A src for an exercise video |  `exercise.video_id` -> `id`
user | 2 | A user | `session` and `program` tables
session | 2 | The exercise sessions for a given user. | Foreign key: `user` -> `user.id`
activity | 2 | Data for a single set of a single exercise logged by a given user | Foreign keys: `exercise_id` -> `exercise.id`; `session_id` -> `session.id`
program | 2 | The current exercise program for a given user. Each program consists of 1 exercise per movement group. The exercise program value is stored as a JSON data type in case the exercise program algorithm or movement categories change in the future. | Foreign keys: `user` -> `user.id`

#### Entity relationship diagram
Below is the entity relationship diagram of the database:
<img src="./documentation/ERD.svg" alt="entity relationship diagram" width="1100" />*Entity relationship diagram

<details>
<summary>Click here to read about current API endpoints </summary>

#### Endpoints

Next.js allows client components to perform CRUD operations on the database in 2 main ways: via API endpoints or via server components. I am learning Next.js on my own as I build this project and learning about the differences between client and server components, so started by mostly creating API endpoints, then switched to mostly using server components. Below are the existing API endpoints, but several other CRUD operations exist in server components. The endpoints or their paths may be updated in the future during refactoring.

Route | Method | Description
--- | ---- | ---
`:query` | GET | Generate an exercise program with filters applied.
`/auth/:username` | GET | Verify a user's login credentials.
`/exercises/:id` | GET | Get the details for a specific exercise. 
`/exercises/:id/:property` | GET | Get an exercise property value contained in a related table
`/programs` | GET | Generate a new program for a user.
`/sessions` | POST | Post a new exercise session once a user initiates training.
`/sessions/:sessionId/activities` | POST | Post a new logged exercise activity.
`/users` | GET | Get a list of all users. May be used in the future if implementing a leaderboard feature.
`/users/programs` | POST, PUT, GET | Create, update, and retrieve a user's exercise program.
`/users/sessions` | GET | Get a list of all a user's exercise sessions. 
`/users/:userId/sessions` | GET| Read a user's exercise sessions. 
`/users/:userId/sessions/recent` | GET| Read a user's sessions for the past 7 days.

</details>


### Auth

The user will login with their username and password.

## Roadmap

### Planned features and pages

The project will be deployed for public use once there is a system for user sign up.

Page/feature | Description
--- | ---
Tablet/desktop layout | Currently, the app is optimized for mobile view. A more responsive layout will be implemented.
Set up page | Presented upon sign up. Includes a questionnaire.
Additional filtering options | See [Future Filtering options below](#future-filtering-options)
My exercises page | Shows the history of exercises completed by that user along with summary statistics
Exercise log | Shows the user’s training history in reverse chronological order. Includes all details for each activity. Includes filters for each exercise and movement category. 
Updated exercise program algorithm | The current algorithm is simple. The exercise properties include level of strength requirement `exercise.strength`, which may be used in future iterations. Once there is enough user activity data, the data may be analyzed and/or used for machine learning to improve user experience and adherence.
Program update prompts | If the user has done the same program for several weeks, they will be prompted to update their program.
Program saving | Allow the user to save multiple programs, e.g. one for home, one for at work, one focused on posture.
Secure authentication | Authenticate the user to protect user data.
Show modidifiers | Provide users tips on how to progress a given exercise. The relevant data are in the `modifier` table.

#### Future filtering options 

The database is already structured so that the user will be able to filter exercises based on:
* Level of discreetness: When the user is at work or in a Zoom meeting, they exercise discreetly if they choose.
* Environment: The user can indicate whether they have access to things such as a couch, wall, desk, stairs, etc. that can be used for certain exercises.
* Exercise history: The user can choose to only do familiar exercises or new exercises.
* Exertion: The user can filter by how much they want to exert themselves at that moment.

## Possible future directions

* Sign up: The user will complete a brief questionnaire to sign up for an account.
* Ability for the user to upload their own exercise
* Social features: View the activity of friends.
* Leaderboard: Shows the top performers for select metrics across all users.

## Acknowledgements

* [Kaitlyn Lam](https://kal128.wixsite.com/home): UI Design and mockups. 
* BrainStation Education team: Project mentorship.
  * Paula Brenner, teaching assistant
  * Jon Mazin, educator
  * Daniil Molodkov, educator
  * Roberta Nin Feliz, educator
  * Melanie Rawluk, teaching assistant
  * Tania Tun, teaching assistant
* BrainStation Education Experience team: Career support.