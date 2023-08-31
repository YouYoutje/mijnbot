const discord = require("discord.js");
const botConfig = require("../../botconfig.json");
const Schema = require("../../models/invites");

module.exports.run = async (bot, message, args) => {
    const member = message.mentions.users.first() || message.author;

    Schema.findOne({ Guild: message.guild.id, User: member.id }, async (err, data) => {
        if (data) {
            let embed = new discord.MessageEmbed()
                .setTitle("📨 | Invites")
                .setDescription(`**${member.tag}** heeft \`${data.Invites}\` invites (\`${data.Total}\` totaal, \`${data.Left}\` leaves)`)
                .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
                .setColor(botConfig.colors.normal)
            message.channel.send(embed)
        }
        else {
            let embed = new discord.MessageEmbed()
                .setTitle("📨 | Invites")
                .setDescription(`**${member.tag}** heeft \`0\` invites (\`0\` totaal, \`0\` leaves)`)
                .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
                .setColor(botConfig.colors.normal)
            message.channel.send(embed)
        }
    });
}

module.exports.help = {
    name: "invites",
    description: "Zie je huidige invites",
    category: "Invites"
}