// const { ActivityType } = require('discord.js');
const { joinVoiceChannel,
	getVoiceConnection,
	createAudioResource } = require('@discordjs/voice');
const variables = require('./variables.js');

module.exports = {
	playMusic, join, deco, changeActivity,
};

function playMusic(message, url) {
	if (!message.guild) return;
	const connection = variables.audioPlayer.connection;
	if (!connection) return;
	variables.lastActivityTimestamp.value = Date.now();
	variables.audioPlayer.connection.subscribe(variables.audioPlayer.musicStream);
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
		variables.audioPlayer.connection = getVoiceConnection(message.member.voice.channel.guild.id);
		variables.lastActivityTimestamp.value = Date.now();
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
		variables.lastActivityTimestamp.value = null;
	}
	else {
		message.channel.send('You need to join a voice channel first!')
			.then(msg => {
				setTimeout(() => msg.delete(), 2000);
			});
	}
}

function changeActivity(client, type, message) {
	client.user.setActivity(message, { type: type });
}