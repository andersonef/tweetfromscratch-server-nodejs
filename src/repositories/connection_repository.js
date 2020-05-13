const connections = []

module.exports = {

    all() {
        return connections
    },
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
        // 1. Avoiding duplicate connections
        const existent = this
            .all()
            .find((connection) => {
                return (connection.follower_user.id == follower.id && connection.following_user.id == following.id)
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
    },

    delete(follower_id, following_id) {
        connections.forEach((connection, index) => {
            if (connection.follower_user.id == follower_id && connection.following_user.id == following_id) {
                connections.splice(index, 1)
            }
        })
        return true
    }
}