const Discord = require('discord.js');

module.exports = {
  name: "decir",
  alias: [],
  descripcion: "",

execute(client, message, args){

var perms = message.member.hasPermission("ADMINISTRATOR")
 if(!perms){
   return message.channel.send("No tienes permiso para ejecutar este comando")
 }
 let canal = message.mentions.channels.first()
 if(!canal){
   return message.channel.send("Debes mencionar un canal")
 }
 let texto = args.slice(1).join(" ")
 if(!texto){
   return message.channel.send("Debes escribir lo que quieres que envie")
 }

 canal.send(texto)

  }
}
