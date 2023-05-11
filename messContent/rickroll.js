const MUSIC_PATH = './messContent/sound/rickroll.mp3';
const functions = require('./../utils/functions.js');


module.exports = {
	name: '!rick',
	async execute(message) {
		message.delete();
		functions.playMusic(message, MUSIC_PATH);
	},
};