const { createAudioPlayer } = require('@discordjs/voice');
const audioPlayer = {
	musicStream: createAudioPlayer(),
	connection: null,
	connectionId: null,
};

function get(variable) {
	return variable;
}

function set(variable, newValue) {
	variable = newValue;
}

module.exports = {
	audioPlayer, get, set,
};