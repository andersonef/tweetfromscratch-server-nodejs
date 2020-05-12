const connections = []

module.exports = {
    getFollowers(user_id) {
        return connections.filter((connection) => {
            return (connection.following_user.id == user_id)
        })
    },

    getFollowing(user_id) {
        return connections.filter((connection) => {
            return (connection.follower_user.id == user_id)
        })
    },

    create(follower, following) {
        // 1. This follower is not a new follower
        const existent = this
            .getFollowers(following.id)
            .find((ifollower) => {
                return (ifollower.id == follower.id)
            })
        if (existent) {
            throw new Error('You already follow this user')
        }
        const connection = {
            id: Date.now(),
            follower_user: follower,
            following_user: following,
            following_date: new Date()
        }
        connections.push(connection)
        return connection
    }
}