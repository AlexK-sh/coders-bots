const Discord = require("discord.js")

module.exports = {
name:"converter",
aliases:["convertidor"],
description: "Covierte archivos o links de discord a otros formatos",
onlycreator: false,
args: true,
usage: "[link || atachament]",
category: "Sin categoria",
permissions: "",
cooldown: 5, 
permissionsme: "",
guildOnly: false,

async execute(message, args , prefix, client){

if(!args[0])return message.channel.send("Especifica un formato para convertir")

    let archivo = new Discord.MessageAttachment(args[1] || message.attachments.first().url , `converter.${args[0]}`)

message.channel.send("Convercion terminada \n**Resultado:**",archivo)

},
};