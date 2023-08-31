const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(bot, message, args) => {
    let time = 5e3;

    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier geen permissies voor!!`)
        .setColor(botConfig.colors.error)
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(errorEmbed);

    var errorEmbed2 = new discord.MessageEmbed()
        .setDescription(`:x: Dit ticket is niet gesloten!`)
        .setColor(botConfig.colors.error)
    if(!message.channel.name.startsWith(`${botConfig.bot.ticketName}gesloten`)) {const fail = await message.channel.send(errorEmbed2);setTimeout(() => {fail.delete()}, 6000);return}


    var embed = new discord.MessageEmbed()
        .setTitle("Ticket verwijderen")
        .setDescription(`:white_check_mark: | Ik verwijder dit ticket in **${time/1e3}** seconden. Stuur **annuleer** om het stop te zetten.`)
        .setColor(botConfig.colors.normal)
        .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
        
    let msg = await message.channel.send(embed);
    let collector = msg.channel.createMessageCollector(m => m.content.toLowerCase().includes("annuleer"), { time: time, max: 1 })
    collector.on("end", collected => {
        if(collected.size < 1){
            msg.channel.delete();
            var logsEmbed = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setDescription("Deze ticket is gesloten!")
            .setColor(botConfig.colors.normal)
            .addField("Door", message.author)
            .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
    
            message.guild.channels.cache.get(botConfig.channels.logs).send(logsEmbed);
            return;
        } 
        var embed2 = new discord.MessageEmbed()
            .setTitle("Ticket niet meer verwijderen")
            .setDescription(`:white_check_mark: | Ik ben gestopt.`)
            .setColor(botConfig.colors.succes)
            .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
        msg.channel.send(embed2);
    });



};

module.exports.help = {
    name: "delete",
    description: "Verwijder een ticket",
    category: "Tickets"
}