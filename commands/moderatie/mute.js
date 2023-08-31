const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(bot, message, args) => {
   
    var mutePerson = message.guild.member(message.mentions.users.first());

    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier geen permissies voor!`)
        .setColor(botConfig.colors.error)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed);

    var errorEmbed2 = new discord.MessageEmbed()
        .setDescription(`:x: Ik heb de gebruiker niet gevonden!`)
        .setColor(botConfig.colors.error)

    if (!args[0] || !mutePerson) return message.reply(errorEmbed2);

    var errorEmbed3 = new discord.MessageEmbed()
    .setDescription(`:x: Je kan deze gebruiker niet muten!`)
    .setColor(botConfig.colors.error)

    if (mutePerson.hasPermission("MANAGE_MESSAGES")) return message.reply(errorEmbed3);

    var muteRole = message.guild.roles.cache.get('825815133527605318');

    mutePerson.roles.add(muteRole);

    var embed = new discord.MessageEmbed()
        .setTitle("Gebruiker gemute")
        .setDescription(`:white_check_mark: | ${mutePerson} is gemuted`)
        .addField('Gemute door', message.author.tag)
        .setColor(botConfig.colors.succes)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
    message.channel.send(embed);
}

module.exports.help = {
    name: "mute",
    description: "Mute een gebruiker",
    category: "Admin"
}