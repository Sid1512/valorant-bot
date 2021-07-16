const fetch = require('node-fetch')

const fs = require('fs')

const {
  MessageEmbed
} = require('discord.js')

let tiers = fs.readFileSync('data/tiers.json')
tiers = JSON.parse(tiers)

const season = ['e2a3', 'e2a2', 'e2a1', 'e1a3', 'e1a2', 'e1a1']
const seasonfull = ['Episode 2 Act 3', 'Episode 2 Act 2', 'Episode 2 Act 1', 'Episode 1 Act 3', 'Episode 1 Act 2', 'Episode 1 Act 1']
const region = ['ap', 'eu', 'na', 'kr']

async function stats (message, code, username, user, tag) {
  let check = -1
  for (const r of region) {
    await fetch('https://api.henrikdev.xyz/valorant/v2/mmr/' + r + '/' + user + '/' + tag + '?filter=').then(res => {
      if (res.status === 200) {
        res.json().then(json => {
          if (json.data.current_data.currenttier > 0) {
            check = 0
            let rankemo
            const playerData = json.data
            if (playerData.current_data.mmr_change_to_last_game < 0) {
              rankemo = tiers.tier[playerData.current_data.currenttier].rankdown + ' '
            } else {
              rankemo = tiers.tier[playerData.current_data.currenttier].rankup + ' +'
            }
            if (code === 'rank') {
              const rankEmbed = new MessageEmbed()
                .setColor('#' + tiers.tier[playerData.current_data.currenttier].color)
                .setTitle(username)
                .setAuthor('Val Bot', 'https://imgur.com/7av0vkX.png')
                .setThumbnail(tiers.tier[playerData.current_data.currenttier].smallIcon)
                .addField('Current Rank', tiers.tier[playerData.current_data.currenttier].tierName)
                .addField('MMR', playerData.current_data.ranking_in_tier + '/100', true)
                .addField('ELO', playerData.current_data.elo, true)
                .addField('Last Game MMR Change', rankemo + playerData.current_data.mmr_change_to_last_game, true)
                .setFooter('Bot by CodeHacker#9999', 'https://imgur.com/7av0vkX.png')
              message.channel.send(rankEmbed)
            } else {
              season.forEach(seas => {
                const index = season.indexOf(seas)
                if (!playerData.by_season[seas].error) {
                  const rank = playerData.by_season[seas].act_rank_wins[0].tier
                  const rankprevEmbed = new MessageEmbed()
                    .setColor('#' + tiers.tier[rank].color)
                    .setTitle(username)
                    .setAuthor('Val Bot', 'https://imgur.com/7av0vkX.png')
                    .setThumbnail(tiers.tier[rank].smallIcon)
                    .setDescription(seasonfull[index])
                    .addField('Wins', playerData.by_season[seas].wins)
                    .addField('Total Games', playerData.by_season[seas].number_of_games)
                    .addField('Rank before Act End', playerData.by_season[seas].final_rank_patched)
                    .addField('Act Rank', playerData.by_season[seas].act_rank_wins[0].patched_tier)
                  message.channel.send(rankprevEmbed)
                }
              })
            }
          }
        })
      }
    })
  }
  if (check !== 0) {
    message.channel.send('User not found!')
  }
}
module.exports = {
  stats
}
