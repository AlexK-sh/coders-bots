const Discord = require("discord.js")

module.exports = {
name:"say",//nombre de tu comando
aliases:[],//alias si no hya alias ellimina las comillas
description: "Habla con el bot",//una descripcion de tu comando
onlycreator: false,//true= solo tu puedes usar esto
args: true,//responde nesesitas ingresar mas argumendos 
usage: "‼argumentos]",//como de uso lo muestra si args = true
category: "",//categoria de tu comando
permissions: "ADMINISTRATOR",//permisos del user que nesesita para ejecutar el commando
cooldown: 5, //cooldown
permissionsme: "",//permisos nesesarios del bot
guildOnly: false,//true solo se puede usar en servidores no MD

async execute(message, args , prefix, client){
let texto = args.join(' ') 
   message.delete();
   message.channel.send(texto)

},
};