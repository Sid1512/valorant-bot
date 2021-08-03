const fetch = require('node-fetch')

const { Client, MessageEmbed } = require('discord.js')
const client = new Client({ partials: ['MESSAGE', 'REACTION'] })

const region = ['ap', 'eu', 'na', 'kr']

async function matches (message, username, user, tag) {
  let check = -1
  let errorMessage
  for (const r of region) {
    await fetch('http://api.henrikdev.xyz/valorant/v3/matches/' + r + '/' + user + '/' + tag).then(res => {
      if (res.status === 200) {
        check++
        res.json().then(json => {
          let gamemodes = ''
          for (const game of json.data) {
            if (game.metadata.mode === 'Deathmatch') {
              gamemodes = gamemodes + (check + 1) + '. ' + game.metadata.mode + ' (Coming Soon)\n'
              check++
            } else {
              gamemodes = gamemodes + (check + 1) + '. ' + game.metadata.mode + '\n'
              check++
            }
          }
          const matches = new MessageEmbed()
            .setColor('#ffffff')
            .setTitle(username)
            .setAuthor('Val Bot', 'https://imgur.com/7av0vkX.png')
            .setFooter('Bot by CodeHacker#9999', 'https://imgur.com/7av0vkX.png')
            .addField('Last 5 Matches', gamemodes)
          message.channel.send(matches)
          client.on('message', async (message) => {
            if (message.author.bot) return
            console.log(message.content + 'rreer')
          })
        })
      } else {
        errorMessage = res.status
      }
    })
  }
  console.log(check)
  if (check < 0) {
    console.log(errorMessage)
    if (errorMessage === 409) {
      message.channel.send('The User has to many incoming Friend Invites, can not get puuid!')
    } else {
      message.channel.send('User not found!')
    }
  }
}
module.exports = {
  matches
}
