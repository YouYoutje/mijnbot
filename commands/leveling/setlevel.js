const discord = require("discord.js");
const levels = require("discord-xp");
const botConfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier geen permissies voor!`)
        .setColor(botConfig.colors.error)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed);

    var errorEmbed2 = new discord.MessageEmbed()
        .setDescription(`:x: Je bent vergeten een gebruiker op te geven!`)
        .setColor(botConfig.colors.error)
    if (!args[0]) return message.channel.send(errorEmbed2);

    var errorEmbed3 = new discord.MessageEmbed()
        .setDescription(`:x: Geef een nieuw level in!`)
        .setColor(botConfig.colors.error)
    if (!args[1]) return message.channel.send(errorEmbed3);

    const target = message.mentions.users.first();

    levels.setLevel(target.id, message.guild.id, args[1]);

    var embed = new discord.MessageEmbed()
        .setTitle("Level geüpdate")
        .setDescription(`:white_check_mark: | Nieuw level: ${args[1]}`)
            .addField('Door:', message.author.tag)
        .setColor(botConfig.colors.succes)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
    message.channel.send(embed);

}

module.exports.help = {
    name: "setlevel",
    description: "Stel een level in",
    category: "Leveling"
}