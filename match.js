const fetch = require('node-fetch')

const fs = require('fs')

const {
  MessageEmbed
} = require('discord.js')

let tiers = fs.readFileSync('data/tiers.json')
tiers = JSON.parse(tiers)

const region = ['ap', 'eu', 'na', 'kr']

async function match (message, username, user, tag, matchno) {
  const teamwin = ['', '']
  let check = -1
  let errorMessage
  for (const r of region) {
    await fetch('http://api.henrikdev.xyz/valorant/v3/matches/' + r + '/' + user + '/' + tag).then(res => {
      if (res.status === 200) {
        check++
        res.json().then(json => {
          for (const game of json.data) {
            if (check === matchno - 1) {
              if (game.metadata.mode !== 'Competitive' && game.metadata.mode !== 'Deathmatch') {
                if (game.metadata.rounds_played === 1) {
                  message.channel.send('Custom Deathmatch data feature will come soon!')
                  break
                }
                let setColor
                let playerAgentTeam
                if (game.teams.red.has_won) {
                  setColor = '#ff0000'
                  teamwin[0] = ' (Winner)'
                } else {
                  setColor = '#0000ff'
                  teamwin[1] = ' (Winner)'
                }
                for (const player of game.players.all_players) {
                  if (decodeURI((player.name + player.tag).toLowerCase()) === decodeURI((user + tag).toLowerCase())) {
                    playerAgentTeam = player.team + ' & ' + player.character
                    break
                  }
                }
                const red = `${game.players.red[0].name + '#' + game.players.red[0].tag + ' **[' + game.players.red[0].character + ']**'}
              ${game.players.red[1].name + '#' + game.players.red[1].tag + ' **[' + game.players.red[1].character + ']**'}
              ${game.players.red[2].name + '#' + game.players.red[2].tag + ' **[' + game.players.red[2].character + ']**'}
              ${game.players.red[3].name + '#' + game.players.red[3].tag + ' **[' + game.players.red[3].character + ']**'}
              ${game.players.red[4].name + '#' + game.players.red[4].tag + ' **[' + game.players.red[4].character + ']**'}`
                const blue = `${game.players.blue[0].name + '#' + game.players.blue[0].tag + ' **[' + game.players.blue[0].character + ']**'}
              ${game.players.blue[1].name + '#' + game.players.blue[1].tag + ' **[' + game.players.blue[1].character + ']**'}
              ${game.players.blue[2].name + '#' + game.players.blue[2].tag + ' **[' + game.players.blue[2].character + ']**'}
              ${game.players.blue[3].name + '#' + game.players.blue[3].tag + ' **[' + game.players.blue[3].character + ']**'}
              ${game.players.blue[4].name + '#' + game.players.blue[4].tag + ' **[' + game.players.blue[4].character + ']**'}`
                const sb =
              `╔═══════════╦══════════╦═══════════╦══════════╗
║ ${('Red Team').padEnd(9)} ║ ${('K/D/A').padEnd(8)} ║ ${('Blue Team').padEnd(9)} ║ ${('K/D/A').padEnd(8)} ║
╠═══════════╬══════════╬═══════════╬══════════╣
║ ${(game.players.red[0].character).padEnd(9)} ║ ${(game.players.red[0].stats.kills + '/' + game.players.red[0].stats.deaths + '/' + game.players.red[0].stats.assists).padEnd(8)} ║ ${(game.players.blue[0].character).padEnd(9)} ║ ${(game.players.blue[0].stats.kills + '/' + game.players.blue[0].stats.deaths + '/' + game.players.blue[0].stats.assists).padEnd(8)} ║
║ ${(game.players.red[1].character).padEnd(9)} ║ ${(game.players.red[1].stats.kills + '/' + game.players.red[1].stats.deaths + '/' + game.players.red[1].stats.assists).padEnd(8)} ║ ${(game.players.blue[1].character).padEnd(9)} ║ ${(game.players.blue[1].stats.kills + '/' + game.players.blue[1].stats.deaths + '/' + game.players.blue[1].stats.assists).padEnd(8)} ║
║ ${(game.players.red[2].character).padEnd(9)} ║ ${(game.players.red[2].stats.kills + '/' + game.players.red[2].stats.deaths + '/' + game.players.red[2].stats.assists).padEnd(8)} ║ ${(game.players.blue[2].character).padEnd(9)} ║ ${(game.players.blue[2].stats.kills + '/' + game.players.blue[2].stats.deaths + '/' + game.players.blue[2].stats.assists).padEnd(8)} ║
║ ${(game.players.red[3].character).padEnd(9)} ║ ${(game.players.red[3].stats.kills + '/' + game.players.red[3].stats.deaths + '/' + game.players.red[3].stats.assists).padEnd(8)} ║ ${(game.players.blue[3].character).padEnd(9)} ║ ${(game.players.blue[3].stats.kills + '/' + game.players.blue[3].stats.deaths + '/' + game.players.blue[3].stats.assists).padEnd(8)} ║
║ ${(game.players.red[4].character).padEnd(9)} ║ ${(game.players.red[4].stats.kills + '/' + game.players.red[4].stats.deaths + '/' + game.players.red[4].stats.assists).padEnd(8)} ║ ${(game.players.blue[4].character).padEnd(9)} ║ ${(game.players.blue[4].stats.kills + '/' + game.players.blue[4].stats.deaths + '/' + game.players.blue[4].stats.assists).padEnd(8)} ║
╚═══════════╩══════════╩═══════════╩══════════╝`
              // message.channel.send(rr)
                const compgameEmbed = new MessageEmbed()
                  .setColor(setColor)
                  .setTitle(username)
                  .setAuthor('Val Bot', 'https://imgur.com/7av0vkX.png')
                  .setFooter('Bot by CodeHacker#9999', 'https://imgur.com/7av0vkX.png')
                  .addField('Map', game.metadata.map, true)
                  .addField('Played on', game.metadata.game_start_patched + ' (EST/EDT)', true)
                  .addField('Team & Agent', playerAgentTeam, true)
                  .addField('Red Team' + teamwin[0], red, true)
                  .addField('Blue Team' + teamwin[1], blue, true)
                  .addField('ScoreBoard [' + game.teams.red.rounds_won + '-' + game.teams.blue.rounds_won + ']', '```' + sb + '```')
                message.channel.send(compgameEmbed)
                return
              } else if (game.metadata.mode === 'Competitive') {
                let setColor
                let playerAgentTeam
                if (game.teams.red.has_won) {
                  setColor = '#ff0000'
                  teamwin[0] = ' (Winner)'
                } else {
                  setColor = '#0000ff'
                  teamwin[1] = ' (Winner)'
                }
                for (const player of game.players.all_players) {
                  if (decodeURI((player.name + player.tag).toLowerCase()) === decodeURI((user + tag).toLowerCase())) {
                    playerAgentTeam = player.team + ' & ' + player.character
                    break
                  }
                }
                const red = `${tiers.tier[game.players.red[0].currenttier].rankIcon + ' ' + game.players.red[0].name + '#' + game.players.red[0].tag + ' **[' + game.players.red[0].character + ']**'}
              ${tiers.tier[game.players.red[1].currenttier].rankIcon + ' ' + game.players.red[1].name + '#' + game.players.red[1].tag + ' **[' + game.players.red[1].character + ']**'}
              ${tiers.tier[game.players.red[2].currenttier].rankIcon + ' ' + game.players.red[2].name + '#' + game.players.red[2].tag + ' **[' + game.players.red[2].character + ']**'}
              ${tiers.tier[game.players.red[3].currenttier].rankIcon + ' ' + game.players.red[3].name + '#' + game.players.red[3].tag + ' **[' + game.players.red[3].character + ']**'}
              ${tiers.tier[game.players.red[4].currenttier].rankIcon + ' ' + game.players.red[4].name + '#' + game.players.red[4].tag + ' **[' + game.players.red[4].character + ']**'}`
                const blue = `${tiers.tier[game.players.blue[0].currenttier].rankIcon + ' ' + game.players.blue[0].name + '#' + game.players.blue[0].tag + ' **[' + game.players.blue[0].character + ']**'}
              ${tiers.tier[game.players.blue[1].currenttier].rankIcon + ' ' + game.players.blue[1].name + '#' + game.players.blue[1].tag + ' **[' + game.players.blue[1].character + ']**'}
              ${tiers.tier[game.players.blue[2].currenttier].rankIcon + ' ' + game.players.blue[2].name + '#' + game.players.blue[2].tag + ' **[' + game.players.blue[2].character + ']**'}
              ${tiers.tier[game.players.blue[3].currenttier].rankIcon + ' ' + game.players.blue[3].name + '#' + game.players.blue[3].tag + ' **[' + game.players.blue[3].character + ']**'}
              ${tiers.tier[game.players.blue[4].currenttier].rankIcon + ' ' + game.players.blue[4].name + '#' + game.players.blue[4].tag + ' **[' + game.players.blue[4].character + ']**'}`
                const sb =
              `╔═══════════╦══════════╦═══════════╦══════════╗
║ ${('Red Team').padEnd(9)} ║ ${('K/D/A').padEnd(8)} ║ ${('Blue Team').padEnd(9)} ║ ${('K/D/A').padEnd(8)} ║
╠═══════════╬══════════╬═══════════╬══════════╣
║ ${(game.players.red[0].character).padEnd(9)} ║ ${(game.players.red[0].stats.kills + '/' + game.players.red[0].stats.deaths + '/' + game.players.red[0].stats.assists).padEnd(8)} ║ ${(game.players.blue[0].character).padEnd(9)} ║ ${(game.players.blue[0].stats.kills + '/' + game.players.blue[0].stats.deaths + '/' + game.players.blue[0].stats.assists).padEnd(8)} ║
║ ${(game.players.red[1].character).padEnd(9)} ║ ${(game.players.red[1].stats.kills + '/' + game.players.red[1].stats.deaths + '/' + game.players.red[1].stats.assists).padEnd(8)} ║ ${(game.players.blue[1].character).padEnd(9)} ║ ${(game.players.blue[1].stats.kills + '/' + game.players.blue[1].stats.deaths + '/' + game.players.blue[1].stats.assists).padEnd(8)} ║
║ ${(game.players.red[2].character).padEnd(9)} ║ ${(game.players.red[2].stats.kills + '/' + game.players.red[2].stats.deaths + '/' + game.players.red[2].stats.assists).padEnd(8)} ║ ${(game.players.blue[2].character).padEnd(9)} ║ ${(game.players.blue[2].stats.kills + '/' + game.players.blue[2].stats.deaths + '/' + game.players.blue[2].stats.assists).padEnd(8)} ║
║ ${(game.players.red[3].character).padEnd(9)} ║ ${(game.players.red[3].stats.kills + '/' + game.players.red[3].stats.deaths + '/' + game.players.red[3].stats.assists).padEnd(8)} ║ ${(game.players.blue[3].character).padEnd(9)} ║ ${(game.players.blue[3].stats.kills + '/' + game.players.blue[3].stats.deaths + '/' + game.players.blue[3].stats.assists).padEnd(8)} ║
║ ${(game.players.red[4].character).padEnd(9)} ║ ${(game.players.red[4].stats.kills + '/' + game.players.red[4].stats.deaths + '/' + game.players.red[4].stats.assists).padEnd(8)} ║ ${(game.players.blue[4].character).padEnd(9)} ║ ${(game.players.blue[4].stats.kills + '/' + game.players.blue[4].stats.deaths + '/' + game.players.blue[4].stats.assists).padEnd(8)} ║
╚═══════════╩══════════╩═══════════╩══════════╝`
              // message.channel.send(rr)
                const compgameEmbed = new MessageEmbed()
                  .setColor(setColor)
                  .setTitle(username)
                  .setAuthor('Val Bot', 'https://imgur.com/7av0vkX.png')
                  .setFooter('Bot by CodeHacker#9999', 'https://imgur.com/7av0vkX.png')
                  .addField('Map', game.metadata.map, true)
                  .addField('Played on', game.metadata.game_start_patched + ' (EST/EDT)', true)
                  .addField('Team & Agent', playerAgentTeam, true)
                  .addField('Red Team' + teamwin[0], red, true)
                  .addField('Blue Team' + teamwin[1], blue, true)
                  .addField('ScoreBoard [' + game.teams.red.rounds_won + '-' + game.teams.blue.rounds_won + ']', '```' + sb + '```')
                message.channel.send(compgameEmbed)
                return
              } else {
                message.channel.send('Deathmatch data feature will come soon!')
              }
            }
            check++
          }
        })
      } else {
        errorMessage = res.status
      }
    })
  }
  if (check < 0) {
    console.log(errorMessage)
    if (errorMessage === 409) {
      message.channel.send('The User has to many incoming Friend Invites, can not get puuid!')
    } else {
      message.channel.send('User not found!\nTry again if you feel there is an error!')
    }
  }
}
module.exports = {
  match
}
