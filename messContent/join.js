/* eslint-disable no-unused-vars */
const { joinVoiceChannel } = require('@discordjs/voice');
const functions = require('./../utils/functions.js');

module.exports = {
	name: '!join',
	async execute(message) {
		if (message.member.voice.channel) {
			functions.join(message.member.voice.channel);
		}
		else {
			message.channel.send('You need to join a voice channel first!')
				.then(msg => {
					setTimeout(() => msg.delete(), 2000);
				});
		}
	},
};