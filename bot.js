require('dotenv').config()
const rank = require('./rank.js')
const agent = require('./agents.js')
const { Client, MessageEmbed } = require('discord.js')
const client = new Client({ partials: ['MESSAGE', 'REACTION'] })
const PREFIX = '?'

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in`)
  client.user.setActivity('type ?help to use me', { type: 'PLAYING' })
})

client.on('message', async (message) => {
  let msg
  if (message.author.bot) return
  console.log(`[${message.author.tag}]: ${message.content}`)
  if (message.content.startsWith(PREFIX)) {
    const text = message.content.substring(PREFIX.length)
    let code = text.substring(0, text.length)
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === ' ') {
        msg = text.substring(i + 1, text.length)
        code = text.substring(0, i)
        break
      }
    }
    switch (code) {
      case 'help': {
        const helpEmbed = new MessageEmbed()
          .setColor('#ffffff')
          .setAuthor('Val Bot', 'https://imgur.com/7av0vkX.png')
          .addField('\u200B\nCurrently Supported Commands', '** **')
          .addField('?rank', 'Shows your current act rank data.\nFormat: ?rank Username#Tag\nExample: ?rank CodeHacker#noob')
          // .addField('$mmr', 'Shows your current act rank data.\nAvailable regions: eu, ap, na, kr\nFormat: $mmr !region !Username!Tag\nExample: $mmr !ap !CodeHacker!noob')
          .addField('?rankprev', 'Shows your rank data for all the previous episodes.\nFormat: ?rankprev Username#Tag')
          .addField('?agents', 'Show list of agents.')
          .addField('?agent', 'Show agent information.\nFormat: ?agent number')
          .addField('\u200B\nGithub', 'https://github.com/Sid1512/valorant-bot\nIf you like the bot pls star it and follow me! :heart:')
          .addField('\u200B\nInvite Link', 'https://discord.com/api/oauth2/authorize?client_id=856456488372535316&permissions=330752&scope=bot')
          .setFooter('Bot by CodeHacker#9999', 'https://imgur.com/7av0vkX.png')
        message.channel.send(helpEmbed)
        break
      }
      case 'rank': {
        const username = msg
        const [user, tag] = encodeURI(username).split('#')
        console.log(user, tag)
        console.log(msg)
        rank.stats(message, code, username, user, tag)
        break
      }
      case 'rankprev': {
        const username = msg
        const [user, tag] = encodeURI(username).split('#')
        console.log(user, tag)
        console.log(msg)
        rank.stats(message, code, username, user, tag)
        break
      }
      case 'agents': {
        const agentsEmbed = new MessageEmbed()
          .setColor('#ffffff')
          .setAuthor('Val Bot', 'https://imgur.com/7av0vkX.png')
          .addField('Agent List', '1. Astra <:astra:864480515763339274>\n2. Breach <:breach:864480515711959051>\n3. Brimstone <:brimstone:864480515397779456>\n4. Cypher <:cypher:864480515864002610>\n5. Jett <:jett:864480515699638293>\n6. KAY/O <:kayo:864480516271243285>\n7. Killjoy <:killjoy:864480515594780692>\n8. Omen <:omen:864480516018143282>\n9. Phoenix <:phoenix:864480515015704606>\n10. Raze <:raze:864480516644274207>\n11. Reyna <:reyna:864480515780378644>\n12. Sage <:sage:864480516069261332>\n13. Skye <:skye:864480516719640596>\n14. Sova <:sova:864480515707895858>\n15. Viper <:viper:864480515809738773>\n16. Yoru <:yoru:864480515175743509>')
        message.channel.send(agentsEmbed)
        break
      }
      case 'agent': {
        const number = msg
        if (number > 0 && number < 17) {
          agent.info(message, number - 1)
        } else {
          message.channel.send('Enter valid agent number!')
        }
        break
      }
    }
  }
})
client.login(process.env.DISCORDJS_BOT_TOKEN)
