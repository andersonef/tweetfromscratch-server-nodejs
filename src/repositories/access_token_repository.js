const token_list = [
    {
        id: 1,
        user_id: 1,
        access_token: 'cachorro',
        expiry_date: new Date(2021,5,5)
    }
]
const sha1 = require('sha1')
const EXPIRY_DAYS = 30

module.exports = {
    create(user_id) {
        const expiry = new Date()
        expiry.setDate(expiry.getDate() + EXPIRY_DAYS)
        
        const token = {
            access_token: this.generateHash(user_id),
            user_id,
            expiry_date: expiry
        }
        token_list.push(token)
        return token
    },

    generateHash(user_id) {
        return sha1(Date.now() + new String(user_id))
    },

    validate(hash) {
        const now = new Date()
        const token = token_list.find((itoken) => {
            return (itoken.access_token === hash && itoken.expiry_date > now)
        })
        if (!token) {
            throw new Error('Invalid access token')
        }
        return token
    }
}