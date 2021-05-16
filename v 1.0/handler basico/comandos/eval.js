const Discord = require('discord.js');
// nesesario instalar 
//> npm i beautify

module.exports = {
  name: "eval",//agrega un nombre a tu comando
  alias: ["r"],//pon en alias Ejm: ["alias1","alias2"] en caso de no requerir alias solo dejalo vacio Ejm: []
  descripcion: "Ejecuta codigo dentro del comando",

execute(client, message, args){

    let User_autorizado = ["id1","id2"]//puedes agregar cuantas ids desees pero ten cuidado a quien le das permiso a este comando

    if(!User_autorizado.includes(message.author.id)){
        return;
    }

    let code = args.join(" ") //Definimos code con argumentos
    if(!code) { //Creamos un if para que diga
        let embed = new Discord.MessageEmbed()
        .setDescription("Necesitas evaluar __*ALGO*__")
        .setColor("RANDOM")
        message.channel.send(embed)
        .then(m => m.delete(1000))
    }

    try { //Hacemos un try
      if(args.join(" ").toLowerCase().includes("token")){
          return;
    }

    let evaluated = eval(code) //"evaluated" va a evaluar el comando
    let beautify = require("beautify") //Se usa beautify para que funcione
    
    let Salida_del_Code = new Discord.MessageEmbed() //Creamos un embed de salida si se evaluo correctamente todo        .setColor("RANDOM")
        .setTimestamp() //Usamos un Timestamp
        .setFooter(client.user.tag, client.user.displayAvatarURL)
        .setTitle(":desktop: "+client.user.tag)
        .addField("Codigo:", "```js\n"+beautify(args.join(" "), { format: "js" })+"```")
        .addField("Lo evaluado:", "```js\n"+evaluated+"```") //Aca aparecera lo que se evalua
        return message.channel.send(Salida_del_Code)
  } catch(err) { //Hacemos un catch y que defina err
    let beautify = require("beautify")
    let Error_en_el_code = new Discord.MessageEmbed()
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL)
    .addField("Hubo un error con el codigo que evaluaste", "```js\n"+err+"```") //Va a aparecer el error
    .setColor("RANDOM")
    message.channel.send(Error_en_el_code) 
  }
  
  }
}
