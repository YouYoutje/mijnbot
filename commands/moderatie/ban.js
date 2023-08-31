const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(bot, message, args) => {
   
    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier geen permissies voor!`)
        .setColor(botConfig.colors.error)

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(errorEmbed);
    var banUser = message.guild.member(message.mentions.users.first());

    var errorEmbed2 = new discord.MessageEmbed()
        .setDescription(`:x: Je bent een vergeten om een gebruiker op te geven!`)
        .setColor(botConfig.colors.error)
    if (!banUser) return message.channel.send(errorEmbed2);
    
    var reason = args.join(" ").slice(22);

    var errorEmbed3 = new discord.MessageEmbed()
        .setDescription(`:x: Je bent vergeten een reden op te geven!`)
        .setColor(botConfig.colors.error)
    if (!reason) return message.channel.send(errorEmbed3)
    
    var errorEmbed4 = new discord.MessageEmbed()
        .setDescription(`:x: Je kan deze gebruiker niet bannen!`)
        .setColor(botConfig.colors.error)
    if (banUser.hasPermission("BAN_MEMBERS")) return message.channel.send(errorEmbed4);
    
    var banEmbed2 = new discord.MessageEmbed()
        .setTitle(`Je bent gebant van ${message.guild.name}!`)
        .setColor(botConfig.colors.normal)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
        .addField("Door:", message.author.tag)
        .addField("Reden:", reason);
    
    
        banUser.send(banEmbed2).then(function () {
            message.guild.member(banUser).ban({days: 0, reason: reason})
            var embed = new discord.MessageEmbed()
                .setTitle("Gebruiker Geband")
                .setDescription(`:white_check_mark: | ${banUser} is verbannen van de deze server`)
                .setColor(botConfig.colors.succes)
                .addField("Door:", message.author.tag)
                .addField("Reden:", reason)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
            return message.channel.send(embed);
        }).catch(function () {
            message.guild.member(banUser).ban(reason);
            var embed = new discord.MessageEmbed()
                .setTitle("Gebruiker Geband")
                .setDescription(`:white_check_mark: | ${banUser} is verbannen van de deze server`)
                .addField("Door:", message.author.tag)
                .addField("Reden:", reason)
                .setColor(botConfig.colors.succes)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
            return message.channel.send(embed);
        });
}

module.exports.help = {
    name: "ban",
    description: "Ban een gebruiker",
    category: "Admin"
}