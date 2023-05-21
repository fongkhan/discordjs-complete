const MUSIC_PATH = './messContent/sound/bonk.mp3';
const functions = require('../utils/functions.js');


module.exports = {
	name: '!bonk',
	async execute(message) {
		message.delete();
		functions.playMusic(message, MUSIC_PATH);
	},
};