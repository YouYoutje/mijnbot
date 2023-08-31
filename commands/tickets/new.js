const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async(bot, message, args) => {
      
    const categoryID = botConfig.categorie.support;

        var ticketBestaat = false;

        if (ticketBestaat) return;

        var ticketProgress = new discord.MessageEmbed()
            .setTitle(`${message.author.username}`)
            .setColor(botConfig.colors.normal)
            .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
            .setDescription(`:ticket: | Uw ticket wordt gemaakt...`);
        message.channel.send(ticketProgress)
        .then((msg) => {
            var channel = message.guild.channels.cache.find(c => c.name == `${botConfig.bot.ticketName}` + message.author.username);

            if (channel == `${botConfig.bot.ticketName}` + message.author.username) {
                ticketBestaat = true;
    
                var embed = new discord.MessageEmbed()
                .setDescription(":x: Ticketlimiet bereikt. 1/1")
                .setColor(botConfig.colors.error)

                message.author.send(embed)
            }

            else {

            message.guild.channels.create(`${botConfig.bot.ticketName}` + message.author.username, {typ: 'text'}).then(

                (createdChannel) => {
                    createdChannel.setParent(categoryID).then(
                        (settedParent) => {
                            settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'),{
                                SEND_MESSAGES: false,
                                VIEW_CHANNEL: false,
                            });
    
                            settedParent.updateOverwrite(message.author.id,{
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
                                .setTitle(`Hallo ${message.author.username}`)
                                .setColor(botConfig.colors.normal)
                                .setDescription(`Welkom in uw ticket!\nEen stafflid komt u z.s.m helpen.\nFormuleer uw vraag/bestelling al.`)
                                .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
                            settedParent.send(`${message.author}`, embedParent).then((ticketMessage) => {
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
                                .setTitle(`${message.author.username}`)
                                .setColor(botConfig.colors.succes)
                                .setDescription(`:ticket: | Ticket is gemaakt in <#${settedParent.id}>.`)
                                .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
                            msg.edit(ticketgemaakt);

                        }
                    ).catch(err => {
                        console.log
                        message.channel.send(":x: Er is iets mis gegaan!");
                    });
                }
    
            ).catch(err => {
                message.channel.send(":x: Er is iets mis gegaan!");
            });
        }
        });


                

}

module.exports.help = {
    name: "new",
    description: "Maak een ticket",
    category: "Tickets"
}