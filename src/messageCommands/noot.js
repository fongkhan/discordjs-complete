const MUSIC_PATH = './messContent/sound/nootnoot.mp3';
const functions = require('./../utils/functions.js');


module.exports = {
	name: '!noot',
	async execute(message) {
		message.delete();
		functions.playMusic(message, MUSIC_PATH);
	},
};