/* eslint-disable no-unused-vars */
const { joinVoiceChannel } = require('@discordjs/voice');
const functions = require('./../utils/functions.js');

module.exports = {
	name: '!join',
	async execute(message) {
		functions.join(message, message.member.voice.channel);
	},
};