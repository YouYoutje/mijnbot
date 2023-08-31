const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(bot, message, args) => {
   
    let cata = botConfig.categorie.support;

    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier permissies voor!`)
        .setColor(botConfig.colors.error)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed)

    if (message.channel.parentID == cata) {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        var errorEmbed2 = new discord.MessageEmbed()
            .setDescription(`:x: Ik kon de gebruiker niet vinden!`)
            .setColor(botConfig.colors.error)
        if (!user) return message.channel.send(errorEmbed2)

        message.channel.updateOverwrite(user, { VIEW_CHANNEL: true, SEND_MESSAGES: true });

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruiker toegevoegd")
            .setDescription(`:white_check_mark: | ${user} was succesvol toegevoegd`)
            .addField('Door:', message.author.tag)
            .setColor(botConfig.colors.succes)
            .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
            .setTimestamp();
        message.channel.send(embed)

    } else {
        var errorEmbed3 = new discord.MessageEmbed()
            .setDescription(`:x: Dit is geen ticket!`)
            .setColor(botConfig.colors.error)
        return message.channel.send(errorEmbed3)
    }

}

module.exports.help = {
    name: "add",
    description: "Voeg iemand toe aan het ticket",
    category: "Ticket"
}