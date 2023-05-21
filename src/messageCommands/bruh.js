const MUSIC_PATH = './messContent/sound/bruh.mp3';
const functions = require('./../utils/functions.js');

module.exports = {
	name: '!bruh',
	async execute(message) {
		message.delete();
		functions.playMusic(message, MUSIC_PATH);
	},
};