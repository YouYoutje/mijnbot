const discord = require("discord.js");
const botConfig = require("../../botconfig.json")
module.exports.run = async (bot, message, args) => {

    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier geen permissies voor!`)
        .setColor(botConfig.colors.error)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(errorEmbed);

    await message.channel.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'),{
        SEND_MESSAGES: false,
    });

    var embed = new discord.MessageEmbed()
        .setTitle("Locked")
        .setDescription(`:white_check_mark: | Kanaal succesvol gelocked`)
                .addField("Door:", message.author.tag)
        .setColor(botConfig.colors.succes)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
        .setTimestamp();
    message.channel.send(embed);

}
module.exports.help = {
    name: "lock",
    description: "Lock een kanaal",
    category: "Admin"
}