const chalk = require('chalk');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
module.exports = (client) => {
	client.on('message', async message => {
		if(message.author.bot) return;
		const today = new Date();

		const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
		const time = today.getHours() + ':' + ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ':' + ((today.getSeconds() < 10 ? '0' : '') + today.getSeconds()));
		const serverIcon = message.guild.iconURL ({ dynamic:true });
		if(message.content.toLowerCase().startsWith (prefix)) {
			console.log(chalk.magentaBright(`${message.author.tag} said cmd: ${message.content}`));
			const CMD = new Discord.MessageEmbed()
				.setColor('#FF15C7')
				.setTitle(message.content)
				.setAuthor(message.author.tag, message.author.displayAvatarURL())
				.setDescription(`Envio el **COMANDO** al canal: <#${message.channel.id}> el ${date} a las ${time}`)
				.setThumbnail('https://media.tenor.com/images/61351bc489f08c4879edd22469f4cd5a/tenor.gif')
				.setTimestamp()
				.setFooter(message.guild.name, serverIcon);

			client.channels.cache.get('844685714682675220').send(CMD);
		}
		else{
			console.log(`${message.author.tag} said: ${message.content}`);
			const Embed = new Discord.MessageEmbed()
				.setColor('#1CFF0F')
				.setTitle(message.content)
				.setAuthor(message.author.tag, message.author.displayAvatarURL())
				.setDescription(`Envio el mensaje al canal: <#${message.channel.id}> el ${date} a las ${time}`)
				.setThumbnail('https://images.squarespace-cdn.com/content/v1/51abe1dae4b08f6a770bf7d0/1569943347981-24QRO1N0TEKSSIEIND52/ke17ZwdGBToddI8pDm48kLxnK526YWAH1qleWz-y7AFZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVH-2yKxPTYak0SCdSGNKw8A2bnS_B4YtvNSBisDMT-TGt1lH3P2bFZvTItROhWrBJ0/chat.gif')
				.setTimestamp()
				.setFooter(message.guild.name, serverIcon);

			client.channels.cache.get('846380018989137930').send(Embed);
		}

	});

	client.on('messageDelete', async message => {
		if (!message.guild) return;
		if(message.author.bot) return;
		const today = new Date();

		const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
		const time = today.getHours() + ':' + ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ':' + ((today.getSeconds() < 10 ? '0' : '') + today.getSeconds()));
		const fetchedLogs = await message.guild.fetchAuditLogs({
			limit: 1,
			type: 'MESSAGE_DELETE',
		});

		const deletionLog = fetchedLogs.entries.first();

		if (!deletionLog) return console.log(chalk.green(`El mensaje de ${message.author.tag} se eliminó, pero no se encontraron registros de auditoría relevantes.`));

		const { executor, target } = deletionLog;

		if (target.id === message.author.id) {
			console.log(chalk.bold.red(`El mensaje de ${message.author.tag} fue borrado por ${executor.tag}. El contenido fue: ${message.content}`));
		}
		else {
			const serverIcon = message.guild.iconURL ({ dynamic:true });
			console.log(chalk.bold.yellow(`${message.author.tag} Borro su mensaje. El contenido fue: ${message.content}`));
			const Embed = new Discord.MessageEmbed()
				.setColor('#EC1919')
				.setTitle(message.content)
			// .setURL('https://youtu.be/F0lynllSosw')
				.setAuthor(message.author.tag, message.author.displayAvatarURL())
				.setDescription(`Borro el mensaje del canal: <#${message.channel.id}> el ${date} a las ${time}`)
				.setThumbnail('https://images.squarespace-cdn.com/content/v1/51abe1dae4b08f6a770bf7d0/1569943355220-16CIDPEPYIKJX10EW2ZC/ke17ZwdGBToddI8pDm48kLxnK526YWAH1qleWz-y7AFZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVH-2yKxPTYak0SCdSGNKw8A2bnS_B4YtvNSBisDMT-TGt1lH3P2bFZvTItROhWrBJ0/delete.gif')
				.setTimestamp()
				.setFooter(message.guild.name, serverIcon);

			client.channels.cache.get('846380018989137930').send(Embed);
		}
	});

	client.on('guildMemberRemove', async member => {
		const fetchedLogs = await member.guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_KICK',
		});

		const kickLog = fetchedLogs.entries.first();

		if (!kickLog) return console.log(chalk.bold.pink(chalk.bgGreen(`${member.user.tag} abandonaron el server, muy probablemente por su propia voluntad.`)));

		const { executor, target } = kickLog;

		if (target.id === member.id) {
			console.log(chalk.bold.yellow(`${member.user.tag}`) + (chalk.blueBright) `ha dejado el asunto; ` + (chalk.bold.bgRed) `kicked by:${executor.tag}`);
		}
		else {
			console.log(chalk.bgRed(`${member.user.tag} abandonó el server, la búsqueda del registro de auditoría no fue concluyente.`));
		}
	});

	client.on('guildBanAdd', async (guild, user) => {
		const fetchedLogs = await guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_BAN_ADD',
		});

		const banLog = fetchedLogs.entries.first();

		if (!banLog) return console.log(chalk.bgYellow(`${user.tag} fue baneado ${guild.name} pero no se pudo encontrar ningún registro de auditoría.`));

		const { executor, target } = banLog;


		if (target.id === user.id) {
			console.log(chalk.bgRed(`${user.tag} obtuvo el martillazo de la justicia ${guild.name}, el que lo dio fue ${executor.tag}`));
		}
		else {
			console.log(chalk.bgCyan(`${user.tag}`)` obtuvo el martillazo de la justicia ${guild.name}, el registro de auditoría no fue concluyente.`);
		}
	});
};