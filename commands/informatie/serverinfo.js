const discord = require("discord.js");
const moment = require("moment");
const botConfig = require("../../botconfig.json");

module.exports.run = async(Client, message, args) =>{

    var icon = message.guild.iconURL();

    var roles = message.guild.roles.cache.size - 1;

    var owner = message.guild.owner.user;

    var serverEmbed = new discord.MessageEmbed()
            .setThumbnail(icon)
            .setColor(botConfig.colors.normal)
            .setTitle(message.guild.name)
            .addField('ID:', message.guild.id)
            .addField('Regio:', message.guild.region, true)
            .addField('Bots:', message.guild.members.cache.filter(m =>m.user.bot).size, true)
            .addField('Mensen:', message.guild.memberCount - message.guild.members.cache.filter(m =>m.user.bot).size, true)
            .addField('Totaal aantal leden:', message.guild.memberCount, true)
            .addField('Online:', message.guild.members.cache.filter(m =>m.user.presence.status == 'online' || m.user.presence.status == "dmd" || m.user.presence.status == 'idle').size, true)
            .addField('Tekstkanalen:', message.guild.channels.cache.filter(chan => chan.type == "text").size, true)
            .addField('Spraakkanalen:', message.guild.channels.cache.filter(chan => chan.type == "voice").size, true)
            .addField('Gemaakt op:', moment(message.guild.createdAt).format('D/M/YYYY, HH:mm'))
            .addField('Je bent gejoined op:', moment(message.member.joinedAt).format('D/M/YYYY, HH:mm'))
            .addField('Rollen:', message.guild.roles.cache.map(r => r).join(", "))
            .setFooter(botConfig.bot.footer, Client.user.displayAvatarURL())

        return message.channel.send(serverEmbed);

    }

    module.exports.help = {
        name: "serverinfo",
        description: "Krijg info over deze server",
        category: "Informatie"
    }