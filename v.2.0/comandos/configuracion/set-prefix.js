const Discord = require('discord.js');
//utilizaremos mega db en este caso por su simpleza
const db = require('megadb');
//lammamos a la db
let prefixdb = new db.crearDB("Prefixes");

module.exports = {
    name:"set-prefix",
    aliases:[],
    description: "Cambia el prefix del bot en el servidpr", 
    onlycreator: false, 
    args: true,
    usage: "[new prefix]",
    category: "",
    permissions: "ADMINISTRADOR",
    cooldonw: 5, //cooldown
    permissionsme: "",
    guildOnly: false,
    
async execute(message, args , prefix, client){ 
let New_prefix = args[0];


message.channel.send("Cambiando prefix...").then(m => {

await prefixdb.set(message.guild.id, New_prefix).catch((e) => {

m.edit("Ha ocurrido un error y no se pudo cambiar el prefix.")
console.log(e.stack)
}).then(() => {

m.edit(`Prefix cambiado a ${New_prefix}`)
})
})


 }
}