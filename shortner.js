const { async } = require('hasha');
const hasha = require('hasha');
const database = require('./database');

module.exports = {
    shorten: (url) => {
        let hash = hasha(url, {encoding:"base64", algorithm:"md5"});
        hash = hash.slice(0, 6).replace(/\//g, '_').replace(/\+/g, '-');

        return database.create(url, hash)
    },

    expand: (shortcode) => {
        return database.getURL(shortcode)
    },

    find: (url) => {
        return database.getShortCode(url)
    }
}