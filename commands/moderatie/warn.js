const discord = require("discord.js");
const fs = require("fs");
const botConfig = require("../../botconfig")
module.exports.run = async (bot, message, args) => {
    const warns = JSON.parse(fs.readFileSync("./moderation.json", "utf8"));

    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier geen permissies voor!`)
        .setColor(botConfig.colors.error)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed);

    var user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    var errorEmbed2 = new discord.MessageEmbed()
        .setDescription(`:x: Ik de opgegeven gebruiker niet vinden!`)
        .setColor(botConfig.colors.error)
    if (!user) return message.channel.send(errorEmbed2);

    var errorEmbed3 = new discord.MessageEmbed()
        .setDescription(`:x: Je mag deze gebruiker niet waarschuwen!`)
        .setColor(botConfig.colors.error)
    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed3);

    var reason = args.join(" ").slice(22);

    var errorEmbed4 = new discord.MessageEmbed()
        .setDescription(`:x: | Ik kon geen reden vinden!`)
        .setColor(botConfig.colors.error)
    if (!reason) return message.channel.send(errorEmbed4);

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    if (warns[user.id].reason == undefined)
    {
        warns[user.id].reason = reason + ",";
    }
    else {
        warns[user.id].reason += reason + ",";
    }

    fs.writeFile("./moderation.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.MessageEmbed()
            .setTitle("Waarschuwing")
            .setDescription(`:white_check_mark: | ${user} heeft een waarschuwing gekregen.`)
            .addField("Totaal aantal waarschuwingen:", warns[user.id].warns)
            .setColor(botConfig.colors.normal)
        .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())

    var warnEmbedLog = new discord.MessageEmbed()
        .setDescription("Waarschuwing")
        .setColor(botConfig.colors.normal)
        .addField("Gebruiker", user)
        .addField("Door", message.author)
        .addField("Aantal waarschuwingen", warns[user.id].warns)
        .addField("Reden", reason)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())

    var warnChannel = message.member.guild.channels.cache.find(channels => channels.name === botConfig.channels.logs);
    if (warnChannel) warnChannel.send(warnEmbedLog);

    message.channel.send(warnEmbed);

}

module.exports.help = {
    name: "warn",
    description: "Waarschuw een gebruiker",
    category: "Admin"
}