const discord = require("discord.js");
const botConfig = require("../../botconfig.json");
const Schema = require("../../models/invites");

module.exports.run = async (bot, message, args) => {
    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier geen permissies voor!`)
        .setColor(botConfig.colors.error)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed);

    var errorEmbed2 = new discord.MessageEmbed()
        .setDescription(`:x: Je moet een gebruiker op geven!`)
        .setColor(botConfig.colors.error)
    if (!args[0]) return message.channel.send(errorEmbed2);

    var errorEmbed3 = new discord.MessageEmbed()
        .setDescription(`:x: Je moet een aantal opgeven!`)
        .setColor(botConfig.colors.error)
    if (!args[1]) return message.channel.send(errorEmbed3);

    let user = message.mentions.users.first() || await client.users.fetch(args[0]);
    if (!user) return message.channel.send(errorEmbed2)

    let amount = Number(args[1]);

    Schema.findOne({ Guild: message.guild.id, User: user.id }, async (err, data) => {
        if (data) {
            data.Invites -= amount;
            data.Total -= amount;
            data.save();
        }
    })

    var embed = new discord.MessageEmbed()
        .setTitle("Invites toegevoegd")
        .setDescription(`:white_check_mark: | Er zijn ${amount} invites verwijdered`)
        .setColor(botConfig.colors.succes)
        .addField("Door:", message.author.tag)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
        .setTimestamp();
    message.channel.send(embed);
}

module.exports.help = {
    name: "removeinvites",
    description: "Zie je huidige invites",
    category: "Invites"
}