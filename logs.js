// ///////////////////// LOGS ////////////////////////////////////// //
const chalk = require('chalk');
module.exports = (client) => {
	client.on('message', async message => {
		if(message.author.bot) return;
		console.log(`${message.author.tag} said: ${message.content}`);

	});

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
			console.log(chalk.bold.red(`El mensaje de ${message.author.tag} fue borrado por ${executor.tag}. El contenido fue: ${message.content}`));
		}
		else {
			console.log(chalk.bold.yellow(`${message.author.tag} Borro su mensaje. El contenido fue: ${message.content}`));
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

// ////////////////////////// TERMINA lOGS /////////////////////////////////// //