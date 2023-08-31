const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");
const levels = require("discord-xp");
const db = require('mongoose');

const Schema = require("./models/invites");
const Schema2 = require("./models/inviteBy");

levels.setURL(botConfig.bot.databaseURL);

const client = new discord.Client();
client.commands = new discord.Collection();

//Welkom afbeelding
const welkom = require("./welkom");
welkom(client);

//Giveaway systeem
const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: botConfig.colors.normal,
        reaction: "🎉"
    }
});

const invites = {}; 
const waitReady = require('util').promisify(setTimeout);

fs.readdir("commands/", (err, files) => {
    if (err) console.log(err);
    var jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) {
        console.log("[INFO] Er zijn geen commando's gevonden!");
        return;
    }
    jsFiles.forEach((f, i) => {
        var fileGet = require(`./commands/${f}`);
        console.log(`[INFO] De file ${f} is nu geladen.`);
        client.commands.set(fileGet.help.name, fileGet);

    })

});

const stuff = ['informatie', 'moderatie', 'leveling', 'tickets', 'invites', 'andere'];
stuff.forEach(c => {
    fs.readdir(`./commands/${c}/`, (err, files) => {
        console.log(`[INFO] Laden van ${files.length} commands (${c})`);
        files.forEach(f => {
            if (!f.endsWith(".js")) return;
            let props = require(`./commands/${c}/${f}`);
            client.commands.set(props.help.name, props);
        });
    });
});

client.login(botConfig.bot.token);

client.on("ready", async () => {

    const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }
    await db.connect(botConfig.bot.databaseURL, dbOptions).then(console.log("[INFO] Database actief!"))

    await waitReady(1000); client.guilds.cache.forEach(g => { g.fetchInvites().then(guildInvites => { invites[g.id] = guildInvites; }); });

    console.log(`[INFO] ${client.user.username} is online.`);
    
    function randomStatus() {
        let status = ["!help", "Vereon RP", "FiveM roleplay", `${client.users.cache.size} leden`]
        let rstartus = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[rstartus], {type:"WATCHING"});
        };setInterval(randomStatus, 6000);

});

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.bot.prefix;
    var scheldWoorden = JSON.parse(fs.readFileSync('./scheldWoorden.json'));

    var msg = message.content.toLowerCase();

    for (let i = 0; i < scheldWoorden["ScheldWoorden"].length; i++) {

        if(msg.includes(scheldWoorden["ScheldWoorden"][i])) {

            message.delete();

            var scheldwoordembed = new discord.MessageEmbed()
            .setDescription(`:x: ${message.author.tag}, dit woord is niet toegestaan!`)
            .setColor("#ff0000")
            return (await message.channel.send(scheldwoordembed));

            //Log bericht
            var logchannel = message.member.guild.channels.cache.get(botConfig.channels.logs);

            let logembed = new discord.MessageEmbed()
            .setColor(botConfig.colors.normal)
            .setTitle('Log bericht - `Scheldwoord`')
            .addField('Scheldend persoon', `${member}`)
            .setFooter(botConfig.bot.footer, Client.user.displayAvatarURL())
            logchannel.send(logembed);

        };

    }

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    const randomXP = Math.floor(Math.random() * 9) + 1;
    const hasLeveledUp = await levels.appendXp(message.author.id, message.guild.id, randomXP);

    if (hasLeveledUp) {
        const user = await levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`**GG** <@!${message.author.id}>, je bent nu level **${user.level}**.`)
    }

    var arguments = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);

});


client.on("guildMemberAdd", async (member, message) => {

    member.guild.fetchInvites().then(guildInvites => {
        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        try {
            const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
            client.users.fetch(invite.inviter.id).then((inviter) => {
                if (!inviter) return;

                Schema.findOne({ Guild: member.guild.id, User: inviter.id }, async (err, data) => {
                    if (data) {
                        data.Invites += 1;
                        data.Total += 1;
                        data.save();
                    }
                    else {
                        new Schema({
                            Guild: member.guild.id,
                            User: inviter.id,
                            Invites: 1,
                            Total: 1,
                            Left: 0
                        }).save();
                    }
                })

                Schema2.findOne({ Guild: member.guild.id }, async (err, data2) => {
                    if (data2) {
                        data2.inviteUser = inviter.id,
                            data2.User = member.id
                        data2.save();
                    }
                    else {
                        new Schema2({
                            Guild: member.guild.id,
                            inviteUser: inviter.id,
                            User: member.id
                        }).save();
                    }
                })
            })
        }
        catch {
        }
    });
});

client.on("guildMemberRemove", async (member, message) => {

    Schema2.findOne({ Guild: member.guild.id, User: member.id }, async (err, data2) => {
        if (data2) {
            Schema.findOne({ Guild: member.guild.id, User: data2.inviteUser }, async (err, data) => {
                if (data) {
                    data.Invites -= 1;
                    data.Left += 1;
                    data.save();
                }
            })

            const LeaveEmbed = new discord.MessageEmbed()
                .setAuthor(`${member.user.username} heeft de server verlaten!`)
                .setDescription(`Deze gebruiker heeft **${botConfig.bot.servernaam}** verlaten!\nWas geinvite door ${data2.inviteUser}.`)
                .setColor(botConfig.colors.normal)
                .setThumbnail(member.user.avatarURL({
                    dynamic: true
                }) ? member.user.avatarURL({
                    dynamic: true
                }) : null)
                .setTimestamp()
                .setFooter(botConfig.bot.footer, member.guild.iconURL({ dynamic: true }))
            var WelkomChannel = member.guild.channels.cache.get(botConfig.channels.leave);
            WelkomChannel.send(WelkomEmbed)
        }
        else {
            const WelkomEmbed = new discord.MessageEmbed()
                .setAuthor(`${member.user.username} heeft de server verlaten!`)
                .setDescription(`Deze gerbuiker heeft **${botConfig.bot.servernaam}** verlaten!`)
                .setColor(botConfig.colors.normal)
                .setThumbnail(member.user.avatarURL({
                    dynamic: true
                }) ? member.user.avatarURL({
                    dynamic: true
                }) : null)
                .setTimestamp()
                .setFooter(botConfig.bot.footer, member.guild.iconURL({ dynamic: true }))
            var WelkomChannel = member.guild.channels.cache.get(botConfig.channels.leave);
            WelkomChannel.send(WelkomEmbed)
        }
    })
});

client.on("messageDelete", messageDeleted => {

    if (messageDeleted.author.bot) return;

    var content = messageDeleted.conten;
    if (!content) content = "Geen tekst te vinden";

    var respone = `**Bericht van <@${messageDeleted.author.id}> is verwijderd uit ${messageDeleted.channel}** \n${messageDeleted}`;

    var embed = new discord.MessageEmbed()
        .setAuthor(`${messageDeleted.author.tag}`, `${messageDeleted.author.avatarURL({ size: 4096 })}`)
        .setDescription(respone)
        .setFooter(`Auteur: ${messageDeleted.author.id} | Bericht id: ${messageDeleted.id}`)
        .setTimestamp()
        .setColor(botConfig.colors.normal)

    client.channels.cache.get(botConfig.channels.logs).send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) {
        return;
    }

    if (oldMessage.author.bot) return;

    var content = oldMessage.conten;
    if (!content) content = "No text to be found";

    var respone = `**Bericht bewerkt van <@${oldMessage.author.id}> in ${oldMessage.channel}**\n **Van:** \n${oldMessage}\n **naar:** \n${newMessage}`;

    var embed = new discord.MessageEmbed()
        .setAuthor(`${oldMessage.author.tag}`, `${oldMessage.author.avatarURL({ size: 4096 })}`)
        .setDescription(respone)
        .setFooter(`Author: ${oldMessage.author.id} | Message id: ${oldMessage.id}`)
        .setTimestamp()
        .setColor(botConfig.colors.normal)

    client.channels.cache.get(botConfig.channels.logs).send(embed);
});

client.on('guildBanAdd', async (guild, user) => {

    var embed = new discord.MessageEmbed()
        .setAuthor(`Member verbannen`, `${user.avatarURL({ size: 4096 })}`)
        .setDescription(`${user} ${user.tag}`)
        .setFooter(`ID: ${user.id}`)
        .setThumbnail(user.avatarURL({ size: 4096 }))
        .setColor(botConfig.colors.normal)

    client.channels.cache.get(botConfig.channels.logs).send(embed);

});

client.on('guildBanRemove', async (guild, user) => {

    var embed = new discord.MessageEmbed()
        .setAuthor(`Member niet meer verbannen`, `${user.avatarURL({ size: 4096 })}`)
        .setDescription(`${user} ${user.tag}`)
        .setFooter(`ID: ${user.id}`)
        .setThumbnail(user.avatarURL({ size: 4096 }))
        .setTimestamp()
        .setColor(botConfig.colors.normal)

    client.channels.cache.get(botConfig.channels.logs).send(embed);

});

client.on('channelUpdate', async (oldChannel, newChannel) => {
    let guildsChannel = newChannel.guild;
    if (!guildsChannel || !guildsChannel.available) return;

    let types = {
        text: 'Text channel',
        voice: 'Voice channel',
        null: 'None',
    };

    if (oldChannel.name !== newChannel.name) {
        var embed = new discord.MessageEmbed()
            .setTitle(`:wrench: | Kanaal aangepast!`)
            .addField('Oud kanaal:', `${oldChannel.name} (${oldChannel.id})`, true)
            .addField('Nieuw kanaal:', `${newChannel.name} (${newChannel.id})`, true)
            .addField('Type:', `${types[newChannel.type]}`, true)
            .setFooter(`${botConfig.bot.footer}`)
            .setTimestamp()
            .setColor(botConfig.colors.normal)

        client.channels.cache.get(botConfig.channels.logs).send(embed);
    }
});