const Discord = require('discord.js');
const megadb = require("megadb");
let eco = new megadb.crearDB("economia");

module.exports = {
  name: "dep",
  alias: [],

async execute(client, message, args){
  
    let server = message.guild.id
    let user = message.author.id
    let usuario = message.author.tag

    const efectivo = await eco.get(`${server}.${user}.efectivo`);    
    
    const banco = await eco.obtener(`${server}.${user}.banco`);

    if(isNaN(args[0])){
        let solonumeros = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL({ dynamic:true }))
        .setDescription(" `? | Pon la cantidad que quieres depositar a tu Cuenta Bancaria.`")
        .setColor("RANDOM")
        .setFooter("Cuentas con un saldo de "+ efectivo)
        return message.channel.send(solonumeros)
    }

    if(args[0] > efectivo){
        let nomayorque = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL({ dynamic:true }))
        .setDescription(" `?` | No puedes depositar mas de lo que tienes")
        .setColor('RANDOM')
        .setFooter("Cuentas con un saldo de "+ efectivo)
        return message.channel.send(nomayorque)
    }

    eco.sumar(`${server}.${user}.banco`, args[0]);
    eco.restar(`${server}.${user}.efectivo`, args[0]);

    let embed =new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic:true }))
    .addField(" `??` | Depositaste:" + args[0] + "? en tu Cuenta Bancaria.",`Tu Saldo bancario es ${await eco.obtener(`${server}.${user}.banco`)}`)
    .setColor("RANDOM")
    return message.channel.send(embed)

  }
}