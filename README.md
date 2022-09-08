# Project 2: Blogging Platform

## Description 

This app is a fully functional blogging platform that has a rich user experience and encourages user interaction.


[A version of the deployed website can be viewed here.]()

## Contents
1. [About](#about)
      * [User Story](#user%20story)
      * [Acceptance Criteria](#acceptance%20criteria)
      * [Visuals](#visuals)
      * [Technologies](#technologies)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [Authors and Acknowledgements](#authors%20and%20acknowledgements)

## About

Building upon a previous assignment, we set out to enrich the UI as well as add features users would expect from a blogging website- friending other users, tagging their posts for other users to find specific content, creating profiles and upvoting posts to boost their popularity. Through collaboration and clear breakdowns in task assignments, we were able to put together a blogging platform that closely follows what is available on the market today. 

## User Story

```
AS a subject matter expert

I WANT a blogging platform

SO THAT I can publish articles, curate followers, follow others with similar interests, collaborate on ideas, and find content relevant to me

```

## Acceptance Criteria 

```
GIVEN a CMS-style blog site

WHEN I visit the site for the first time

THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in

WHEN I click on the homepage option

THEN I am taken to the homepage

WHEN I click on any other links in the navigation

THEN I am prompted to either sign up or sign in

WHEN I choose to sign up

THEN I am prompted to create a username and password

WHEN I click on the sign-up button

THEN my user credentials are saved and I am logged into the site

WHEN I revisit the site at a later time and choose to sign in

THEN I am prompted to enter my username and password

WHEN I am signed in to the site

THEN I see navigation links for the homepage, the dashboard, recommended pages, my profile page and the option to log out

WHEN I click on the homepage option in the navigation

THEN I am taken to the homepage and presented with existing blog posts that include the post title, number of comments and upvotes, and the date created

WHEN I click on an existing blog post

THEN I am presented with the post title, contents, post tags, post creator’s username, and date created for that post and have the option to leave a comment or an upvote

WHEN I enter a comment and click on the submit button while signed in

THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

WHEN I click the upvote button

THEN the upvote is saved to the particular post

WHEN I click on the link to the recommended posts

THEN I am taken to a list of posts sorted in descending order by number of upvotes

WHEN I click on the dashboard option in the navigation

THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

WHEN I click on the button to add a new blog post

THEN I am prompted to enter both a title and contents for my blog post

WHEN I am done entering my title and contents for my blog post

THEN I can choose different post tags to help identify the content of my post

WHEN I click on the button to create a new blog post

THEN the title, contents and any chosen tags of my post are saved and I am taken back to an updated dashboard with my new blog post

WHEN I click on one of my existing posts in the dashboard

THEN I am able to delete or update my post and taken back to an updated dashboard

WHEN I click on update profile in my dashboard

THEN I can update my profile picture or biography

WHEN I update my profile picture or biography

THEN both are saved for myself or other users to view

WHEN I click on another user's name

THEN I can view their profile picture, biography and created blog posts

WHEN I click on the logout option in the navigation

THEN I am signed out of the site

WHEN I am idle on the site for more than a set time

THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```

## Visuals: 

![project-2-screenshot](https://user-images.githubusercontent.com/103372188/189008075-fb632f8a-d993-4ac9-83f9-cc69569b8e00.png)
![profile-screenshot](https://user-images.githubusercontent.com/103372188/189008088-ad6b7118-4771-4a58-b25c-0a1bf9532e9b.png)
![dashboard-screenshot](https://user-images.githubusercontent.com/103372188/189008093-8ff04812-4cb7-4144-98f7-e821cf747ba7.png)


## Technologies

* [Node.js](https://nodejs.org/en/)
* [MySQL2](https://www.npmjs.com/package/mysql2)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Express Session](https://www.npmjs.com/package/express-session)
* [Connect Session Sequelize](https://www.npmjs.com/package/connect-session-sequelize)
* [Express Handlebars](https://www.npmjs.com/package/express-handlebars)
* [Lodash](https://www.npmjs.com/package/lodash)


## Installation 

Please run the following dependencies to install the application: 

`
npm i
`

## Usage 

* clone repo and instal dependencies
In the command line: 

* ``mysql -u root -p`` and enter the mysql root user password 
* Add the database with ``source db/schema.sql``
* ``exit`` to exit MYSQL
*  ``npm run seed`` to seed the database. 
* To start the server and the application, run ``npm start``

## Contributing 

After submitting a pull request, the changes will be reviewed by a member of the team and if approved, merged with the code database. 

## Authors and Acknowledgements

Built by: 
[Jaron Hadley](https://github.com/jaronhadley)
[Harrison Small](https://github.com/HankSml)
[Codey Gallup](https://github.com/Codeyg12)
[Erin Voelker](https://github.com/ekellv)
[Taha Chaudry](https://github.com/tahachaudhry)

