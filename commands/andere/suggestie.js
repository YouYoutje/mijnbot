const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(Client, message, args) =>{

     //message.delete();

    let foutembed = new discord.MessageEmbed()
    .setColor(botConig.color.error)
    .setDescription(':x: Ik heb hier geen permissies voor!')
    if (!message.guild.me.hasPermission("MOVE_MEMBERS")) return message.channel.send(foutembed);

    var text = args || `Sorry, we kunnen de suggestie niet vinden.`;

    let suggestie = args.join(" ").slice(0);

    var suggestieKanaal = message.member.guild.channels.cache.get("932697196585947236");

    let foutembed2 = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Ik kan het suggestie kanaal niet vinden!')
    if(!suggestieKanaal) return message.channel.send(foutembed2)

    let foutembed3 = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Je bent vergeten een suggestie op te geven!')
    if(!suggestie) return message.channel.send(foutembed3)
    
    message.delete();

    const SuggestieEmbed = new discord.MessageEmbed()
        .setTitle(`Nieuwe suggestie!`)
        .setColor(botConfig.colors.normal)
        .addField("Suggestie", suggestie)
        .addField('Verstuurd door', message.author.tag)
        .setThumbnail(message.author.displayAvatarURL())
     .setFooter(botConfig.bot.footer, Client.user.displayAvatarURL())
    
        let msgEmbed = await suggestieKanaal.send(SuggestieEmbed);
        await msgEmbed.react('🔼')
        await msgEmbed.react('🔽')

        message.channel.send("✅ Je suggestie is verzonden!");
    
}

module.exports.help = {
    name: "suggestie",
    description: "Geef een tip aan de server",
    category: "Andere",
}