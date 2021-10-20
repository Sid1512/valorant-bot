// API Fetch Module
const fetch = require('node-fetch')

// Files
const { match } = require('./match.js')

// Discord Js Modules
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

const region = ['ap', 'eu', 'na', 'kr']

async function matches (client, message, username, user, tag) {
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
          const row = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId('match1')
              .setStyle('SUCCESS')
              .setLabel('Match 1'),
            new MessageButton()
              .setCustomId('match2')
              .setStyle('SUCCESS')
              .setLabel('Match 2'),
            new MessageButton()
              .setCustomId('match3')
              .setStyle('SUCCESS')
              .setLabel('Match 3'),
            new MessageButton()
              .setCustomId('match4')
              .setStyle('SUCCESS')
              .setLabel('Match 4'),
            new MessageButton()
              .setCustomId('match5')
              .setStyle('SUCCESS')
              .setLabel('Match 5')
          )
          const matches = new MessageEmbed()
            .setColor('#ffffff')
            .setTitle(username)
            .setAuthor('Val Bot', 'https://imgur.com/7av0vkX.png')
            .setFooter('Bot by CodeHacker#9133', 'https://imgur.com/7av0vkX.png')
            .addField('Last 5 Matches', gamemodes)
          message.reply({ embeds: [matches], components: [row] })
          client.on('interactionCreate', async (interaction) => {
            if (interaction.isButton()) {
              const matchno = interaction.customId
              switch (matchno) {
                case 'match1': {
                  interaction.update({ content: 'Match 1 Details', embeds: [], components: [] })
                  match(message, username, user, tag, 1)
                  break
                }
                case 'match2': {
                  interaction.update({ content: 'Match 2 Details', embeds: [], components: [] })
                  match(message, username, user, tag, 2)
                  break
                }
                case 'match3': {
                  interaction.update({ content: 'Match 3 Details', embeds: [], components: [] })
                  match(message, username, user, tag, 3)
                  break
                }
                case 'match4': {
                  interaction.update({ content: 'Match 4 Details', embeds: [], components: [] })
                  match(message, username, user, tag, 4)
                  break
                }
                case 'match5': {
                  interaction.update({ content: 'Match 5 Details', embeds: [], components: [] })
                  match(message, username, user, tag, 5)
                  break
                }
                default: {
                  interaction.update({ content: 'Try Again', embeds: [], components: [] })
                  break
                }
              }
            }
          })
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
module.exports = { matches }
