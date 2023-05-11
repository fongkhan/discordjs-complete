const MUSIC_PATH = './messContent/sound/objection.mp3';
const functions = require('./../utils/functions.js');


module.exports = {
	name: '!obj',
	async execute(message) {
		message.delete();
		functions.playMusic(message, MUSIC_PATH);

	},
};