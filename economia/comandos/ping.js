const Discord = require('discord.js');

module.exports = {
  name: "ping",
  alias: ["p"],

 execute(client, message, args){
  
  return message.channel.send("La Api ms es de "+ Math.floor(client.ws.ping)+"ms´")
  }
}