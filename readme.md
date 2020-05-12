# The project

Tweet from scratch is a simple twiter-like system composed by two parts, one ReactJS client and one NodeJS server.

# Requirements
 - Node (12 or superior)
 - NPM or Yarn

# Installing and running

In order to install and run this API server, you need to do the following:
 - Clone this repository 
 - Install dependencies
 - Run src/app.js

You can do it by running the following command lines (I'm assuming you're a linux user, but on windows it must not be so different):

```bash
    $ git clone https://github.com/andersonef/tweetfromscratch-server-nodejs server
    $ cd server
    $ npm install
    $ node src/app.js
```

# Server APIs

## POST /register
**Description:** Creates and returns a new user

**Headers:** This endpoint does not require authorization.

**Body:**
```json
{
    “name”: “User name”,
    “email”: “email@example.com”,
    “password”: “userpassword”
}
```
**Response if success:** (status code 200)
```json
{
    “status”: “success”,
    “data”: {
        “id”: “<user-id>”,
        “name”: “User name”,
        “email”: “email@example.com”,
    }
}
```
**Response if fail:** (status code 422):

```json
{
    “status”: “error”,
    “message”: “This email is already used.”
}
```

## POST /auth
**Description:** Authenticates user using his email and password. 

**Headers:** This endpoint does not require authorization.

**Body:**

```json
{
	“email”: “email@example.com”,
	“password”: “<user password>”
}
```

**Response if success:** (status code 200):
```json
{
	“status”: “success”,
	“data”: {
		“access_token”: “<hash>”,
		“expiry_date”: “<expiry date>”
	}
}
```

**Response if fail:** (status code 422):

```json
{
	“status”: “error”,
	“message”: “Invalid credentials.”
}
```

## POST /new-tweet
**Description:** Creates a new tweet message

**Headers:** Authorization: Bearer <access_token>

**Body:**

```json
{
	“message”: “<tweet message>”
}
```

**Response if success:** (status code 200):

```json
{
	“status”: “success”,
	“data”: {
		“id”: “<twee id>”,
		“parent_id”: null,
		“message”: “<tweet message>”
	}
}
```

**Response if fail:** (status code 422):

```json
{
	“status”: “error”,
	“message”: “Maximum of 240 characters exceeded.”
}
```

## POST /follow/{user_id}

**Description:** Adds the user with id {user_id} on logged user’s followers list.

**Headers:** Authorization: Bearer <access_token>

**Body:** none

**Response if success:** (status code 200):

```json
{
	“status”: “success”,
	“data”: {
		“id”: “<connection-id.”,
		“following_date”: “<date>”,
		“following_user_id”: “<user-id>”,
		“follower_user_id”: “<authenticated-user-id>”
	}
}
```

**Response if fail:** (status code 422):

```json
{
	“status”: “error”,
	“message”: “You already follow this user.”
}
```

## DELETE /unfollow/{user_id}
**Description:** Removes the user with id {user_id} from logged user’s followers list.

**Headers:** Authorization: Bearer <access_token>

**Body:** none

**Response if success:** (status code 200): 

```json
{
	“status”: “success”,
	“data”: true
}
```

**Response if fail:** (status code 422):

```json
{
	“status”: “error”,
	“message”: “The requested user is not on your followers list.”
}
```

## POST /retweet/{tweet_id}

**Description:** Retweet the tweet with id {tweet_id} on logged user’s timeline.

**Headers:** Authorization: Bearer <access_token>

**Body:**

```json
{
	“message”: “<custom-message>”
}
```

**Response if success:** (status code 200):

```json
{
	“status”: “success”,
	“data”: {
		“id”: “<twee id>”,
		“parent_id”: “<tweet-id>”,
		“message”: “<tweet message>”
	}
}
```

**Response if fail:** (status code 422):

```json
{
	“status”: “error”,
	“message”: “The tweet id <tweet_id> does not exists.”
}
```
