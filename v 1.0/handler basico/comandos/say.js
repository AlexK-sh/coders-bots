const Discord = require('discord.js');

module.exports = {
  name: "say",
  alias: [],
  descripcion: "",

execute(client, message, args){

 var perms = message.member.hasPermission("ADMINISTRATOR")
 if(!perms){
   return message.channel.send("No tienes permiso para ejecutar este comando")
 }

 let texto = args.join(' ')
 if(!texto){
   return message.channel.send("Debes escribir algo para enviar!")
 }

 message.channel.send(texto)

  }
}
