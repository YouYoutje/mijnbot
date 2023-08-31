const discord = require("discord.js");
const botConfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
  var commandList = [];
  var prefix = botConfig.bot.prefix;

  bot.commands.forEach((command) => {
    var constructor = {
      name: command.help.name,
      description: command.help.description,
      category: command.help.category,
    };

    commandList.push(constructor);
  });

  var tickets = [];
  var info = [];
  var admin = [];
  var leveling = [];
  var invites = [];
  var andere = [];

  for (let i = 0; i < commandList.length; i++) {
    const command = commandList[i];

    if (command["category"] == "Informatie") {
      info += `${prefix}${command["name"]} - ${command["description"]}\n`;
    } else if (command["category"] == "Admin") {
      admin += `${prefix}${command["name"]} - ${command["description"]}\n`;
    } else if (command["category"] == "Tickets") {
      tickets += `${prefix}${command["name"]} - ${command["description"]}\n`;
    }
    else if (command["category"] == "Leveling") {
      leveling += `${prefix}${command["name"]} - ${command["description"]}\n`;
    }
    else if (command["category"] == "Invites") {
      invites += `${prefix}${command["name"]} - ${command["description"]}\n`;
    }
    else if (command["category"] == "Andere") {
      andere += `${prefix}${command["name"]} - ${command["description"]}\n`;
    }
  }

  var avatar = message.author.displayAvatarURL();
  var embedMessage = new discord.MessageEmbed()
    .setColor(botConfig.colors.normal)
    .setTitle("Command Help")
    .setDescription(
      "Wij hebben de commands opgedeeld in categorieën:\n\n🎟️ | Tickets\n🔐 | Staff Commands\nℹ | Informatie commands \n🆙 | Level commands\n📨 | Invite commands\n🌎 | Andere commands"
    )
    .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
  sentMessage = await message.channel.send(embedMessage);
  sentMessage.react("🎟️");
  sentMessage.react("🔐");
  sentMessage.react("ℹ");
  sentMessage.react("🆙");
  sentMessage.react("📨");
  sentMessage.react("🌎");

  bot.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.emoji.name === '🎟️') {
      var embedMessage = new discord.MessageEmbed()
        .setColor(botConfig.colors.normal)
        .setTitle("Command Help - Ticket Commands")
        .addField("Dit zijn de commands:", `\`\`\`\n${tickets}\n\`\`\``)
        .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
      reaction.message.edit(embedMessage)
      reaction.message.reactions.removeAll()
    }
    else if (reaction.emoji.name === '🔐') {
      var embedMessage = new discord.MessageEmbed()
        .setColor(botConfig.colors.normal)
        .setTitle("Command Help - Staff Commands")
        .addField("Dit zijn de commands:", `\`\`\`\n${admin}\n\`\`\``)
        .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
      reaction.message.edit(embedMessage)
      reaction.message.reactions.removeAll()
    }
    else if (reaction.emoji.name === 'ℹ') {
      var embedMessage = new discord.MessageEmbed()
        .setColor(botConfig.colors.normal)
        .setTitle("Command Help - Informatie commands")
        .addField("Dit zijn de commands:", `\`\`\`\n${info}\n\`\`\``)
        .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
      reaction.message.edit(embedMessage)
      reaction.message.reactions.removeAll()
    }

    else if (reaction.emoji.name === '🆙') {
      var embedMessage = new discord.MessageEmbed()
        .setColor(botConfig.colors.normal)
        .setTitle("Command Help - Level commands")
        .addField("Dit zijn de commands:", `\`\`\`\n${leveling}\n\`\`\``)
        .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
      reaction.message.edit(embedMessage)
      reaction.message.reactions.removeAll()
    }

    else if (reaction.emoji.name === '📨') {
      var embedMessage = new discord.MessageEmbed()
        .setColor(botConfig.colors.normal)
        .setTitle("Command Help - Invite commands")
        .addField("Dit zijn de commands:", `\`\`\`\n${invites}\n\`\`\``)
        .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
      reaction.message.edit(embedMessage)
      reaction.message.reactions.removeAll()
    }

    else if (reaction.emoji.name === '🌎') {
      var embedMessage = new discord.MessageEmbed()
        .setColor(botConfig.colors.normal)
        .setTitle("Command Help - Andere commands")
        .addField("Dit zijn de commands:", `\`\`\`\n${andere}\n\`\`\``)
        .setFooter(botConfig.bot.footer, bot.user.displayAvatarURL())
      reaction.message.edit(embedMessage)
      reaction.message.reactions.removeAll()
    }
  })

}

module.exports.help = {
  name: "help",
  description: "Dan krijg je dit bericht",
  category: "Informatie",
};
