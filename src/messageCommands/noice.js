const MUSIC_PATH = './messContent/sound/noice.mp3';
const functions = require('./../utils/functions.js');


module.exports = {
	name: '!noice',
	async execute(message) {
		message.delete();
		functions.playMusic(message, MUSIC_PATH);

	},
};
