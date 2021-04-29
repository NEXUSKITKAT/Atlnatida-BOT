/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
require('console-stamp')(console, {
	format: ':date(dd/mm/yy ~ HH:MM:ss)',
});
const { token, prefix, bot_version } = require('./config.json');

// ////////////////////////////////////////////INICIO/////////////////////////////////////////////////////////// //
client.on('ready', () => {
	console.log(chalk.bold.magenta(`Online  ${client.user.tag}!`));
	client.user.setActivity('Atlatinda RP', { type: 'PLAYING' });
});

client.once('ready', () => {
	console.log(bot_version);
	console.log('El prefijo es: ' + chalk.green(prefix));
});

client.on('message', async message => {
	if(message.author.bot) return;
	console.log(`${message.author.tag} said: ${message.content}`);

});

client.on('message', msg => {
	if(msg.content.startsWith(`${prefix}jugar`)) {
		if(msg.member.roles.cache.find(rol => rol.id === '833682451288031242' || '834919111359987762')) {
			const content = msg.content.replace(`${prefix}jugar`, ' ');
			// "{prefix}jugar hello world" -> "hello world"

			client.user.setPresence({
				activity: {
					name: content,
					type: 0,
				} });
		}
		else{
			msg.channel.send('Tu no puedes!').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
	}
});

// ////////////////////// TERMINA INICIO //////////////////////////// //


// ///////////////////// LOGS ////////////////////////////////////// //

client.on('messageDelete', async message => {
	if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});

	const deletionLog = fetchedLogs.entries.first();

	if (!deletionLog) return console.log(chalk.green(`El mensaje de ${message.author.tag} se eliminó, pero no se encontraron registros de auditoría relevantes.`));

	const { executor, target } = deletionLog;

	if (target.id === message.author.id) {
		console.log(chalk.bold.red(`El mensaje de ${message.author.tag} fue borrado por ${executor.tag}. El contenido fue ${message.content}`));
	}
	else {
		console.log(chalk.bold.yellow(`${message.author.tag} Borro su mensaje. El contenido fue ${message.content}`));
	}
});

client.on('guildMemberRemove', async member => {
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});

	const kickLog = fetchedLogs.entries.first();

	if (!kickLog) return console.log(chalk.bold.pink(chalk.bgGreen(`${member.user.tag} abandonaron el asunto, muy probablemente por su propia voluntad.`)));

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

// ////////////////////////// TERMINA lOGS /////////////////////////////////// //


// ///////////////////////// MENSAJE DE BIENVENIDA /////////////////////////// //

client.on('guildMemberAdd', async member => {
	const canal = member.guild.channels.cache.find(c => c.name === '🛬ʙɪᴇɴᴠᴇɴɪᴅᴀ');
	if(!canal) return;
	const serverIcon = member.guild.iconURL ({ dynamic:true });
	const Embed = new Discord.MessageEmbed()
		.setColor('#2DD5FF')
		.setTitle(`Bienvenido a ${member.guild.name}`)
		.setURL('https://youtu.be/F0lynllSosw')
		.setAuthor(member.user.username, member.user.displayAvatarURL())
		.setDescription(`Bienvenido <@${member.user.id}> estamos encantados de que quieras formar parte de la comunidad **Atlantida RP**! Podrás ser parte de la comunidad y acceder el servidor una vez hayas realizado la verificación por voz. Infórmate en <#832289348983586867>`)
		.setThumbnail(serverIcon)
		.addField('No olvides de leer la normativa', 'Disfruta tu estancia en Atlantida RP', true)
		.setTimestamp()
		.setFooter('ATLANTIDA RP©');

	canal.send(Embed);

});

client.on('guildMemberAdd', async member => {
	member.send('Bienvenido, estamos encantados de que quieras formar parte de la comunidad **Atlantida RP**. Podrás ser parte de la comunidad y acceder al servidor una vez hayas realizado la verificación por voz, infórmate en <#832289348983586867> ');
});

client.on('guildMemberRemove', async member => {
	const canal = member.guild.channels.cache.find(c => c.name === '🛫ꜱᴀʟɪᴅᴀꜱ');
	if(!canal) return;
	const Embed = new Discord.MessageEmbed()
		.setColor('#EC1919')
		.setDescription(`<@${member.user.id}> **se fue.**`)
		.setAuthor(member.user.tag, member.user.displayAvatarURL())
		.setThumbnail(member.user.displayAvatarURL({ dynamic:true, size: 128 }))
		.setTimestamp()
		.setFooter('ATLANTIDA RP');

	canal.send(Embed);

});

// /////////////////////////////////////////////// TERMINA BIENVENIDA ////////////////////////////////////////////////////// //

// ////////////////////////// STATS //////////////////////////// //

const stats = {
	serverID: '832277845157347398',
	total: '833818248116961280',
	member:'833818503156465684',
	bots:'833818644139606027',
};

client.on('guildMemberAdd', member => {
	if(member.guild.id !== stats.serverID) return;
	client.channels.cache.get(stats.total).setName(`Usuarios Totales: ${member.guild.memberCount}`);
	client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
	console.log(chalk.green('Actualizando contador'));
});

client.on('guildMemberRemove', member => {
	if(member.guild.id !== stats.serverID) return;
	client.channels.cache.get(stats.total).setName(`Usuarios Totales: ${member.guild.memberCount}`);
	client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
	console.log(chalk.green('Actualizando contador'));
});

// /////////////////////////////////////////////// TERMINA STATS /////////////////////////////////////////////////////////////////////// //


client.on('message', async msg => {
	if (msg.author.bot) return;

	if (msg.content === `${prefix}help`) {
		msg.channel.send(({ embed: {
			color: 10181046,
			description: `${prefix}ip  ${prefix}status  ${prefix}version`,
		} }));
		// msg.delete({ timeout: 10000, reason: 'Tiene que haber una!' });
	}
	if (msg.content === `${prefix}admin`) {
		if(msg.member.roles.cache.find(rol => rol.id === '833682451288031242' || '834919111359987762')) {
			msg.channel.send(`**${prefix}laip / ${prefix}on / ${prefix}re / ${prefix}info / ${prefix}uptime / ${prefix}jugar** {Contenido}`);
		}
	}

	if (msg.content === `${prefix}ip`) {
		msg.channel.send('**Para entrar al volcán pulsa F8 y escribe: connect cfx.re/join/b6mjvb**');
	}

	if (msg.content === `${prefix}laip`) {
		if(msg.member.roles.cache.find(rol => rol.id === '832279343023390730' || '834919111359987762')) {
			msg.delete({ timeout: 100, reason: 'Tiene que haber una!' });
			msg.channel.send({ embed: {
				color: 12320855,
				description: '<a:DualRing1:834090756637458483> Pegar eso en el F8: **connect cfx.re/join/b6mjvb** <a:DualRing1:834090756637458483>',
			} });
		}
		else{
			msg.channel.send('Tu no puedes!');
		}
	}

	if (msg.content === `${prefix}version`) {
		msg.channel.send(bot_version);
	}

	if (msg.content === 'F') {
		msg.channel.send('F!').then(msg => {
			msg.delete({ timeout: 10000 });
		}).catch(console.error);
		msg.delete({ timeout: 10000 });

	}

	if (msg.content === `${prefix}on`) {
		if(msg.member.roles.cache.find(rol => rol.id === '832279343023390730' || '834919111359987762')) {
			msg.delete({ timeout: 100, reason: 'Tiene que haber una!' });
			msg.channel.send(({ embed: {
				color: 3066993,
				description: '✅ Server ON! ✅',
			} }));
			msg.channel.send('<a:DualRing2:834103656763883542> @everyone <a:DualRing2:834103656763883542>');
		}
		else{
			msg.channel.send('Tu no puedes!').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
	}

	if (msg.content === `${prefix}re`) {
		if(msg.member.roles.cache.find(rol => rol.id === '832279343023390730' || '834919111359987762')) {
			msg.delete({ timeout: 100 });
			msg.channel.send(({ embed: {
				color: 10038562,
				description: '❌ Server REINICIANDO! ❌',
			} }));
			msg.channel.send('<a:DualRing3:834103677265903635> @everyone <a:DualRing3:834103677265903635>');
			// <a:load:752072604550168656>
		}
		else{
			msg.channel.send('No Perteneces al equipo administrativo!').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
	}


	const { MessageEmbed } = require('discord.js');

	if(msg.content.startsWith (`${prefix}info`)) {
		if(msg.member.roles.cache.find(rol => rol.id === '833682451288031242' || '834919111359987762')) {

			const { guild, channel } = msg;

			const user = msg.mentions.users.first() || msg.member.user;
			const member = guild.members.cache.get(user.id);
			const memberRoles = member.roles.cache
				.filter((roles) => roles.id !== msg.guild.id)
				.map((role) => role.toString());

			// console.log(member);

			const embed = new MessageEmbed()
				.setAuthor(`Informacion de ${user.tag}`, user.displayAvatarURL())
				.setThumbnail(user.displayAvatarURL())
				.addFields(
					{
						name: 'Nombre',
						value: user.tag,
					},
					{
						name: 'Es un bot?',
						value: user.bot || 'No es un Bot',
					},
					{
						name: 'Apodo',
						value: member.nickname || 'Ninguno',
					},
					{
						name: 'Se unio al server',
						value: new Date(member.joinedTimestamp).toLocaleDateString(),
					},
					{
						name: 'Se unio a Discord',
						value: new Date(user.createdTimestamp).toLocaleDateString(),
					},
					{
						name: 'Roles',
						value: member.roles.cache.size - 1,
					},
					{
						name: 'Roles',
						value: memberRoles,
					},
					/* {
						name: 'creado en',
						value: guild.createdAt,
					},*/
				);

			channel.send(embed);
		}
		else{
			msg.channel.send('No Perteneces al equipo administrativo!').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
			console.log(chalk.red(`Alguien probo usar el comando info ${msg.author}`));
		}
	}

	if(msg.author.bot || msg.channel.type === 'dm') return;
	// if(msg.member.roles.cache.find(rol => rol.id === '833682451288031242' || '834919111359987762')) {
	const messageArray = msg.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

	if (cmd === `${prefix}sugerencia`) {
		const pollDescription = args.slice(0).join(' ');

		const embedPoll = new Discord.MessageEmbed()
			.setTitle('💯 Sugerencia! 💯')
			.setDescription(pollDescription)
			.setColor('BLUE');
		if(pollDescription !== null && pollDescription !== '') {
			const msgEmbed = await msg.channel.send(embedPoll);
			await msgEmbed.react('👍');
			await msgEmbed.react('👎');
		}
		msg.delete({ timeout: 100 });
	}

	// ///////////


	if (msg.content === `${prefix}join`) {
		if (msg.author.id === '575698626739699728') {
			client.emit('guildMemberAdd', msg.member);
		}
	}

	if (msg.content === `${prefix}exit`) {
		if (msg.author.id === '575698626739699728') {
			client.emit('guildMemberRemove', msg.member);
		}
	}
	if (msg.content === `${prefix}jefe`) {
		if (msg.author.id === '575698626739699728') {
			msg.channel.send('Ya llego el Jefe.').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
			msg.delete({ timeout: 10000 });
		}
		else{
			msg.channel.send('Tu no eres mi Jefe!').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
			console.log(chalk.red(`Alguien probo usar el comando JEFE ${msg.author}`));
		}
	}

	if(msg.content.startsWith(`${prefix}server`)) {
		if (msg.author.id === '575698626739699728') {

			client.guilds.cache.forEach((guild) => {
				msg.channel.send(
					`${guild.name} tiene un total de ${guild.memberCount} miembros`,
				);
			},

			);
		}
		else{
			msg.channel.send('tu no puedes').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
	}

	let totalSeconds = (client.uptime / 1000);
	const days = Math.floor(totalSeconds / 86400);
	totalSeconds %= 86400;
	const hours = Math.floor(totalSeconds / 3600);
	totalSeconds %= 3600;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.floor(totalSeconds % 60);
	const uptime = `Activo durante: ${days} dias, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;

	if (msg.content === `${prefix}uptime`) {
		if(msg.member.roles.cache.find(rol => rol.id === '833682451288031242' || '834919111359987762')) {
			msg.channel.send(uptime);
		}
		else{
			msg.channel.send('No Perteneces al equipo administrativo!').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
	}
	const rolesmiembros = msg.guild.roles.cache.get('832277915747614811').members;
	const guild = client.guilds.cache.get('832277845157347398');
	setInterval(() =>{
		const channel = guild.channels.cache.get('833818503156465684');
		channel.setName(`Miembros: ${rolesmiembros.size}`);
		console.log('Updating Member Count');
	}, 3600000);

	if(msg.content == `${prefix}verificados`) {
		msg.channel.send(`Somos **${rolesmiembros.size}** miembros verificados	.`);
	}


});

client.login(token);