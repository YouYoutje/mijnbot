const discord = require("discord.js");
const ms = require('ms');
const botConfig = require("../../botconfig.json");
 
module.exports.run = async(client, message, args) => {

    let foutembed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Je hebt hier geen permissies voor!')
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(foutembed);

    let fout7embed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Ik heb hier geen permissies voor! Geef me de permissie: `ADMINISTRATOR`')
    if (!message.guild.me.hasPermission("ADMIMISTRATOR")) return message.channel.send(fout7embed);
    
    let channel = message.mentions.channels.first();
            
    let fout3embed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Geef een geldige channel op!\nGebruik: `!giveaway [kanaal] [tijd (1D, 1H, 1M)] [aantal winnaars] [prijs]`')
    if (!channel) return message.channel.send(fout3embed);
    
    let giveawayDuration = args[1];
    
    let fout4embed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Je moet een geldige tijd opgeven!\nGebruik: `!giveaway [kanaal] [tijd (1D, 1H, 1M)] [aantal winnaars] [prijs]`')
    if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send(fout4embed);
    
    let giveawayWinners = args[2];
    
    let fout5embed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Je moet een geldig aantal winnaar(s) opgeven!\nGebruik: `!giveaway [kanaal] [tijd (1D, 1H, 1M)] [aantal winnaars] [prijs]`')
    if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send(fout5embed);
    
    let giveawayPrize = args.slice(3).join(" ");
    
    let fout6embed = new discord.MessageEmbed()
    .setColor(botConfig.colors.error)
    .setDescription(':x: Je moet een giveaway prijs opgeven!\nGebruik: `!giveaway [kanaal] [tijd (1D, 1H, 1M)] [aantal winnaars] [prijs]`')
    if (!giveawayPrize) return message.channel.send(fout6embed);

            message.delete();
    
            client.giveawaysManager.start(channel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: giveawayWinners,
    
                messages: {
                    giveaway: ("🎉**GIVEAWAY TIME** 🎉"),
                    giveawayEnded: ("🎉**GIVEAWAY GEËINDIGT** 🎉"),
                    timeRemaining: "Tijd over: **{duration}**",
                    inviteToParticipate: "Reageer met 🎉 om mee te doen",
                    winMessage: "GG {winners}, je hebt **{prize}** gewonnen 🎉🎉!",
                    embedFooter: "© OranjeRP™ 2021",
                    noWinner: "Er is geen winnaar!",
                    winners: "winnaar(s)",
                    endedAt: "Giveaway geëindigt",
                    units: {
                        seconds: "seconden",
                        minutes: "minuten",
                        hours: "uren",
                        days: "dagen",
                        pluralS: false
                    }
                }
            })
            let confirmembed = new discord.MessageEmbed()
            .setColor(botConfig.colors.succes)
            .setDescription(`:white_check_mark: Giveaway is gestart in de channel: ${channel}!`)
            message.channel.send(confirmembed);

    //Log bericht
    var logchannel = guild.channels.cache.get(botConfig.channels.logs);

    let logembed = new discord.MessageEmbed()
    .setColor(botConfig.colors.normal)
     .setTitle('Log bericht - `!giveaway`')
     .addField('Giveaway gestart in', `${channel}`)
     .addField('Prijs', `${giveawayPrize}`)
     .addField('Winaars', `${giveawayWinners}`)
     .addField('Duurtijd', `${giveawayDuration}`)
     .addField('Gestart door', `${message.author.tag}`)
     .setFooter(botConfig.bot.footer, client.user.displayAvatarURL())
     logchannel.send(logembed);
        
        }
 
 
module.exports.help = {
    name: "giveaway",
    description: "Start een giveaway",
    category: "Andere"
}