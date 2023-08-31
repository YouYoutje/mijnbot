const discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const botConfig = require("../../botconfig.json")
module.exports.run = async (bot, message, args) => {
    const warns = JSON.parse(fs.readFileSync("./moderation.json", "utf8"));

    var user = message.guild.member(message.mentions.users.first());
    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Ik kon de gebruiker niet vinden.`)
		.setColor(botConfig.color.error)
    if (!user) return message.channel.send(errorEmbed);

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };
    let file = warns[user.id]

    let embed = new discord.MessageEmbed()
        .setTitle(`Geschiedenis ${user.user.tag}`)
        .setColor(botConfig.color.normal)
        .addField("Waarschuwingen:", file.warns)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
        message.channel.send(embed)


}

module.exports.help = {
    name: "warnings",
    description: "Bekijk de waarschuwingen van een gebruiker",
    category: "Admin"
}