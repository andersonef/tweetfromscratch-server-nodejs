const tweets = []

module.exports = {
    all() {
        return tweets
    },

    create(tweet) {
        tweet.id = Date.now()
        tweet.date = new Date()
        tweet.parent_id = tweet.parent_id || null
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
    }
}