module.exports = {
    uri: '/',
    method: 'GET',
    controller(request) {
        return {
            'author': 'Anderson N. Silva',
            'github': 'https://github.com/andersonef',
            'documentation': 'https://github.com/andersonef/tweetfromscratch-server-nodejs'
        }
    }
}