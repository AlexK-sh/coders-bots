const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, MessageEmbed, Collection, Guild } = require("discord.js")

const fs = require("fs");
const { readdirSync } = require("fs");
/*
paara poder hacer el prefix por servidor nesesitamos comentar o eliminar nuestra variable perfix
var prefix = "!" ///puedes cambiar tu prefix
*/
//tambien nesesitaremos la database con los datos del prefix
const megadb = require("megadb")
let db_prefixes = new megadb.creatDB("prefixes")

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'))

for (const file of commandFiles){
  const command = require(`./comandos/${file}`);
  client.commands.set(command.name, command);
}
//Requiriendo una carpeta dentro de la carpeta comandos
for (const file of readdirSync('./comandos/util/')){
  if(file.endsWith('.js')){
    const command = require(`./comandos/util/${file}`);
    client.commands.set(command.name, command);
  }
}

///evento message con algunas caracteristicas
client.on('message', async (message) => {
  //definimos nuestro nuevo pefix aqui
  
  let prefix = db_prefixes.has(message.guild.id) ? await db_prefixes.get(message.guild.id) : "<tu prefix aqui>";//lo que esta dentro de las comillas es el prefixque tiene el bot por default
  
//si el mensaje no empieza con el [prefix] retorna
if(!message.content.startsWith(prefix)) return;

//Definicion de args para los comandos
const args = message.content.slice(prefix.length).trim().split(/ +/g);
//si el author es un bot no recive el mensaje
if(message.author.bot)return;

//Si el canal de texto es DM osea mensajes directos no tomara el mensaje
if(message.channel.type == "dm")return;

//Constante para saber el nombre del comando
const command = args.shift().toLowerCase();

//let definiendo el comando para ejecutarlo, Funciona con el nombre normal o con el alias 
let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));

//Si el prefix y es un nombre de comando es valido ejecutara el comando
if(cmd){
cmd.execute(client, message, args)
}
});

//Evento "ready" para saber cuando el bot se prende
client.on("ready", () =>{
  console.log("El bot se ha encendido")
})

client.login(process.env.TOKEN)//agrega tu token
