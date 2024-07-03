# Project Title

## Overview

The Movement Snack App is the Duolingo of strength training: You can get stronger in just 30 seconds a day, even if you are at work or wearing heels.

The gamification and structure of the Movement Snack App make it so easy so that even the most time-crunched professionals can keep their bodies strong.

### Problem

As people get older, they experience the effects of age and desk work on their bodies. People accept that this is a normal part of aging, which becomes a self-fulfilling prophecy. However, a true fountain of youth exists: exercise.

Everyone knows about the importance of exercise for healthy, yet very few people exercise at all, let alone strength train, which improves the most aspects of fitness. Common reasons that prevent people from strength training include:
* Lack of time and motivation
* Misconceptions that you have to block off time for full workout and/or get sweaty in order for the exercise to "count".
* Not knowing where to start

Exercise, including muscle strengthening exercise, is not simply something to do for vanity, but essential for you to do what you want without feeling the effects of age and sedentary lifestyles. Not only does it get you stronger, but it can improve your coordination, flexibility, and cardiovascular health when done properly.


### User Profile

The Movement Snack App is targeted to people in the workforce who struggle to strength train consistently due to lack of time or motivation. The selection of exercises was curated to allow people to fit in exercise during their daily routine, whether it be at the workplace or while watching shows. There is no need to change into workout gear or block off extra time.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

* Dashboard: This will show upcoming exercises and link to other pages. It will also have an abbreviated version of their data visualization.
* Data visualization page: The user can see their exercise stats and activities at-a-glance. 
* Exercise log: Data-driven users can track their exercise over time.
* Contextual filters: The user can apply filters on what types of exercises they will be shown based on:
  * Level of discreetness: When the user is at work or in a Zoom meeting, they exercise discreetly if they choose.
  * Environment: The user can indicate whether they have access to things such as a couch, wall, desk, stairs, etc. that can be used for certain exercises.
  * Condition: The user can filter for exercises that can be done while:
      * Watching TV
      * In limited space
      * While wearing high heels
      * While wearing boots
* Default exercise: The user will be presented with an exercise so they don't have to decide what to do.
* Repeated exposure: The user will be given several opportunities to practice the same exercise over several weeks so they can make progress with it.
* Balanced movement diet: The user's movement repertoire will include all major movement categories: squat, hip hinge, lunge, push, pull, and core.
* Systematic and structured: Instead of doing random youtube workouts, the user will follow a routine based on the expertise of a kinesiologist and exercise physiologist with 10 years of experiencing helping people move better and rehabilitate from injury.
* Swap exercises: The user will be able to swap to a difference exercise if they don't prefer the one that is presented.
* My exercises: The user can see the list of exercises they have previously done and choose from that list.
* Current exercise streak: After logging each exercise, they will be shown their current streak. This is a gamification element to encourage users to be consistent.

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

Item | Function
--- | ---
Knex, MySQL | Structured database
Next.js | Server and React framework
React | Front end
Plotly | Data visualization

### APIs

Item | Function
--- | ---
Notion | The content of the exercise library is managed in Notion because of it is a no-code relational database with a nice UI. Notion has a SKD to allow for programmatic data extraction. A pipeline has been created to easily update the SQL database from Notion.

### Sitemap

Page | Description
--- | ---
Set up page | Presented upon sign up. Includes a questionnaire.
Dashboard | Show upcoming exercises and an abbreviated version of their data visualization.
Training page | View and log details for the current exercise. 
My exercises | Shows the history of exercises completed by that user along with summary statistics
Exercise log | Shows the user’s training history in reverse chronological order. Includes all details for each activity. Includes filters for each exercise and movement category. 

### Mockups

Better mockups to come. Below are examples of similar apps:

<img src="./documentation/sample-dashboard.PNG" width="40%" alt="sample dashboard" />
<img src="./documentation/sample-training-page.PNG" width="40%" alt=sample training page />

### Data
Below is the entity relationship diagram of the database:
<img src="./documentation/ERD.svg" alt="entity relationship diagram" />

### Endpoints

Route | Method | Description
--- | ---- | ---
`/exercises:id` | GET | Get the details for a specific exercise.
`/movements/:id/exercises` | GET | Get all exercises for a given movement category. The request body will include values for applying filters.
`/movement` | GET | Get all movement categories.
`/users/sessions` | GET | Get a list of all a user's exercise sessions.
`/users/sessions` | POST, PUT | Log and update a user's exercise sessions.
`/users/activities` | POST, PUT | Log and update a user's activity.

### Auth

The user will login with their username and password. 

## Roadmap

Here is the roadmap of the project. Backend and front end tasks will be performed concurrently to facilitate testing throughout the project.

<img src="./documentation/roadmap-2024-07-02 162707.png" alt="project roadmap">

## Nice-to-haves

* Sign up: The user will complete a brief questionnaire to sign up for an account.
* Secure authentication
* Ability for the user to upload their own exercise
* Social features: View the activity of friends.
* Leaderboard: Shows the top performers for select metrics across all users.