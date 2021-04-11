// para hacer en unlock channel solo cambias los permisos al editar el canal

const Discord = require('discord.js');

module.exports = {
  name: "lock-channel",
  alias: [],

execute(client, message, args){

var perms = message.member.hasPermission("ADMINISTRADOR");

if(!perms){
  return message.channel.send("NO PUEDES EJECUTAR ESTE COMANDO")
}

let channel = message.mentions.channels.first() || message.channel;

let rol = message.mentions.roles.first() || message.guild.roles.cache.find(aus => aus.name === "@everyone");

message.delete();

  //cambia esto a true en todo para hacer el unlock-channel
channel.updateOverwrite(rol,{
  READ_MESSAGE_HISTORY: true,
  SEND_MESSAGES: false,
  ADD_REACTIONS: false
})

  // tambier cambiar el titulo o contenido del embed
const embed = new Discord.MessageEmbed()

.setTitle("Canal Bloqueado")
.setDescription('El canal ha sido bloqueado. para el rol con la id '+ rol)
.setColor('GREEN')
.setFooter("Para mas info !help lock")

message.channel.send(embed)

  }
}
