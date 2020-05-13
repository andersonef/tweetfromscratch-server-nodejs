# The project

Tweet from scratch is a simple twiter-like system composed by two parts, one ReactJS client and one NodeJS server.

# Requirements
 - Node (12 or superior)
 - NPM or Yarn

# Details

 - NodeJS without any framework (just http, fs, sha1 and colors libraries)
 - In memory storage (you can easily change it by changing the repositories implementation)

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
    $ npm run dev
```

# Insomnia JSON

You can test each endpoint of this project by using the Insomnia app. Just import the <a href="https://github.com/andersonef/tweetfromscratch-client-react/blob/master/insomnia_api_documentation.json"> **insomnia_api_documentation.json** </a> into your insomnia app.
There are some endpoints I've created to test the application you can see at insomnia.
Inside insomnia there's a directory called "Protected". All endpoints inside this directory needs an authorization, so when test them, be sure to use a valid access token. You can obtain a valid access token by consuming **/auth** endpoint.

# React Client

There's a client for this server you can clone here: <a href="https://github.com/andersonef/tweetfromscratch-client-react"> https://github.com/andersonef/tweetfromscratch-client-react</a>

# Server APIs

## POST /register
**Description:** Creates and returns a new user

**Headers:** This endpoint does not require authorization.

**Body:**
```json
{
    "name": "User name",
    "email": "email@example.com",
    "password": "userpassword"
}
```
**Response if success:** (status code 200)
```json
{
    "status": "success",
    "data": {
        "id": "<user-id>",
        "name": "User name",
        "email": "email@example.com",
    }
}
```
**Response if fail:** (status code 422):

```json
{
    "status": "error",
    "message": "This email is already used."
}
```

## POST /auth
**Description:** Authenticates user using his email and password. 

**Headers:** This endpoint does not require authorization.

**Body:**

```json
{
	"email": "email@example.com",
	"password": "<user password>"
}
```

**Response if success:** (status code 200):
```json
{
	"status": "success",
	"data": {
		"access_token": "<hash>",
		"expiry_date": "<expiry date>"
	}
}
```

**Response if fail:** (status code 422):

```json
{
	"status": "error",
	"message": "Invalid credentials."
}
```

## POST /new-tweet
**Description:** Creates a new tweet message

**Headers:** Authorization: Bearer <access_token>

**Body:**

```json
{
	"message": "<tweet message>"
}
```

**Response if success:** (status code 200):

```json
{
	"status": "success",
	"data": {
		"id": "<twee id>",
		"parent_id": null,
		"message": "<tweet message>"
	}
}
```

**Response if fail:** (status code 422):

```json
{
	"status": "error",
	"message": "Maximum of 240 characters exceeded."
}
```

## POST /follow/{user_id}

**Description:** Adds the user with id {user_id} on logged user’s followers list.

**Headers:** Authorization: Bearer <access_token>

**Body:** none

**Response if success:** (status code 200):

```json
{
	"status": "success",
	"data": {
		"id": 1589297711965,
		"follower_user": {
		"name": "<follower user name>",
		"email": "<follower user email>",
		"id": 1589297704376
		},
		"following_user": {
		"id": 1,
		"name": "<following user name>",
		"email": "<following user email>",
		},
		"following_date": "<following date>"
	}
}
```

**Response if fail:** (status code 422):

```json
{
	"status": "error",
	"message": "You already follow this user."
}
```

## DELETE /unfollow/{user_id}
**Description:** Removes the user with id {user_id} from logged user’s followers list.

**Headers:** Authorization: Bearer <access_token>

**Body:** none

**Response if success:** (status code 200): 

```json
{
	"status": "success",
	"data": true
}
```

**Response if fail:** (status code 422):

```json
{
	"status": "error",
	"message": "The requested user is not on your followers list."
}
```

## POST /retweet/{tweet_id}

**Description:** Retweet the tweet with id {tweet_id} on logged user’s timeline.

**Headers:** Authorization: Bearer <access_token>

**Body:**

```json
{
	"message": "<custom-message>"
}
```

**Response if success:** (status code 200):

```json
{
	"status": "success",
	"data": {
		"id": "<twee id>",
		"parent_id": "<tweet-id>",
		"message": "<tweet message>"
	}
}
```

**Response if fail:** (status code 422):

```json
{
	"status": "error",
	"message": "The tweet id <tweet_id> does not exists."
}
```

## GET /me

**Description**: Retrieve information about the access token owner

**Response if success:** (status code 200)

```json
{
  "status": "success",
  "data": {
    "name": "<user name>",
    "email": "<user email>",
    "id": 1589383807228
  }
}
```

**Response if fail:** (status code 422)

```json
{
  "status": "error",
  "message": "Invalid access token"
}
```

## GET /timeline

**Description:** Returns a list of tweets the "logged user" can see. It includes his own tweets and tweets from users he follows.

**Response if success:** (status code 200)

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "date": "2020-05-13T15:22:56.325Z",
      "parent_id": null,
      "user": {
        "id": 1,
        "name": "Anderson",
        "email": "t@t.com",
      },
      "user_id": 1,
      "message": "This is a hardcoded tweet. Every new user should see it on their timeline, because everyone here borns following me!"
    }
  ]
}
```

**Response if fail:** (status code 422)

```json
{
  "status": "error",
  "message": "Invalid access token"
}
```
