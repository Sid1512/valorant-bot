// API Fetch Module
const fetch = require('node-fetch')

// Discord Js Modules
const { MessageEmbed } = require('discord.js')

const region = ['ap', 'eu', 'na', 'kr']

async function matches (message, username, user, tag) {
  let check = -1
  let errorMessage
  for (const r of region) {
    await fetch('http://api.henrikdev.xyz/valorant/v3/matches/' + r + '/' + user + '/' + tag + '?size=10').then(res => {
      if (res.status === 200) {
        check++
        res.json().then(json => {
          let gamemodes = ''
          for (const game of json.data) {
            if (game.metadata.mode === 'Deathmatch') {
              gamemodes = gamemodes + (check + 1) + '. ' + game.metadata.mode + ' (Coming Soon)\n'
              check++
            } else {
              gamemodes = gamemodes + (check + 1) + '. ' + game.metadata.mode + ' | ' + game.metadata.map + '\n'
              check++
            }
          }
          const matches = new MessageEmbed()
            .setColor('#ffffff')
            .setTitle(username)
            .setAuthor('Val Bot', 'https://imgur.com/7av0vkX.png')
            .setFooter('Bot by CodeHacker#9133', 'https://imgur.com/7av0vkX.png')
            .addField('Last 10 Matches', gamemodes)
          message.reply({ embeds: [matches] })
        })
      } else {
        errorMessage = res.status
      }
    })
  }
  if (check < 0) {
    console.log(errorMessage)
    if (errorMessage === 409) {
      message.reply('The User has to many incoming Friend Invites, can not get puuid!')
    } else {
      message.reply('User not found!\nTry again if you feel there is an error!')
    }
  }
}
module.exports = {
  matches
}
