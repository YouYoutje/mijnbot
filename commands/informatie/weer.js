const weather = require('weather-js');
const discord = require('discord.js');
const botConfig = require("../../botconfig.json");

module.exports.run = async(Client, message, args) =>{

    weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        // 'C'=celsius // 'F'=farneheit

        let foutembed = new discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription(':x: Geef een locatie op!');
        if(error) return message.channel.send(foutembed);

        let fout2embed = new discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription(':x: Geef een locatie op!');
        if(!args[0]) return message.channel.send(fout2embed)

        let fout3embed = new discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription(':x: Geef een bestaande locatie op!');
        if(result === undefined || result.length === 0) return message.channel.send(fout3embed);

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new discord.MessageEmbed()
        .setAuthor(`Het weer van ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(botConfig.colors.normal)
        .addField('Tijdzone', `UTC${location.timezone}`, true)
        .addField('Temperatuur type', 'Celsius', true)
        .addField('Temperatuur', `${current.temperature}°C`, true)
        .addField('Wind', current.winddisplay, true)
        .addField('Voelt als', `${current.feelslike}°C`, true)
        .addField('Vochtigheid', `${current.humidity}%`, true)
     .setFooter(botConfig.bot.footer, Client.user.displayAvatarURL())


        message.channel.send(weatherinfo)
        })
    }


module.exports.help = {
    name: "weer",
    description: "Bekijk het weer van de opgegeven locatie",
    category: "Informatie"
}