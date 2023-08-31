const discord = require("discord.js");
const botConfig = require('../../botconfig')

module.exports.run = async(client, message, args) => {

    let foutembed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Je hebt hier geen permissies voor!')
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(foutembed)

    let deleteAmount;

    let fout2embed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Je moet een aantal opgeven om te verwijderen!')
    if(isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.channel.send(fout2embed)}

    
    let fout3embed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Je kan alleen 50 berichten per keer verwijderen!')
    if (parseInt(args[0]) > 50) {
       return message.channel.send(fout3embed)
    
    }else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount + 1, true);

    var clearEmbed = new discord.MessageEmbed()
     .setDescription(`Er zijn **${deleteAmount}** berichten verwijderd. Dit bericht wordt na 5 seconden vewijderd.`)
     .setColor(botConfig.colors.normal)
     .setFooter(botConfig.bot.footer, client.user.displayAvatarURL())

     await message.channel.send(clearEmbed).then(m => m.delete({timeout: 5000}))

     //Log bericht
     var logchannel = message.member.guild.channels.cache.get(botConfig.channels.logs);

     let logembed = new discord.MessageEmbed()
     .setColor(botConfig.colors.normal)
     .setTitle('Log bericht - `!clear`')
     .addField('Berichten verwijderd', `${deleteAmount}`)
     .addField('Verwijderd door', `${message.author.tag}`)
     .setFooter(botConfig.bot.footer, client.user.displayAvatarURL())
     logchannel.send(logembed);
}

module.exports.help = {
    name: "clear",
    description: "Verwijder meerdere berichten tegelijk",
    category: "Admin"
}