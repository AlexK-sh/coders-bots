const Discord = require('discord.js');

module.exports = {
  name: "choose",
  alias: [],
  descripcion: "",

execute(client, message, args){

  let textoDividido = args.join(" ").split(" | ")
    let textoRandom = textoDividido[Math.floor(Math.random() * textoDividido.length)]
  
    if(!textoDividido[1]){
    let noHayArgumento1 = new Discord.MessageEmbed()
    .setTitle("Falta de argumentos")
    .setDescription(prefixe + " choose <opcion1> | <opcion2>")
    .setFooter("Son obligatorio los | para separar las opciones")
    .setColor("ff0000")
    return message.channel.send(noHayArgumento1)
    }

    if(textoDividido[1]){

    let numeroDeOpciones = []
     let i = 1
	    textoDividido.forEach(x => {
	    numeroDeOpciones.push(["[" + i + "] - " + textoDividido[i - 1]] )
	    i++
	  })

    let siHayArgumento1 = new Discord.MessageEmbed()
      .setTitle(":incoming_envelope: | Hora de elegir")
      .setDescription(numeroDeOpciones)
      .addField(":mag_right: | Elijo:", textoRandom)
      .setColor("1fff00")
      return message.channel.send(siHayArgumento1)
    }

}
}
