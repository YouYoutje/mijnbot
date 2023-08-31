const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(bot, message, args) => {
   
    let cata = botConfig.categorie.support;

    var errorEmbed = new discord.MessageEmbed()
            .setDescription(`:x: Je hebt hier geen permissies voor!`)
            .setColor(botConfig.colors.error)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorEmbed)

    if (message.channel.parentID == cata) {
        var errorEmbed2 = new discord.MessageEmbed()
            .setDescription(`:x: Je moet een nieuwe ticket naam opgeven!`)
            .setColor(botConfig.colors.error)
        if (!args[0]) return message.channel.send(errorEmbed2)
        message.channel.setName(args.join(' ')).then(ch => {
            var embed = new discord.MessageEmbed()
                .setTitle("Kanaalnaam veranderd")
                .setDescription(`:white_check_mark: | Kanaalnaam is veranderd naar ${ch.name}`)
                .addField('Door:', message.author.tag)
                .setColor(botConfig.colors.succes)
                .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
            message.channel.send(embed)

        })
    } else{
        var errorEmbed3 = new discord.MessageEmbed()
            .setDescription(`:x: Dit is geen ticket!`)
            .setColor(botConfig.colors.error)

        return message.channel.send(errorEmbed3).then(msg => msg.delete({ timeout: 10000 }));  
    } 
}

module.exports.help = {
    name: "rename",
    description: "Verander de naam van een ticket",
    category: "Tickets"
}