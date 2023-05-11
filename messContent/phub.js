const MUSIC_PATH = './messContent/sound/phub.mp3';
const functions = require('./../utils/functions.js');


module.exports = {
	name: '!phub',
	async execute(message) {
		message.delete();
		functions.playMusic(message, MUSIC_PATH);

	},
};