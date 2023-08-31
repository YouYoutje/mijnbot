const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(bot, message, args) => {
   
    let cata = botConfig.categorie.support;

    if (message.channel.parentID == cata) {

        var errorEmbed = new discord.MessageEmbed()
            .setDescription(`:x: Je hebt hier geen permissies voor!`)
            .setColor(botConfig.colors.error)
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(errorEmbed).then(msg => msg.delete({ timeout: 10000 }));
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        var errorEmbed2 = new discord.MessageEmbed()
            .setDescription(`:x: Je moet een gebruiker opgeven!`)
            .setColor(botConfig.colors.error)
        if (!user) return message.channel.send(errorEmbed2)


        message.channel.updateOverwrite(user, { VIEW_CHANNEL: false, SEND_MESSAGES: false });

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruiker verwijderd")
            .setDescription(`:white_check_mark: | ${user} was succesvol verwijderd`)
            .addField('Door:', message.author.tag)
            .setColor(botConfig.colors.succes)
            .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
        message.channel.send(embed)

    } else{
        var errorEmbed3 = new discord.MessageEmbed()
            .setDescription(`:x: Dit is geen ticket!`)
            .setColor(botConfig.colors.error)
            .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
        return message.channel.send(errorEmbed3).then(msg => msg.delete({ timeout: 10000 }));  
    } 
}

module.exports.help = {
    name: "remove",
    description: "Verwijder iemand van een ticket",
    category: "Tickets"
}