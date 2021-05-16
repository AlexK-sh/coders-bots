const Discord = require("discord.js")

module.exports = {
name:"eval",//nombre de tu comando
aliases:["e"],//alias si no hya alias ellimina las comillas
description: "Ejecuta codigo atravez de este comando",//una descripcion de tu comando

onlycreator: true,// IMPORTANTE SOLO TU DEBERIAS EJECUTAR ESTO POR TEMAS DE SEGURIDAD

args: true,//responde nesesitas ingresar mas argumendos 
usage: "[code]",//como de uso lo muestra si args = true
category: "Creador",//categoria de tu comando
cooldown: 5, //cooldown
guildOnly: true,//true solo se puede usar en servidores no MD

async execute(message, args , prefix, client){

    let code = args.join(" ") //Definimos code con argumentos
    
    try { //Hacemos un try
      if(args.join(" ").toLowerCase().includes("token")){
          return;
    }// si se en el code esta la palabra token no ejecutara 
    // esto por temas de seguridad de tu bot


    let evaluated = eval(code) //"evaluated" va a evaluar el comando
    
    let beautify = require("beautify") //Se usa beautify para que funcione
    
    let Salida_del_Code = new Discord.MessageEmbed() //Creamos un mbed con la informacion de el code
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL)
        .setTitle(":desktop: "+client.user.tag)
        .addField("Codigo:", "```js\n"+beautify(args.join(" "), { format: "js" })+"```")
        .addField("Lo evaluado:", "```js\n"+evaluated+"```") //Aca aparecera lo que se evalua
    return message.channel.send(Salida_del_Code)
  }catch(err) { //Hacemos un catch y que defina err

    let beautify = require("beautify")

    let Error_en_el_code = new Discord.MessageEmbed()
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .addField("Hubo un error con el codigo que evaluaste", "```js\n"+err+"```") //Va a aparecer el error
        .setColor("RANDOM")
    return message.channel.send(Error_en_el_code) 
  }
  

 },
};