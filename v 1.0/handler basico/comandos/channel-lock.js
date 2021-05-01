// para hacer en unlock channel solo cambias los permisos al editar el canal

const Discord = require('discord.js');

module.exports = {
  name: "lock-channel",
  alias: [],

execute(client, message, args){

var perms = message.member.hasPermission("ADMINISTRADOR");//permisos que nesesita el user para ejecura el comando

if(!perms){
  return message.channel.send("NO PUEDES EJECUTAR ESTE COMANDO")//lo que envia el bot si no tiene permisos el user
}

let channel = message.mentions.channels.first() || message.channel; //escoje un canal si es uno mensionado o el canal que se eta escribiendo

let rol = message.mentions.roles.first() || message.guild.roles.cache.find(aus => aus.name === "@everyone");// verifica si se ha menciona un rol de lo contrario solo toma el rol @everyone

message.delete();//borrando el mensaje del author

//cambia esto a true en todo para hacer el unlock-channel

//actulizando los permisos de rol en el canal
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

//enviando el embed cuando todo lo de arriba termino de ejecutarse
message.channel.send(embed)

  }
}
