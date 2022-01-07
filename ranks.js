// API Fetch Module
// const fetch = require('node-fetch')
const request = require('request')

async function stats (message, code, username, user, tag) {
  await request('https://api.henrikdev.xyz/valorant/v2/mmr/' + 'ap' + '/' + user + '/' + tag + '?filter=', { json: true }, (err, res, body) => {
    if (err) { return console.log(err) }
    console.log(body)
  })
}
module.exports = {
  stats
}
