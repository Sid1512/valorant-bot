// Config
require('dotenv').config()

// Files
const rank = require('./rank.js')
// const ranks = require('./ranks.js')
const agent = require('./agents.js')
const { matches } = require('./matches')
const { match } = require('./match.js')

// PREFIX
const PREFIX = '?'

// Discord Js Modules
const { Client, Intents, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], artials: ['MESSAGE', 'REACTION'] })

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in`)
  client.user.setActivity(`in ${client.guilds.cache.size} Servers | ?help`, { type: 'PLAYING' })
})

client.on('messageCreate', async (message) => {
  let msg
  if (message.author.bot) return
  console.log(`[${message.author.tag}]: ${message.content}`)
  if (message.content.startsWith(PREFIX)) {
    const text = message.content.substring(PREFIX.length)
    let code = text.substring(0, text.length)
    let matchno
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === ' ') {
        msg = text.substring(i + 1, text.length)
        code = text.substring(0, i)
        break
      }
    }
    if (code === 'match1' || code === 'match2' || code === 'match3' || code === 'match4' || code === 'match5' || code === 'match6' || code === 'match7' || code === 'match8' || code === 'match9' || code === 'match10') {
      matchno = code.substring((code.length - 1), code.length)
      code = code.substring(0, (code.length - 1))
    }
    switch (code) {
      case 'help': {
        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle('LINK')
            .setLabel('Github')
            .setURL('https://github.com/Sid1512/valorant-bot'),
          new MessageButton()
            .setStyle('LINK')
            .setLabel('Invite Link')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=856456488372535316&permissions=330752&scope=bot')
        )
        const helpEmbed = new MessageEmbed()
          .setColor('#ffffff')
          .setAuthor('Val Bot', 'https://imgur.com/7av0vkX.png')
          .addField('\u200B\nCurrently Supported Commands', '** **')
          .addField('?rank', 'Shows your current act rank data.\nFormat: ?rank Username#Tag\nExample: ?rank CodeHacker#noob')
          .addField('?rankprev', 'Shows your rank data for all the previous episodes.\nFormat: ?rankprev Username#Tag')
          .addField('?matches', 'Show list of last 10 games.\nFormat: ?matches Username#Tag\n')
          .addField('?match', 'Show information of your desired game.\nFormat: ?match1-10 Username#Tag\n')
          .addField('?agents', 'Show list of agents.')
          .addField('?agent', 'Show agent information.\nFormat: ?agent number')
          .addField('\u200B\nSupport me by', 'Recommend it to others using the invite link! :heart:\nStar my project on github and follow me! :star: :heart:')
          .setFooter('Bot by CodeHacker#9133', 'https://imgur.com/7av0vkX.png')
        message.reply({ embeds: [helpEmbed], components: [row] })
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
      case 'matches': {
        const username = msg
        const [user, tag] = encodeURI(username).split('#')
        console.log(user, tag)
        console.log(msg)
        matches(message, username, user, tag)
        // matches(client, message, username, user, tag)
        break
      }
      case 'match': {
        const username = msg
        const [user, tag] = encodeURI(username).split('#')
        console.log(user, tag)
        console.log(msg)
        match(message, username, user, tag, matchno)
        break
      }
      case 'agents': {
        const agentsEmbed = new MessageEmbed()
          .setColor('#ffffff')
          .setAuthor('Val Bot', 'https://imgur.com/7av0vkX.png')
          .addField('Agent List', '1. Astra <:astra:864480515763339274>\n2. Breach <:breach:864480515711959051>\n3. Brimstone <:brimstone:864480515397779456>\n4. Chamber <:chamber:939226377608134706>\n5. Cypher <:cypher:864480515864002610>\n6. Jett <:jett:864480515699638293>\n7. KAY/O <:kayo:864480516271243285>\n8. Killjoy <:killjoy:864480515594780692>\n9. Neon <:neon:939226377406799912>\n10. Omen <:omen:864480516018143282>\n11. Phoenix <:phoenix:864480515015704606>\n12. Raze <:raze:864480516644274207>\n13. Reyna <:reyna:864480515780378644>\n14. Sage <:sage:864480516069261332>\n15. Skye <:skye:864480516719640596>\n16. Sova <:sova:864480515707895858>\n17. Viper <:viper:864480515809738773>\n18. Yoru <:yoru:864480515175743509>')
        message.reply({ embeds: [agentsEmbed] })
        break
      }
      case 'agent': {
        const number = msg
        if (number > 0 && number < 17) {
          agent.info(message, number - 1)
        } else {
          message.reply('Enter valid agent number!')
        }
        break
      }
    }
  }
})
client.login(process.env.DISCORDJS_BOT_TOKEN)
