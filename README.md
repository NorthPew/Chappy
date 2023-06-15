This is not the completed version of the **readme**
# 👋 Welcome to Chappy!
## Introduction
*Chappy* is a school project that was made with love and possible by **Norfe**.
This project is a fullstack application using *JavaScript*, some *HTML* and *CSS*.
Believe it!

It has charms of famous chat platforms such as *Discord* and *Guilded*, when it comes to design and layout. 
The creator of this project could have made a simpler GUI, but wanted to challange himself.
The project could have been made with only backend and do all requests using *Insomnia*, but it works both sides!
To spice things up, this project has authorization with the help of *JWT*.

With this project can you send messages to group channels and to other users who are in the database.
If the creator has time, it will also be possible to add new groups and new group channels. *Time will tell...*
*Maybe it will be a challange over summer or in the near future...*

### Frontend
It has been built upon *React*, *Vite*, *React router dom* and *Styled components*.
To pass props in the project structure, *Context* has been used.
The frontend resembles much like Discord with it's look and feel.
*I hope Discord doesn't mind me using their design as inspiration* 😅

You can find all the frontend packages at [npm](https://www.npmjs.com/) ❤️
### Backend
The backend side of the project is nearly a *RESTful API* that uses *lowDB*, *CORS*, *JSON Web Tokens*, *Express* and some *Node*.
More of backend down the line.

You can find all the backend packages at [npm](https://www.npmjs.com/) ❤️
## Where to start 
You  can start messing around with this project locally or live!
### Locally 💻
To try out this project you will need a terminal and git installed.
 - [ ] Please start your favorite terminal and copy this line: `git clone https://github.com/NorthPew/Chappy.git`
 - [ ] After that type in this command in terminal: `npm install -y`
 - [ ] Then type: `npm run dev`
 - [ ] Open a new terminal and type: `node server.js`
 - [ ] Open up your favorite web browser and use this link: `http://localhost:5173/`
 - [ ] Ready to rock this world! 🎸
### Live
## Endpoints
To try out the endpoints, please use *Insomnia*.
To understand the body row, look closely at data modeling.
### api/user
`id` is the id of an user. 
| Method | URL           | Params | Headers       | Body               | Response                                                      |
|--------|---------------|--------|---------------|--------------------|---------------------------------------------------------------|
| GET    | authorization | .      | authorization | .                  | Sends a message that the user has been authorized              |
| GET    | /             | .      | .             | .                  | Gets all the possible users                                   |
| POST   | /             | .      | .             | username, password | Gets the newly created user                                   |
| POST   | /login        | .      | .             | username, password | Sends back status, token, username and user id                |
| PUT    | /:id          | id     | .             | username, password | Sends back a new username for an user                         |
| Delete | /:id          | id     | .             | .                  | Sends back a list with all users but excluded the deleted one |
### api/group
| Method | URL | Response                                      |
|-------|-----|-----------------------------------------------|
| GET   | /   | Sends back a list of groups with its channels |
### api/message
`route` can be a group name such as *chappy* or *dm*.
`channel` is a form of a number such as 1, 2 and 3.
`id` is the id of a message.

| Method | URL                  | Params             | Body                        | Response                                                               |
|--------|----------------------|--------------------|-----------------------------|------------------------------------------------------------------------|
| GET    | /:route/:channel     | route, channel     | .                           | Sends back a list of all the messages in that group channel or DM chat |
| POST   | /:route/:channel     | route, channel     | content, time, date, sender | Sends back a message as an object                                      |
| PUT    | /:route/:channel/:id | route, channel, id | content, time, date, sender | Sends back the edited message with same id                             |
| DELETE | /:route/:channel/:id | route, channel, id | .                           | Shows all messages except the deleted one                              |



## Data modeling
### User

| Property | Data type | Short description                  |
|----------|-----------|------------------------------------|
| username | String    | Username for the user              |
| password | String    | Password for the user              |
| id       | Number    | Unique number to identify the user |
### Group
| Property | Data type | Short description                                                    |
|----------|-----------|----------------------------------------------------------------------|
| id       | Number    | Unique number to identify a group                                    |
| name     | String    | The group's name and uses to redirect a user to a specific group     |
| title    | String    | The title of a group                                                 |
| icon     | String    | Uses Google's Material Icons to display an icon for a specific group |
| channels | Array| It is used to redirect a user to a specific channel in a group       |
### Channel
| Property | Data type | Short description                                                                  |
|----------|-----------|------------------------------------------------------------------------------------|
| id       | Number    | Unique number to identify a channel and tells where the message will post its self |
| title    | String    | The channel's title                                                                |
| public   | Boolean   | Tells if the channel is public for non logged in users or not                      |
### Message 
#### (Messages => Groups => Channels => Channel ID *or* Messages => DMS => User ID)
| Property | Data type | Short description                              |
|----------|-----------|------------------------------------------------|
| id       | Number    | Unique number to identify a message            |
| time     | String    | It tells when the message was sent             |
| date     | String    | It tells what date the message was sent        |
| sender   | Array     | It tells who the sender was and it's unique id |
| edited   | Boolean   | It tells if the message has been edited or not |

Thank you for reading this readme! ❤️
