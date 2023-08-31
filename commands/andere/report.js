const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(Client, message, args) =>{
    
    message.delete();

    const report = args.join(" ").slice(0);;

    const foutembed1 = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(":x: Je bent vergeten een bug/speler op te geven!")
    if (!report) return message.channel.send(foutembed1);

    const foutembed2 = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(":x: Ik heb hier geen permissies voor! Geef me de permissie: `MOVE_MEMBERS`")
    if (!message.guild.me.hasPermission("MOVE_MEMBERS")) return message.channel.send(foutembed2);

    var reportChannel = message.member.guild.channels.cache.get("932697196585947236");

    const foutembed3 = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(":x: Ik heb de report channel niet kunnen vinden!")
    if(!reportChannel) return message.channel.send(foutembed3)


    const embedReport = new discord.MessageEmbed()
        .setTitle(`${message.author.username} heeft een report ingestuurd!`)
        .setColor(botConfig.colors.normal)
        .addField("Report:", report)
        .setThumbnail(message.author.displayAvatarURL())
     .setFooter(botConfig.bot.footer, client.user.displayAvatarURL())
    message.channel.send(reportChannel);
        
    
    const embedReportverstuurd = new discord.MessageEmbed()
        .setTitle(`${message.author.username} heeft een report ingestuurd!`)
        .setColor(botConfig.colors.succes)
        .setDescription("✅ Je report is verzonden! Bedankt voor het melden van een bug/speler wij zullen het probleem z.s.m aanpakken.")
    message.channel.send(embedReportverstuurd);

    let msgEmbed = await reportChannel.send(embedReport);
    await msgEmbed.react('✅')
    await msgEmbed.react('❌')

         //Log bericht
         var logchannel = member.guild.channels.cache.get(botConfig.channels.logs);

         let logembed = new discord.MessageEmbed()
         .setColor(botConfig.colors.normal)
         .setTitle('Log bericht - `!report`')
         .addField('Report', `${report}`)
         .addField('Report kanaal', `${reportChannel}`)
         .addField('Gestuurd door', `${message.author.tag}`)
     .setFooter(botConfig.bot.footer, Client.user.displayAvatarURL())
         logchannel.send(logembed);

}

module.exports.help = {
    name: "report",
    description: "Meld een bug of een lid",
    category: "Andere",
}