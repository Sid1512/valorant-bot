const fs = require('fs')

const { MessageEmbed } = require('discord.js')

let agents = fs.readFileSync('data/agents.json')
agents = JSON.parse(agents)

function info (message, number) {
  const agentEmbed = new MessageEmbed()
    .setColor('#ffffff')
    .setAuthor('Valorant Bot', 'https://static.wikia.nocookie.net/valorant_esports_gamepedia_en/images/d/d9/Logo_square.png/revision/latest?cb=20200404214157')
    .setTitle(agents.agent[number].name)
    .setThumbnail(agents.agent[number].avatar)
    .setDescription(agents.agent[number].bio)
    .addField('\u200B\nRole', agents.agent[number].role, true)
    .addField('\u200B\nOrigin', agents.agent[number].origin, true)
    .addField('\u200B\nGender', agents.agent[number].gender, true)
    .addField('API_Name', agents.agent[number].api_name, true)
    .addField('\u200B\n**Abilities**', '** **')
    .addField(agents.agent[number].abilities[0].displayName, agents.agent[number].abilities[0].description)
    .addField(agents.agent[number].abilities[1].displayName, agents.agent[number].abilities[1].description)
    .addField(agents.agent[number].abilities[2].displayName, agents.agent[number].abilities[2].description)
    .addField(agents.agent[number].abilities[3].displayName, agents.agent[number].abilities[3].description)
  // const agentPhotoEmbed = new MessageEmbed()
  //     .setColor('#ffffff')
  //     .setImage(agents.agent[number].fullPortrait);
  message.channel.send(agentEmbed)
  // message.channel.send(agentPhotoEmbed);
}

module.exports = { info }
