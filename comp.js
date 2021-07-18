const fetch = require('node-fetch')

const fs = require('fs')

const {
  MessageEmbed
} = require('discord.js')

let tiers = fs.readFileSync('data/tiers.json')
tiers = JSON.parse(tiers)

const region = ['ap', 'eu', 'na', 'kr']

async function comp (message, username, user, tag) {
  const teamwin = [['Red', ''], ['Blue', '']]
  let check = -1
  for (const r of region) {
    await fetch('http://api.henrikdev.xyz/valorant/v3/matches/' + r + '/' + user + '/' + tag).then(res => {
      if (res.status === 200) {
        res.json().then(json => {
          for (const game of json.data) {
            if (game.metadata.mode === 'Competitive') {
              check = 0
              let setColor
              let playerAgentTeam
              if (game.teams.red.has_won) {
                setColor = '#ff0000'
                teamwin[0][1] = ' (Winner)'
              } else {
                setColor = '#0000ff'
                teamwin[1][1] = ' (Winner)'
              }
              for (const player of game.players.all_players) {
                if ((player.name + player.tag).toLowerCase() === (user + tag).toLowerCase()) {
                  playerAgentTeam = player.team + ' & ' + player.character
                  break
                }
              }
              const red = `${(game.players.red[0].character).padEnd(9) + ' ' + tiers.tier[game.players.red[0].currenttier].rankIcon}
              ${(game.players.red[1].character).padEnd(9) + ' ' + tiers.tier[game.players.red[1].currenttier].rankIcon}
              ${(game.players.red[2].character).padEnd(9) + ' ' + tiers.tier[game.players.red[2].currenttier].rankIcon}
              ${(game.players.red[3].character).padEnd(9) + ' ' + tiers.tier[game.players.red[3].currenttier].rankIcon}
              ${(game.players.red[4].character).padEnd(9) + ' ' + tiers.tier[game.players.red[4].currenttier].rankIcon}`
              const blue = `${(game.players.blue[0].character).padEnd(9) + ' ' + tiers.tier[game.players.blue[0].currenttier].rankIcon}
              ${(game.players.blue[1].character).padEnd(9) + ' ' + tiers.tier[game.players.blue[1].currenttier].rankIcon}
              ${(game.players.blue[2].character).padEnd(9) + ' ' + tiers.tier[game.players.blue[2].currenttier].rankIcon}
              ${(game.players.blue[3].character).padEnd(9) + ' ' + tiers.tier[game.players.blue[3].currenttier].rankIcon}
              ${(game.players.blue[4].character).padEnd(9) + ' ' + tiers.tier[game.players.blue[4].currenttier].rankIcon}`
              const sb =
              `╔══════════════════╦════════╦══════════════════╦════════╗
║${('Red Team' + teamwin[0][1]).padEnd(18)}║${('K/D/A').padEnd(8)}║${('Blue Team' + teamwin[1][1]).padEnd(18)}║${('K/D/A').padEnd(8)}║
╠══════════════════╬════════╬══════════════════╬════════╣
║${(game.players.red[0].name + '#' + game.players.red[0].tag).padEnd(18)}║${(game.players.red[0].stats.kills + '/' + game.players.red[0].stats.deaths + '/' + game.players.red[0].stats.assists).padEnd(8)}║${(game.players.blue[0].name + '#' + game.players.blue[0].tag).padEnd(18)}║${(game.players.blue[0].stats.kills + '/' + game.players.blue[0].stats.deaths + '/' + game.players.blue[0].stats.assists).padEnd(8)}║
║${(game.players.red[1].name + '#' + game.players.red[1].tag).padEnd(18)}║${(game.players.red[1].stats.kills + '/' + game.players.red[1].stats.deaths + '/' + game.players.red[1].stats.assists).padEnd(8)}║${(game.players.blue[1].name + '#' + game.players.blue[1].tag).padEnd(18)}║${(game.players.blue[1].stats.kills + '/' + game.players.blue[1].stats.deaths + '/' + game.players.blue[1].stats.assists).padEnd(8)}║
║${(game.players.red[2].name + '#' + game.players.red[2].tag).padEnd(18)}║${(game.players.red[2].stats.kills + '/' + game.players.red[2].stats.deaths + '/' + game.players.red[2].stats.assists).padEnd(8)}║${(game.players.blue[2].name + '#' + game.players.blue[2].tag).padEnd(18)}║${(game.players.blue[2].stats.kills + '/' + game.players.blue[2].stats.deaths + '/' + game.players.blue[2].stats.assists).padEnd(8)}║
║${(game.players.red[3].name + '#' + game.players.red[3].tag).padEnd(18)}║${(game.players.red[3].stats.kills + '/' + game.players.red[3].stats.deaths + '/' + game.players.red[3].stats.assists).padEnd(8)}║${(game.players.blue[3].name + '#' + game.players.blue[3].tag).padEnd(18)}║${(game.players.blue[3].stats.kills + '/' + game.players.blue[3].stats.deaths + '/' + game.players.blue[3].stats.assists).padEnd(8)}║
║${(game.players.red[4].name + '#' + game.players.red[4].tag).padEnd(18)}║${(game.players.red[4].stats.kills + '/' + game.players.red[4].stats.deaths + '/' + game.players.red[4].stats.assists).padEnd(8)}║${(game.players.blue[4].name + '#' + game.players.blue[4].tag).padEnd(18)}║${(game.players.blue[4].stats.kills + '/' + game.players.blue[4].stats.deaths + '/' + game.players.blue[4].stats.assists).padEnd(8)}║
╚══════════════════╩════════╩══════════════════╩════════╝`
              // message.channel.send(rr)
              const compgameEmbed = new MessageEmbed()
                .setColor(setColor)
                .setTitle(username)
                .setAuthor('Val Bot', 'https://imgur.com/7av0vkX.png')
                .setFooter('Bot by CodeHacker#9999', 'https://imgur.com/7av0vkX.png')
                .addField('Map', game.metadata.map, true)
                .addField('Played on', game.metadata.game_start_patched + ' (GMT)', true)
                .addField('Team & Agent', playerAgentTeam, true)
                .addField('Red Team', red, true)
                .addField('Blue Team', blue, true)
                .addField('ScoreBoard [' + game.teams.red.rounds_won + '-' + game.teams.blue.rounds_won + ']', '```' + sb + '```')
              message.channel.send(compgameEmbed)
              return
            }
          }
        })
      }
    })
  }
  if (check !== 0) {
    message.channel.send('No competitve game found / User not found!\nIf you think there is error try again!\nFor some accounts details wont be visible. (Working on it)')
  }
}
module.exports = {
  comp
}
