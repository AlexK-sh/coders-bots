#**Base Command Handler**

const Discord = require("discord.js")

module.exports = {
name:"",//nombre de tu comando
aliases:[""],//alias si no hya alias ellimina las comillas
description: "",//una descripcion de tu comando
onlycreator: false,//true= solo tu puedes usar esto
args: true,//responde nesesitas ingresar mas argumendos 
usage: "",//como de uso lo muestra si args = true
category: "",//categoria de tu comando
permissions: "",//permisos del user que nesesita para ejecutar el commando
cooldown: 5, //cooldown
permissionsme: "",//permisos nesesarios del bot
guildOnly: false,//true solo se puede usar en servidores no MD

async execute(message, args , prefix, client){

    //estructura tu comando aqui

},
};

//////

#**Base Event Handler**

const Discord = require('discord.js');

module.exports = {
	name: ' ',//nombre del evento
async execute(message, client, prefix) { 

   //estructuracion

}
}