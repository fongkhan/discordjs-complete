const MUSIC_PATH = './messContent/sound/qindignite.mp3';
const functions = require('./../utils/functions.js');


module.exports = {
	name: '!indignite',
	async execute(message) {
		message.delete();
		functions.playMusic(message, MUSIC_PATH);
	},
};