const discord = require("discord.js");
const fs = require("fs");
const botConfig = require("../../botconfig.json")

module.exports.run = async (bot, message, args) => {
    const warns = JSON.parse(fs.readFileSync("./moderation.json", "utf8"));

    var user = message.guild.member(message.mentions.users.first());

    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier geen permissies voor!`)
        .setColor(botConfig.colors.error)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed);

    var errorEmbed2 = new discord.MessageEmbed()
        .setDescription(`:x: Ik de gebruiker niet vinden!`)
        .setColor(botConfig.colors.error)
    if (!user) return message.channel.send(errorEmbed2);

    var errorEmbed3 = new discord.MessageEmbed()
        .setDescription(`:x: Deze gebruiker heeft nog geen waarschuwingen ontvangen!`)
        .setColor(botConfig.colors.error)
    if (!warns[user.id]) return message.channel.send(errorEmbed3)

    var errorEmbed4 = new discord.MessageEmbed()
        .setDescription(`:x: Deze gebruiker heeft geen waarschuwingen!`)
        .setColor(botConfig.colors.error)
    if (warns[user.id].warns == 0) return message.channel.send(errorEmbed4)

    warns[user.id].warns--;


    fs.writeFile("./moderation.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var unwarnEmbed = new discord.MessageEmbed()
        .setDescription("Waarschuwing verwijderd")
        .setColor(botConfig.colors.normal)
        .addField("Gebruiker", user)
        .addField("Door", message.author)
        .addField("Waarschuwingen", warns[user.id].warns)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())

        var warnChannel = message.member.guild.channels.cache.find(channels => channels.name === botConfig.channels.logs);
        if (warnChannel) warnChannel.send(unwarnEmbed);

        var embed = new discord.MessageEmbed()
            .setTitle("Waarschuwing verwijderd")
            .setDescription(`:white_check_mark: | ${user.user.tag} zijn waarschuwing is succesvol verwijderd`)
                .addField("Door:", message.author.tag)
	.setColot(botConfig.colors.normal)
      .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
    message.channel.send(embed);


}
module.exports.help = {
    name: "unwarn",
    description: "Verwijder de waarschuwing van een gebruiker",
    category: "Admin"
}