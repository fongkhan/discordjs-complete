const functions = require('./../utils/functions.js');

module.exports = {
	name: '!deco',
	async execute(message) {
		functions.deco(message, message.member.voice.channel);
	},
};