const Discord = require('discord.js');
const megadb = require("megadb");
let eco = new megadb.crearDB("economia");

module.exports = {
  name: "work",
  alias: ["w"],

async execute(client, message, args){
  
    let server = message.guild.id
    let user = message.author.id
    let usuario = message.author.tag

    if(!eco.tiene(`${server}.${user}.efectivo`)){
        eco.establecer(`${server}.${user}`,{efectivo: "0" , banco: "0"}); 
    }

    var random = Math.floor(Math.random() * 180)
    console.log("se ha agregado "+ random + " a la cuenta de "+ user)

    const embed = new Discord.MessageEmbed()

    .setAuthor("Comando Work!")
    .setDescription( usuario +" Ha trabajo y gano un monto de "+ random)
    .setColor("GREEN")

    await eco.sumar(`${server}.${user}.efectivo`, random)

    message.channel.send(embed)

  }
}