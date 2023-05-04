const { joinVoiceChannel,
	getVoiceConnection,
	createAudioPlayer,
	createAudioResource } = require('@discordjs/voice');
const audioPlayer = {
	musicStream: createAudioPlayer(),
	connection: null,
	connectionId: null,
};

function playMusic(url) {
	const resource = createAudioResource(url);
	audioPlayer.musicStream.play(resource);
}

function join(voiceChannel) {
	joinVoiceChannel({
		channelId: voiceChannel.id,
		guildId: voiceChannel.guild.id,
		adapterCreator: voiceChannel.guild.voiceAdapterCreator,
	});
}

function deco(voiceChannel) {
	const connection = getVoiceConnection(voiceChannel.guild.id);
	connection.destroy();
}

module.exports = {
	playMusic, join, deco,
};