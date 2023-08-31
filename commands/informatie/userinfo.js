const discord = require("discord.js");
const moment = require("moment");
const botConfig = require("../../botconfig.json");

module.exports.run = async (client, message, args) => {

  var member = message.guild.member(message.mentions.users.first() || client.users.cache.get(args[0]));

  if(!member) member = message.member;

  var roles = member.roles.cache.size - 1;

  var roleNames = member.roles.cache.map(r => r).join(" ").replace("@everyone", "");

  if(roles == 0) roleNames = "Geen rollen";

  var status = member.presence.status;

  var nickName = member.nickname;

  if(nickName == null || undefined) nickName = "Geen";

  var embed = new discord.MessageEmbed()
  .setColor(botConfig.colors.normal)
    .setThumbnail(member.user.displayAvatarURL({size: 4096}))
    .setTitle(`${member.user.tag}`)
    .addField('ID:', `${member.id}`, true)
    .addField('Bijnaam:', nickName, true)
    .addField('Status:', status, true)
    .addField('Game:', `${member.presence.activities[0] ? member.presence.activities[0].name : 'Geen'}`, true)
    .addField('Account gemaakt:', `${moment(member.user.createdAt).format("D/M/YYYY, HH:mm")}`)
    .addField('Server gejoined:', `${moment(member.joinedAt).format("D/M/YYYY, HH:mm")}`)
    .addField('Rollen:', `${roleNames}`)
    .setFooter(botConfig.bot.footer, client.user.displayAvatarURL())

    message.channel.send(embed);
}



module.exports.help = {
    name: "userinfo",
    description: "Bekijk info over een member",
    category: "Informatie"
}