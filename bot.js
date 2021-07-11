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
    if (code === 'help') {
      const helpEmbed = new MessageEmbed()
        .setColor('#ffffff')
        .setAuthor('Valorant Bot', 'https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/d/d9/Logo_square.png/revision/latest?cb=20200404214157')
        .addField('\u200B\nCurrently Supported Commands', '** **')
        .addField('?rank', 'Shows your current act rank data.\nFormat: ?rank Username#Tag\nExample: ?rank CodeHacker#noob')
        // .addField('$mmr', 'Shows your current act rank data.\nAvailable regions: eu, ap, na, kr\nFormat: $mmr !region !Username!Tag\nExample: $mmr !ap !CodeHacker!noob')
        .addField('?rankprev', 'Shows your rank data for all the previous episodes.\nFormat: Just change ?rank to ?rankprev')
        .addField('?agents', 'Show list of agents.')
        .addField('?agent', 'Show agent information.\nFormat: ?agent number')
        .addField('\u200B\nGithub', 'https://github.com/Sid1512/valorant-bot\nIf you like the bot pls star it and follow me! :heart:')
        .addField('\u200B\nInvite Link', 'https://discord.com/api/oauth2/authorize?client_id=856456488372535316&permissions=330752&scope=bot')
      message.channel.send(helpEmbed)
    }
    if (code === 'rank' || code === 'rankprev') {
      const username = msg
      const [user, tag] = encodeURI(username).split('#')
      console.log(user, tag)
      console.log(msg)
      rank.stats(message, code, username, user, tag)
    }
    if (code === 'agents') {
      const agentsEmbed = new MessageEmbed()
        .setColor('#ffffff')
        .setAuthor('Valorant Bot', 'https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/d/d9/Logo_square.png/revision/latest?cb=20200404214157')
        .addField('Agent List', '1. Astra\n2. Breach\n3. Brimstone\n4. Cypher\n5. Jett\n6. KAYO\n7. Killjoy\n8. Omen\n9. Phoenix\n10. Raze\n11. Reyna\n12. Sage\n13. Skye\n14. Sova\n15. Viper\n16. Yoru')
      message.channel.send(agentsEmbed)
    }
    if (code === 'agent') {
      const number = msg
      if (number > 0 && number < 17) {
        agent.info(message, number - 1)
      } else {
        message.channel.send('Enter valid agent number!')
      }
    }
  }
})
client.login(process.env.DISCORDJS_BOT_TOKEN)
