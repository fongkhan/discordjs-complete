const MUSIC_PATH = './messContent/sound/boy.mp3';
const functions = require('./../utils/functions.js');


module.exports = {
	name: '!boy',
	async execute(message) {
		message.delete();
		functions.playMusic(message, MUSIC_PATH);
	},
};