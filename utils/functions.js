const { joinVoiceChannel,
	getVoiceConnection,
	createAudioResource } = require('@discordjs/voice');
const variables = require('./variables.js');

function playMusic(message, url) {
	// TODO: faire des getter et setter pour les variables
	variables.set(variables.audioPlayer.connection, getVoiceConnection(message.member.voice.channel.guild.id));
	variables.audioPlayer.connection.subscribe(variables.audioPlayer.musicStream);
	if (!message.guild) return;
	const resource = createAudioResource(url);
	variables.audioPlayer.musicStream.play(resource);
}

function join(message, voiceChannel) {
	if (message.member.voice.channel) {
		joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
		});
		// variables.set(variables.audioPlayer.connection, getVoiceConnection(message.member.voice.channel.guild.id));
	}
	else {
		message.channel.send('You need to join a voice channel first!')
			.then(msg => {
				setTimeout(() => msg.delete(), 2000);
			});
	}
}

function deco(message, voiceChannel) {
	if (!message.guild) return;
	message.delete();
	if (message.member.voice.channel) {
		const connection = getVoiceConnection(voiceChannel.guild.id);
		connection.destroy();
	}
	else {
		message.channel.send('You need to join a voice channel first!')
			.then(msg => {
				setTimeout(() => msg.delete(), 2000);
			});
	}
}

module.exports = {
	playMusic, join, deco,
};