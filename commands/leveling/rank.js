const discord = require("discord.js");
const levels = require("discord-xp");
const canvacord = require("canvacord");
const botConfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    const target = message.mentions.users.first() || message.author;

    const user = await levels.fetch(target.id, message.guild.id);

    if (!user) return message.channel.send("De gebruiker heeft 0xp");

    var xpRequired = levels.xpFor(user.level + 1);

    const rankCard = new canvacord.Rank()
        .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
        .setRequiredXP(xpRequired)
        .setCurrentXP(user.xp)
        .setLevel(user.level)
        .setProgressBar(botConfig.colors.normal, "COLOR")
        .setUsername(target.username)
        .setDiscriminator(target.discriminator)
        .setStatus("dnd");

    rankCard.build()
        .then(data => {
            const attachment = new discord.MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
        });

}

module.exports.help = {
    name: "rank",
    description: "Zie je huidige level",
    category: "Leveling"
}