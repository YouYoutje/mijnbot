const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {

    message.delete();

    var reason = "";
    var errorEmbed = new discord.MessageEmbed()
        .setDescription(`:x: Je hebt hier geen permissies voor!`)
        .setColor(botConfig.colors.error)
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(errorEmbed);

    const categoryID = botConfig.categorie.support;


    var embed = new discord.MessageEmbed()
        .setTitle(`${botConfig.bot.servernaam} Tickets`)
        .setColor(botConfig.colors.normal)
        .setDescription("Klik op 🎫 om een ticket te openen")
        .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
    var ticketEmbed = await message.channel.send(embed);
    ticketEmbed.react("🎫");

    bot.on("messageReactionAdd", async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();

        if (user.bot) return;
        if (!reaction.message.guild) return;

        if (reaction.emoji.name === '🎫') {
            reaction.users.remove(user.id);

            var ticketBestaat = false;

            var ticketProgress = new discord.MessageEmbed()
                .setTitle(`${user.username}`)
                .setColor(botConfig.colors.normal)
                .setDescription(`:ticket: | Uw ticket wordt gemaakt...`)
                .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
            message.channel.send(ticketProgress)

            .then((msg) => {
                message.guild.channels.create(`${botConfig.bot.ticketName}` + user.username, { typ: 'text' }).then(

                    (createdChannel) => {
                        createdChannel.setParent(categoryID).then(
                            (settedParent) => {
                                settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                                    SEND_MESSAGES: false,
                                    VIEW_CHANNEL: false,
                                });
    
                                settedParent.updateOverwrite(user.id, {
                                    VIEW_CHANNEL: true,
                                    CREATE_INSTANT_INVITE: false,
                                    READ_MESSAGE: true,
                                    SEND_MESSAGES: true,
                                    ATTACH_FILES: true,
                                    CONNECT: true,
                                    ADD_REACTIONS: true,
                                    READ_MESSAGE_HISTORY: true,
                                });
    
                                settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === botConfig.rollen.supportRole),{
                                    VIEW_CHANNEL: true,
                                    CREATE_INSTANT_INVITE: false,
                                    READ_MESSAGE: true,
                                    SEND_MESSAGES: true,
                                    ATTACH_FILES: true,
                                    CONNECT: true,
                                    ADD_REACTIONS: true,
                                    READ_MESSAGE_HISTORY: true,
                                });
        
    
                                var embedParent = new discord.MessageEmbed()
                                    .setTitle(`Hallo ${user.username}`)
                                    .setColor(botConfig.colors.normal)
                                    .setDescription(`Welkom in uw ticket!\nEen stafflid komt u z.s.m helpen.\nFormuleer uw vraag/bestelling al.`)
                                    .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
                                settedParent.send(`${user}`, embedParent).then((ticketMessage) => {
                                    ticketMessage.react("🔒");
                                })
    
                                bot.on("messageReactionAdd", async (reaction, user, channel) => {
                                    if (reaction.message.partial) await reaction.message.fetch();
                                    if (reaction.partial) await reaction.fetch();
                                
                                    if (user.bot) return;
                                    if (!reaction.message.guild) return;
                                
                                        if (reaction.emoji.name === '🔒'){
                                            reaction.message.channel.lockPermissions();
    
                                            reaction.message.channel.setName(`${botConfig.bot.ticketName}gesloten`);
    
                                            var embed = new discord.MessageEmbed()
                                                .setTitle("Ticket gesloten")
                                                .setDescription(`:white_check_mark: | Ticket is afgerond en succesvol gesloten. \nTicket verwijderen? *${botConfig.bot.prefix}delete*`)
                                                .addField("Gesloten door:", user)
                                                .setColor(botConfig.colors.normal)
                                                .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
                                           
    
                                            return reaction.message.channel.send(embed);
                                        }
                                });
    

                                var ticketgemaakt = new discord.MessageEmbed()
                                    .setTitle(`${user.username}`)
                                    .setColor(botConfig.colors.succes)
                                    .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
                                    .setDescription(`:ticket: | Ticket is gemaakt in <#${settedParent.id}>.`);
                                msg.edit(ticketgemaakt).then(msg => msg.delete({ timeout: 3000 }));
                                
    
                            }
                            ).catch(err => {
                                console.log
                                message.channel.send(":x: Er is iets mis gegaan!");
                            });
                        }
            
                    ).catch(err => {
                        message.channel.send(":x: Er is iets mis gegaan!");
                    });
            })

            

        }

    })



}

module.exports.help = {
    name: "paneel",
    description: "Maak een ticket paneel",
    category: "Tickets"
}