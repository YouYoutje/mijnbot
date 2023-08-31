const discord = require("discord.js");
const ms = require('ms');
const botConfig = require("../../botconfig.json");
 
 
module.exports.run = async (client, message, args) => {

let foutembed = new discord.MessageEmbed()
.setColor(botConfig.colors.error)
.setDescription(':x: Je hebt hier geen permissies voor!');
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(foutembed);

let fout2embed = new discord.MessageEmbed()
.setColor(botConfig.colors.error)
.setDescription(':x: Je bent vergeten om een giveaway ID op te geven!');
if(!args[0]) return message.channel.send(fout2embed)

let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

let fout3embed = new discord.MessageEmbed()
.setColor(botConfig.colors.error)
.setDescription(':x: Je moet een geldig giveaway ID opgeven!');
if(!giveaway) return message.reply(fout3embed);

client.giveawaysManager.reroll(giveaway.messageID, {
    messages: {
        congrat: ":tada: Nieuwe winnaar(s) : {winners}! Gefeliciteerd!",
        error: "Er zijn niet genoeg deelnemers aan deze giveaway!"
    }

}).catch((e) => {
    message.reply(`de giveaway met het ID ${giveaway.messageID}, is nog niet beëindigt.`);
    if(e.startsWith(`de giveaway met het ID ${giveaway.messageID}, is nog niet beëindigt.`)){
    } else {
        console.error(e);
    }
    });

         //Log bericht
         var logchannel = member.guild.channels.cache.get(botConfig.channels.logs);

         let logembed = new discord.MessageEmbed()
         .setColor(botConfig.colors.normal)
         .setTitle('Log bericht - `!reroll`')
         .addField('Nieuwe winaars', `${{winners}}`)
         .addField('Giveaway ID', `${giveaway.messageID}`)
         .addField('Gererolled door', `${message.author.tag}`)
     .setFooter(botConfig.bot.footer, client.user.displayAvatarURL())
         logchannel.send(logembed);
}


module.exports.help = {
    name: "reroll",
    description: "Reroll een giveaway",
    category: "Andere",
}