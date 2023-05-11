// TODO : à finir
// const command_names = require('index.js');

module.exports = {
	name: '!commandes',
	async execute(message) {
		if (!message.guild) return;
		message.delete();
		message.channel.send('!bonk / !boy / !bruh / !ctsur / !commandes / !deco / !dundun / !join / !noice / !noot / !obj / !phub / !indignite / !rick');
	},
};