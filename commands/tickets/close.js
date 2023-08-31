const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(bot, message, args) => {
    let time = 5e3;
    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Dit is geen ticket!`)
        .setColor(botConfig.colors.error)
   
    if(!message.channel.parentID == botConfig.categorie.support) return message.channel.send(errorEmbed);

    message.channel.lockPermissions();

    message.channel.setName(`${botConfig.bot.ticketName}gesloten`);

    var embed = new discord.MessageEmbed()
        .setTitle("Ticket gesloten")
        .setDescription(`:white_check_mark: | Ticket is afgerond en succesvol gesloten. \nTicket verwijderen? *${botConfig.bot.prefix}delete*`)
        .addField("Gesloten door:", message.author)
        .setColor(botConfig.colors.normal)
        .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())

    message.channel.send(embed);

};

module.exports.help = {
    name: "close",
    description: "Sluit een ticket",
    category: "Tickets"
}