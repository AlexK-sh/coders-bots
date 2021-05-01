const Discord = require("discord.js")
const client = new Discord.Client();

client.cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();

const fs = require('fs');
const { readdirSync } = require("fs");

//requiriendo a la carpeta comandos y todas las subcarpetas pd: no poner comandos directamente en la capeta comandos
const commandFolders = fs.readdirSync("./comandos");
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./comandos/${folder}`).filter(file => file.endsWith(".js"))
  for (const file of commandFiles) {
    const command = require(`./comandos/${folder}/${file}`);
    client.commands.set(command.name, command)
  }
}

//requiriendo archivos para un event handler
const eventFiles = fs.readdirSync('./eventos').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./eventos/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

let prefix = "!"

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  
  //args
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  
  //selecion de comandos
  const commandName = args.shift().toLowerCase();
  
  //comprobando el nombre del comando o alias
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return message.channel.send("`❌| Lociento pero ese no es comando valido`");

////modulos
//DM
if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('I can\'t execute that command inside DMs!');
}//fin

//onlycreator
if (command.onlycreator && message.author.id !== "TU id") {
return message.lineReply('Solo mi creador puede ejecutar esto');
}//fin

///permisos user
if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
        return message.lineReply('Permisos Insuficientes \n\ require `' + command.permissions + '`');
    }
}//fin

//permisos bot
if (command.permissionsme) {
    if (!message.guild.me.hasPermission(command.permissionsme)) {
        return message.lineReply(' No tengo permisos Insuficientes nesesito \n\ requiero `' + command.permissionsme + '`');
    }
}//fin

//args NON
if (command.args && !args.length) {
    let lineReply = `No has proveido argumentos, ${message.author}!`;

        if (command.usage) {
            lineReply += `\nEl uso adecuado seria \`${prefix}${command.name} ${command.usage}\``;
        }
            return message.lineReply(lineReply);
}//fin

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.lineReply(`Por favor espera ${timeLeft.toFixed(1)} segundos antes de volver a usar \`${command.name}\` `);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, prefix, client, ver);
  } catch (error) {
    console.error(error);
    message.lineReply(`\`\`\`prolog\n❌ | Ha Ocurrido Un Error Mientras Se Ejecutaba El Comando\n  si el problema persiste usa '${prefix}bug-report'\`\`\``);
  }

})

client.login(process.env.TOKEN);
