const functions = require('./../utils/functions.js');

module.exports = {
	name: '!deco',
	async execute(message) {
		if (!message.guild) return;
		message.delete();
		if (message.member.voice.channel) {
			functions.deco(message.member.voice.channel);
		}
		else {
			message.channel.send('You need to join a voice channel first!');
		}
	},
};