const user_repository = require('./user_repository')

const tweets = [{
    id: 1,
    date: new Date(),
    parent_id: null,
    user: user_repository.find(1),
    user_id: 1,
    message: 'This is a hardcoded tweet. Every new user should see it on their timeline, because everyone here borns following me!'
}]

module.exports = {
    all() {
        return tweets
    },

    create(tweet) {
        tweet.id = Date.now()
        tweet.date = new Date()
        tweet.parent_id = tweet.parent_id || null
        tweet.user = user_repository.find(tweet.user_id)
        tweets.push(tweet)
        return tweet
    },

    find(tweet_id) {
        return tweets.find((tweet) => {
            return (tweet.id == tweet_id)
        })
    },

    findRetwited(tweet_id, user_id) {
        return tweets.find((tweet) => {
            return (tweet.parent_id == tweet_id && tweet.user_id == user_id)
        })
    },

    fromUsers(user_ids) {
        return tweets.filter((tweet) => {
            return (user_ids.indexOf(tweet.user_id) > -1)
        })
    }
}