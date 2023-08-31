const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(client, message, args) =>{

    let pollChannel = message.mentions.channels.first();
    let pollDescription = args.slice(1).join(' ');

    let foutembed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Je hebt hier geen permissies voor!');
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(foutembed)

    let fout2embed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Je moet een kanaal opgeven!');
    if(!args[0]) return message.reply(fout2embed)

    let fout3embed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Je moet een geldig kanaal opgeven!');
    if(!pollChannel) return message.reply(fout3embed)

    let fout4embed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Je bent vergeten een vraag op te geven!');
    if(!pollDescription) return message.reply(fout4embed)

    message.delete();

    let embedPoll =  new discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setTitle("Poll!")
    .setDescription(pollDescription)
    .setColor(botConfig.colors.normal)
   .setFooter(botConfig.bot.footer, client.user.displayAvatarURL())

     let msgEmbed = await pollChannel.send(embedPoll);
     await msgEmbed.react('👍')
     await msgEmbed.react('👎')

     let pollverzonden = new discord.MessageEmbed()
     .setColor(botConfig.colors.succes)
     .setDescription(`✅ Je poll is verzonden in ${pollChannel}!`);
     message.channel.send(pollverzonden);

          //Log bericht
          var logchannel = member.guild.channels.cache.get(botConfig.channels.logs);

          let logembed = new discord.MessageEmbed()
          .setColor(botConfig.colors.normal)
          .setTitle('Log bericht - `!poll`')
          .addField('Poll', `${pollDescription}`)
          .addField('Gestuurd naar', `${pollChannel}`)
          .addField('Gestuurd door', `${message.author.tag}`)
     .setFooter(botConfig.bot.footer, client.user.displayAvatarURL())
          logchannel.send(logembed);
}

module.exports.help = {
    name: "poll",
    description: "Maak een poll",
    category: "Admin"
}