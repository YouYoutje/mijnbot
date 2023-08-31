const discord = require("discord.js");
const moment = require('moment');
const botConfig = require("../../botconfig.json");


module.exports.run = async(client, message, args) => {


    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

    if (client.presence.status === 'dnd') client.presence.status = '🔴 Niet Storen';
    if (client.presence.status === 'online') client.presence.status = '🟢 Online';
    if (client.presence.status === 'idle') client.presence.status = '🟡 Inactief';
    if (client.presence.status === 'offline') client.presence.status = '⚫ Offline';

    let x = Date.now() - client.createdAt;

    let status = client.presence.status;

    const botinfoEmbed = new discord.MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setDescription('Deze bot is gemaakt door: `Harrie#0001`')
    .setColor(botConfig.colors.normal)
    .setImage(client.user.displayAvatarURL())
    .addField("Server(s)", client.guilds.cache.size, true)
    .addField("Leden", client.users.cache.size, true)
    .addField("Status", '🟢 Online', true)
    .addField("Bot ID", client.user.id)
    .addField("Bot gemaakt op", ` ${moment.utc(client.user.createdAt).format("D/M/YYYY, HH:mm")}`, true)
    .setFooter(botConfig.bot.footer, client.user.displayAvatarURL())

    message.channel.send(botinfoEmbed);

}


module.exports.help = {
    name: "botinfo",
    description: "Krijg info over deze bot",
    category: "Informatie"
}