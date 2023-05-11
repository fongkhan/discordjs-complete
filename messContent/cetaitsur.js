const MUSIC_PATH = './messContent/sound/cetaitsur.mp3';
const functions = require('./../utils/functions.js');


module.exports = {
	name: '!ctsur',
	async execute(message) {
		message.delete();
		functions.playMusic(message, MUSIC_PATH);
	},
};