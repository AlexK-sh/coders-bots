const Discord = require("discord.js")
const fs = require('fs');

module.exports = {
    name:"reload",
    aliases:[],
    description: "Recarga comandos ya editados si reiciar todo tu proyecto", 
    onlycreator: true, 
    args: true,
    usage: "[command name]",
    category: "creador",
    cooldown: 3, //cooldown
    guildOnly: true,
    
async execute(message, args , prefix, client){ 
		const commandName = args[0].toLowerCase(); // obtenermos el primer argumento

		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`No hay ningún comando con ese nombre o alias. \`${commandName}\`, ${message.author}!`);
		}//si no se encuentra ningun nombre o alias retorna

		const commandFolders = fs.readdirSync('./comandos');
		/*
		IMPORTANTE:
		El comando a recargar debe llevar el mismo nombre de archivo que lo que exportamos como name:""
		
		Ejemplo para recargar el comando say
	     [
			 ✅
			 nombre del archivo <say.js>
			 module.exports = {
			 name: "say"
			 }etc
		 ]
		 [
			 ❌
			 nombre del archivo <decir.js>
			 module.exports = {
			 name: "hablar"
			 }etc
		 ]

		*/
		const folderName = commandFolders.find(folder => fs.readdirSync(`./comandos/${folder}`).includes(`${command.name}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${newCommand.name}\` ha sido recargado!`);
		} catch (error) {
			console.error(error);
			message.channel.send(`Hubo un error al volver a cargar un comando  \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};