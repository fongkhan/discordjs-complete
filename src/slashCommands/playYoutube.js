const { SlashCommandBuilder } = require('discord.js');
const functions = require('./../utils/functions.js');
const variables = require('./../utils/variables.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play-from-youtube')
		.setDescription('Play a youtube video in the voice channel you are in.')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('The url of the youtube video you want to play.')
				.setRequired(true)),
	async execute(interaction) {
		// download the video from youtube
		functions.downloadYoutubeVideo(interaction, interaction.options.getString('url'));
		// join the voice channel the user is in
		functions.join(interaction, interaction.member.voice.channel);
		// play the video in the voice channel
		functions.playMusic(interaction, variables.youtube_link.link);
	},
};