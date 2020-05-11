const token_list = []
const sha1 = require('sha1')
const EXPIRY_DAYS = 30

module.exports = {
    create(user_id) {
        const expiry = new Date()
        expiry.setDate(expiry.getDate() + EXPIRY_DAYS)
        
        const token = {
            access_token: this.generateHash(user_id),
            expiry_date: expiry
        }
        token_list.push(token)
        return token
    },

    generateHash(user_id) {
        return sha1(Date.now() + new String(user_id))
    }
}