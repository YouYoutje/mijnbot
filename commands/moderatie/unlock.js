const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(bot, message, args) => {
   
    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier geen permissies voor!`)
        .setColor(botConfig.colors.error)
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(errorEmbed);

    var errorEmbed2 = new discord.MessageEmbed()
        .setDescription(`:x: Je moet een gebruiker opgeven!`)
        .setColor(botConfig.colors.error)
    if (!args[0]) return message.channel.send(errorEmbed2);
    
    message.guild.members.unban(args[0]).then(function () {
        var embed = new discord.MessageEmbed()
            .setTitle("Gebruiker is geünband")
            .setDescription(`:white_check_mark: | ${user} is niet meer verbannen op de server.`)
            .addField('Geünband door', message.author.tag)
            .setColor(botConfig.colors.succes)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
        return message.channel.send(embed);
    })
    .catch(function () {
        var errorEmbed = new discord.MessageEmbed()
            .setDescription(`:x: Ik kan de gebruiker niet vinden!`)
            .setColor(botConfig.colors.error)
        return message.channel.send(errorEmbed);
    });
}

module.exports.help = {
    name: "unlock",
    description: "Unlock een kanaal",
    category: "Admin"
}