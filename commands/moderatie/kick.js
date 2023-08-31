const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(bot, message, args) => {
   
    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier geen permissies voor!`)
        .setColor(botConfig.colors.error)
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(errorEmbed);

    var kickUser = message.guild.member(message.mentions.users.first());
        var errorEmbed2 = new discord.MessageEmbed()
        .setDescription(`:x: Ik kan de opgeven gebruiker niet vinden.`)
        .setColor(botConfig.colors.error)
    if (!kickUser) return message.channel.send(errorEmbed2);

    var reason = args.join(" ").slice(22);
    var errorEmbed3 = new discord.MessageEmbed()
        .setDescription(`:x: Je moet een reden opgeven.`)
        .setColor(botConfig.colors.error)
    if (!reason) return message.channel.send(errorEmbed3)

    var errorEmbed4 = new discord.MessageEmbed()
        .setDescription(`:x: Je kan deze gebruiker niet kicken.`)
        .setColor(botConfig.colors.error)
    if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send(errorEmbed4);

    var banEmbed2 = new discord.MessageEmbed()
        .setTitle(`Je bent gekickt uit ${message.guild.name}!`)
        .setColor(botConfig.colors.normal)
        .addField("Door:", message.author.tag)
        .addField("Reden:", reason)
     	.setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())

    kickUser.send(banEmbed2).then(function () {
        message.guild.member(kickUser).kick(reason);
        var embed = new discord.MessageEmbed()
                .setTitle("Gebruiker gekickt")
                .setDescription(`:white_check_mark: | ${kickUser} is verwijderd uit de server`)
                .setColor(botConfig.colors.succes)
                .addField("Gekickt door:", message.author.tag)
                .addField("Reden:", reason)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
            return message.channel.send(embed);

    }).catch(function () {
        message.guild.member(kickUser).kick(reason);
        var embed = new discord.MessageEmbed()
                .setTitle("Gebruiker verwijderd")
                .setDescription(`:white_check_mark: | ${kickUser} is verwijderd uit de server`)
                .setColor(botConfig.colors.succes)
                .addField("Gekickt door:", message.author.tag)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
                .addField("Reden:", reason);
            return message.channel.send(embed);
    });
}

module.exports.help = {
    name: "kick",
    description: "Kick een gebruiker",
    category: "Admin"
}