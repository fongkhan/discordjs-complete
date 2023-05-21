const functions = require('./../utils/functions.js');
const MUSIC_PATH = './messContent/sound/dundun.mp3';


module.exports = {
	name: '!dundun',
	async execute(message) {
		message.delete();
		functions.playMusic(message, MUSIC_PATH);
	},
};