const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, MessageEmbed, Collection, Guild} = require("discord.js");

const fs = require("fs");
const { readdirSync } = require("fs");
const message = require("./eventos/ready");

var prefix = "!"

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./comandos/${file}`);
    client.commands.set(command.name, command);
}

for (const file of readdirSync(`./eventos/`)){
    if(file.endsWith(".js")){
        let fileName = file.substring(0, file.length - 3);
        let fileContents = require(`./eventos/${file}`);
    client.on(fileName, fileContents.bind(null, client ));
    }
}

client.on("message", async (message) => {
if(!message.content.startsWith(prefix)) return;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
if(message.author.bot)return;
if(message.channel.type == "dm")return;

const command = args.shift().toLowerCase();

let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));

if(cmd){
    cmd.execute(client, message , args)
}
    
})


client.login("ODEyNzQ4ODQwMjk3NTYyMTUz.YDFRVw.2iUVADFqLTVj1ukG_r6_BG2acwE")