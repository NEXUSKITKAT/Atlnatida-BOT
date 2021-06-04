/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const Logs = require('./logs');
const chlid = require('child_process');
const Welkome = require('./bienvenida-stats');
require('console-stamp')(console, {
	format: ':date(dd/mm/yy ~ HH:MM:ss)',
});
const { prefix, bot_version } = require('./config.json');
require ('dotenv').config();

// ////////////////////////////////////////////INICIO/////////////////////////////////////////////////////////// //
client.on('ready', () => {
	const today = new Date();
	const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
	const time = today.getHours() + ':' + ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes() + ':' + ((today.getSeconds() < 10 ? '0' : '') + today.getSeconds()));

	console.log(chalk.bold.magenta(`Online  ${client.user.tag}!`));

	console.log(bot_version);
	console.log('El prefijo es: ' + chalk.green(prefix));
	console.log(chalk.green('[✓] Todo Ejecutado correctamente!'));
	client.channels.cache.get('834032383769706526').send(`**Online: ${date} ~ ${time}\n Version: ${bot_version}\n El prefijo es: ${prefix}\n [✓] Todo Ejecutado correctamente!**`);

	client.user.setActivity('Atlatinda RP', { type: 'PLAYING' });

	Logs(client);
	Welkome(client);

});
// ✓

client.on('message', msg => {
	if (msg.author.bot || msg.channel.type === 'dm') return;

	const roleID = '832277915747614811';
	const rolesmiembros = msg.guild.roles.cache.get(roleID).members;
	const guild = client.guilds.cache.get('832277845157347398');
	const channel = guild.channels.cache.get('833818503156465684');
	channel.setName(`Verificados: ${rolesmiembros.size}`);

	if(msg.content.startsWith(`${prefix}jugar`)) {
		if(msg.member.roles.cache.find(rol => rol.id === '833682451288031242' || '834919111359987762')) {
			const content = msg.content.replace(`${prefix}jugar`, ' ');

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

	if(msg.content.toLowerCase() == `${prefix}verificados`) {
		msg.channel.send(`Somos **${rolesmiembros.size}** miembros verificados.`);
	}

});

// ////////////////////// TERMINA INICIO //////////////////////////// //


client.on('message', async msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot || msg.channel.type === 'dm') return;

	const autorizado = msg.member.roles.cache.find(rol => rol.id === '832279343023390730');
	const MOD = msg.member.roles.cache.find(rol => rol.id === '834919111359987762');
	const Abuelo = msg.member.roles.cache.find(rol => rol.id === '833682451288031242');

	if (msg.content.toLowerCase() === '<@!833802979499966519>') {
		msg.channel.send(`**${prefix}help** para ayuda`);
	}

	if (msg.content.toLowerCase() === `${prefix}help`) {
		msg.channel.send({ embed: {
			color: 3447003,
			description: `${prefix}ip  ${prefix}version  ${prefix}verificados`,
		} });
	}

	if (msg.content.toLowerCase() === `${prefix}ip`) {
		if(autorizado || MOD || Abuelo) {
			msg.channel.send({ embed: {
				color: 12320855,
				description: '<a:DualRing1:834090756637458483> Pegar eso en el F8: **connect cfx.re/join/b6mjvb** <a:DualRing1:834090756637458483>',
			} });
		}
		else{
			msg.channel.send('**Para entrar al volcán pulsa F8 y escribe: connect cfx.re/join/b6mjvb**');
		}
	}

	if (msg.content.toLowerCase() === `${prefix}version`) {
		msg.channel.send(`Version: ${bot_version}`);
	}

	if (msg.content.toLowerCase() === `${prefix}f`) {
		msg.channel.send('F!').then(msg => {
			msg.delete({ timeout: 10000 });
		}).catch(console.error);
		msg.delete({ timeout: 10000 });

	}

	if(msg.author.bot || msg.channel.type === 'dm') return;
	// if(autorizado || MOD || Abuelo')) {
	const messageArray = msg.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

	if (cmd === `${prefix}sugerencia`) {
		const pollDescription = args.slice(0).join(' ');
		if (msg.channel.id === '832362060209717290') {
			const embedPoll = new Discord.MessageEmbed()
				.setTitle('💯 Sugerencia! 💯')
				.setDescription(pollDescription)
				.setColor('BLUE');
			if(pollDescription !== null && pollDescription !== '') {
				const msgEmbed = await msg.channel.send(embedPoll);
				await msgEmbed.react('👍');
				await msgEmbed.react('👎');
			}
			else{
				msg.channel.send('**La sugerencia no puede estar vacia!**').then(msg => {
					msg.delete({ timeout: 10000 });
				}).catch(console.error);
			}
		}
		else{
			msg.reply('Las sugerencias van en el canal de: <#832362060209717290>').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
		msg.delete({ timeout: 100 });
	}

	// ///////////////////////////////////////////                      ADMIN                /////////////

	if (msg.content.toLowerCase() === `${prefix}admin`) {
		if(autorizado || MOD || Abuelo) {
			msg.channel.send(`**${prefix}on / ${prefix}re / ${prefix}logs (0-30) /${prefix}file / ${prefix}info / ${prefix}serverinfo / ${prefix}uptime / ${prefix}jugar** {Contenido} / Presencia ( **${prefix}online ${prefix}ausente ${prefix}ocupado ${prefix}invisible**) / **${prefix}cc** [Numero de mensajes deseados a borrar] / **${prefix}send** (ID canal) (mensaje) / **${prefix}dm (id de la persona) (mensaje)**`);
		}
	}

	if (msg.content.toLowerCase() === `${prefix}on`) {
		if(autorizado || MOD || Abuelo) {
			client.user.setStatus('online');
			msg.delete({ timeout: 100 });
			msg.channel.send({ embed: {
				color: 3066993,
				description: '✅ Server ON! ✅',
			} });
			msg.channel.send('<a:DualRing2:834103656763883542> @everyone <a:DualRing2:834103656763883542>');
		}
		else{
			msg.reply('No Perteneces al equipo administrativo!').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
	}

	if (msg.content.toLowerCase() === `${prefix}re`) {
		if(autorizado || MOD || Abuelo) {
			msg.delete({ timeout: 100 });
			client.user.setStatus('dnd');
			msg.channel.send({ embed: {
				color: 10038562,
				description: '❌ Server REINICIANDO! ❌',
			} });
			msg.channel.send('<a:DualRing3:834103677265903635> @everyone <a:DualRing3:834103677265903635>');
			// <a:load:752072604550168656>
		}
		else{
			msg.reply('No Perteneces al equipo administrativo!').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
	}


	const { MessageEmbed } = require('discord.js');

	if(msg.content.toLowerCase().startsWith (`${prefix}info`)) {
		if(autorizado || MOD || Abuelo) {

			const { guild, channel } = msg;

			const user = msg.mentions.users.first() || msg.member.user;
			const member = guild.members.cache.get(user.id);
			const memberRoles = member.roles.cache
				.filter((roles) => roles.id !== msg.guild.id)
				.map((role) => role.toString())
				.join(' ');

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

	if(msg.content.toLowerCase().startsWith (`${prefix}serverinfo`)) {
		if(autorizado || MOD || Abuelo) {

			const members = msg.guild.members.cache;
			const channels = msg.guild.channels.cache;


			const serverIcon = msg.guild.iconURL ({ dynamic:true });
			const { guild, channel } = msg;
			// console.log(member);
			let rolemap = msg.guild.roles.cache
				.sort((a, b) => b.position - a.position)
				.map(r => r)
				.join(' ');
			if (rolemap.length > 1024) rolemap = 'Demasiados roles para mostrar';
			if (!rolemap) rolemap = 'No hay roles';

			const embed = new MessageEmbed()
				.setAuthor(`Informacion de ${msg.guild.name}`)
				.setThumbnail(serverIcon)
				.addField('Presencia', [
					`**Online:** ${members.filter(member => member.presence.status === 'online').size}`,
					`**Ausentes:** ${members.filter(member => member.presence.status === 'idle').size}`,
					`**No molestar:** ${members.filter(member => member.presence.status === 'dnd').size}`,
					`**Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
					'\u200b',
				])
				.addFields(
					{
						name: 'Miembros verificados:',
						value: rolesmiembros.size,
					},
					{
						name: 'Total de bots:',
						value: msg.guild.members.cache.filter(m => m.user.bot).size,
					},
					{
						name: 'Total de canales de texto:',
						value: channels.filter(channel => channel.type === 'text').size,
					},
					{
						name: 'Total de canales de voz:',
						value: channels.filter(channel => channel.type === 'voice').size,
					},
					{
						name: 'Roles:',
						value: rolemap,
					},
					{
						name: 'Creado el:',
						value: guild.createdAt,
					},
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

	if (msg.content.toLowerCase() === `${prefix}online`) {
		if (autorizado || MOD || Abuelo) {
			client.user.setStatus('online');
		}
		else{
			msg.channel.send('**No Perteneces al equipo administrativo!!**').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
	}

	if (msg.content.toLowerCase() === `${prefix}ausente`) {
		if (autorizado || MOD || Abuelo) {
			client.user.setStatus('idle');
		}
		else{
			msg.channel.send('**No Perteneces al equipo administrativo!!**').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
	}

	if (msg.content.toLowerCase() === `${prefix}ocupado`) {
		if (autorizado || MOD || Abuelo) {
			client.user.setStatus('dnd');
		}
		else{
			msg.channel.send('**No Perteneces al equipo administrativo!!**').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
	}

	if (msg.content.toLowerCase() === `${prefix}invisible`) {
		if (autorizado || MOD || Abuelo) {
			client.user.setStatus('invisible');
		}
		else{
			msg.channel.send('**No Perteneces al equipo administrativo!!**').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
	}
	if (msg.content.toLowerCase() === `${prefix}presencia`) {
		const members = msg.guild.members.cache;
		if (autorizado || MOD || Abuelo) {
			msg.channel.send(`**Online:** ${members.filter(member => member.presence.status === 'online').size}\n**Ausentes:** ${members.filter(member => member.presence.status === 'idle').size}\n**No molestar:** ${members.filter(member => member.presence.status === 'dnd').size}\n**Offline:** ${members.filter(member => member.presence.status === 'offline').size}`);
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

	if (msg.content.toLowerCase() === `${prefix}uptime`) {
		if(autorizado || MOD || Abuelo) {
			msg.channel.send(uptime);
		}
		else{
			msg.channel.send('No Perteneces al equipo administrativo!').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
		}
	}

	// ///////////

	const argumento = msg.content.trim().split(/ +/g);
	const comando = argumento.shift().toLowerCase();


	if (msg.content.toLowerCase() === `${prefix}join`) {
		if (msg.author.id === '575698626739699728') {
			client.emit('guildMemberAdd', msg.member);
		}
	}

	if (msg.content.toLowerCase() === `${prefix}exit`) {
		if (msg.author.id === '575698626739699728') {
			client.emit('guildMemberRemove', msg.member);
		}
	}
	if (msg.content.toLowerCase() === `${prefix}jefe`) {
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

	if (msg.content.toLowerCase() === `${prefix}kill`) {
		if (msg.author.id === '575698626739699728') {
			msg.channel.send('Reiniciando').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
			msg.delete({ timeout: 10000 });
			process.exit();
		}
		else{
			msg.channel.send('Tu no eres mi Jefe!').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
			console.log(chalk.red(`Alguien probo usar el comando KILL ${msg.author}`));
		}
	}

	if (comando === `${prefix}exec`) {
		if(msg.author.id == '575698626739699728') {
			chlid.exec(argumento.join(' '), (err, res) => {
				if (err) return console.log(err);
				msg.channel.send(`Resultado del comando **${argumento.join(' ')}**`);
				msg.channel.send(res.slice(0, 2000), { code: 'js' });
			});
		}
	}

	if(msg.content.toLowerCase().startsWith(`${prefix}contador`)) {
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

	// ///////////////
	const argus = msg.content.trim().split(/ +/g);
	const command = argus.shift().toLowerCase();
	if (command === `${prefix}cc`) {
		if (autorizado || Abuelo || MOD) {
			let num1 = argus[0];
			if(isNaN(num1)) {
				msg.delete({ timeout: 100 });
				msg.reply('Pon un numero no letras. **Vaya admin!!**').then(msg => {
					msg.delete({ timeout: 5000 });
				});
			}
			else if(num1 !== null && num1 !== '') {
				num1++;
				msg.channel.bulkDelete(num1);
				num1--;
				msg.reply(`Borre ${num1} mensajes!`).then(msg => {
					msg.delete({ timeout: 5000 });
				});
			}
			else{
				msg.delete({ timeout: 100 });
				msg.reply('Especifica un numero!!!').then(msg => {
					msg.delete({ timeout: 5000 });
				});
			}
		}
		else{
			msg.delete({ timeout: 100 });
			msg.reply('**No Perteneces al equipo administrativo!**').then(msg => {
				msg.delete({ timeout: 5000 });
			});
		}
	}

	if (msg.content === `${prefix}file`) {
		if (autorizado || Abuelo || MOD) {
			msg.channel.send('**LOGS**', { files: ['/home/tatvania04/.pm2/logs/Atlantida-out.log'] });
		}
	}

	if(comando === `${prefix}logs`) {
		if (autorizado || Abuelo || MOD) {
			if(!isNaN(argumento), argumento <= 30) {
				chlid.exec(`tail -${argumento} /home/tatvania04/.pm2/logs/Atlantida-out.log`, (err, res) => {
					if (err) return console.log(err);
					// msg.channel.send(`Resultado del comando **${argumento.join(' ')}**`);
					msg.channel.send(res.slice(0, 2000), { code: 'js' });
				});
			}
			else{
				msg.channel.send('Asegurate que sea un **NUMERO** menor de 30');
			}
		}
	}


	if (comando === `${prefix}send`) {
		if (autorizado || Abuelo || MOD) {
			const canal = argumento[0];
			const mensaje = argumento.slice(1).join(' ');
			if(!isNaN(canal)) {
				client.channels.cache.get(canal).send(mensaje);
				msg.channel.send(`Envie el mensaje al canal <#${canal}>`);
			}
			else{
				msg.reply('Primero la id del canal luego el mensaje').then(msg => {
					msg.delete({ timeout: 5000 });
				}).catch(console.error);
			}
		}
		else{
			msg.reply('**No Perteneces al equipo administrativo!**').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
			msg.delete({ timeout: 10000 });
		}

	}

	if (comando === `${prefix}dm`) {
		if (autorizado || Abuelo || MOD) {
			const user = argumento[0];
			const mensaje = argumento.slice(1).join(' ');
			if(!isNaN(user)) {
				const dm = client.users.cache.get(user);
				dm.send(mensaje);
				msg.channel.send(`Envie el mensaje a <@${user}>`);
			}
			else{
				msg.reply('Primero la id de la persona luego el mensaje').then(msg => {
					msg.delete({ timeout: 10000 });
				}).catch(console.error);
			}
		}
		else{
			msg.reply('**No Perteneces al equipo administrativo!**').then(msg => {
				msg.delete({ timeout: 10000 });
			}).catch(console.error);
			msg.delete({ timeout: 10000 });
		}

	}


});

client.login(process.env.TOKEN);