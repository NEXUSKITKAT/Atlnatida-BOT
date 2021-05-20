const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = (client) => {

	const stats = {
		serverID: '832277845157347398',
		total: '833818248116961280',
		member:'833818503156465684',
		bots:'833818644139606027',
	};

	client.on('guildMemberAdd', async member => {

		if(member.guild.id !== stats.serverID) return;
		client.channels.cache.get(stats.total).setName(`Usuarios Totales: ${member.guild.memberCount}`);
		client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
		console.log(chalk.green('Actualizando contador'));

		const canal = member.guild.channels.cache.find(c => c.name === '🛬ʙɪᴇɴᴠᴇɴɪᴅᴀ');
		const serverIcon = member.guild.iconURL ({ dynamic:true });
		if(!canal) return;
		const Embed = new Discord.MessageEmbed()
			.setColor('#2DD5FF')
			.setTitle(`Bienvenido a ${member.guild.name}`)
			.setURL('https://youtu.be/F0lynllSosw')
			.setAuthor(member.user.username, member.user.displayAvatarURL())
			.setDescription(`Bienvenido <@${member.user.id}> estamos encantados de que quieras formar parte de la comunidad **Atlantida RP**!`)
			.setThumbnail(serverIcon)
			.addField('No olvides de leer la normativa', 'Disfruta tu estancia en Atlantida RP', true)
			.setTimestamp()
			.setFooter(member.guild.name, serverIcon);

		canal.send(Embed);
		member.send('Bienvenido, estamos encantados de que quieras formar parte de la comunidad **Atlantida RP**. Disfruta tu estancia.\nNo olvides de leer la normativa en:<#832335511439147090> \n **Verificate en <#840631476335804456>**');
		console.log(chalk.bgGreen(`${member.user.tag} entro al Server`));

	});


	client.on('guildMemberRemove', async member => {

		if(member.guild.id !== stats.serverID) return;
		client.channels.cache.get(stats.total).setName(`Usuarios Totales: ${member.guild.memberCount}`);
		client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
		console.log(chalk.green('Actualizando contador'));

		const canal = member.guild.channels.cache.find(c => c.name === '🛫ꜱᴀʟɪᴅᴀꜱ');
		const serverIcon = member.guild.iconURL ({ dynamic:true });
		if(!canal) return;
		const Embed = new Discord.MessageEmbed()
			.setColor('#EC1919')
			.setDescription(`<@${member.user.id}> **se fue.**`)
			.setAuthor(member.user.tag, member.user.displayAvatarURL())
			.setThumbnail(member.user.displayAvatarURL({ dynamic:true, size: 128 }))
			.setTimestamp()
			.setFooter(member.guild.name, serverIcon);
		canal.send(Embed);
	});

};