module.exports = {
	name: 'comme ma',
	async execute(message) {
		if (!message.guild) return;
		await message.reply('Bite!');
	},
};