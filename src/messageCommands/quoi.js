module.exports = {
	name: 'quoiii',
	async execute(message) {
		if (!message.guild) return;
		await message.reply('Feur !');
	},
};