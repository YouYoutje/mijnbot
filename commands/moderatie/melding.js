const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(bot, message, args) => {
    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier geen permissies voor!`)
        .setColor(botConfig.colors.error)
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(errorEmbed);

    var seperator = "|";

    if(args[0] == null){

        var errorEmbed2 = new discord.MessageEmbed()
            .setDescription(`:x: Je moet het zo gebruiken: ${botConfig.bot.prefix}melding titel ${seperator} bericht ${seperator} kleur ${seperator} kanaal!`)
            .setColor(botConfig.colors.error)

    return message.channel.send(errorEmbed2);
    }

    var argsList = args.join(" ").split(seperator);

    var options = {

        titel: argsList[0],
        bericht: argsList[1] || "Geen inhoud meegegeven",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()
    }

    var announceEmbed = new discord.MessageEmbed()
        .setTitle(options.titel)
        .setColor(options.kleur)
        .setDescription(`${options.bericht}`)
     .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())

    var meldingchannel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if(!meldingchannel) return message.reply("Dit kanaal bestaat niet");
    
    meldingchannel.send(announceEmbed);

}

module.exports.help = {
    name: "melding",
    description: "Maak een mededeling",
    category: "Admin"
}