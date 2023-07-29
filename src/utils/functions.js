// require all the modules needed
const { joinVoiceChannel,
	getVoiceConnection,
	createAudioResource } = require('@discordjs/voice');
const variables = require('./variables.js');
const { REST, Routes, ActivityType } = require('discord.js');
const { clientId, token } = require('./../config.json');
const fs = require('node:fs');
const axios = require('axios');
const path = require('node:path');

// export the functions to be used in the commands
module.exports = {
	playMusic, join, deco, changeActivity, refreshCommands, rollDice, getApiData, checkTwitchStreamers,
};

// play the music from the url given in the command message in the voice channel the user is in
function playMusic(message, url) {
	if (!message.guild) return;
	const connection = variables.audioPlayer.connection;
	if (!connection) return;
	variables.lastActivityTimestamp.lastact = Date.now();
	variables.audioPlayer.connection.subscribe(variables.audioPlayer.musicStream);
	const resource = createAudioResource(url);
	variables.audioPlayer.musicStream.play(resource);
}

// join the voice channel the user is in
function join(message, voiceChannel) {
	if (message.member.voice.channel) {
		joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
		});
		variables.audioPlayer.connection = getVoiceConnection(message.member.voice.channel.guild.id);
		variables.lastActivityTimestamp.lastact = Date.now();
	}
	else {
		message.channel.send('You need to join a voice channel first!')
			.then(msg => {
				setTimeout(() => msg.delete(), 2000);
			});
	}
}

// deconnect the bot from the voice channel the user is in
function deco(message, voiceChannel) {
	if (!message.guild) return;
	message.delete();
	if (message.member.voice.channel) {
		const connection = getVoiceConnection(voiceChannel.guild.id);
		connection.destroy();
		variables.lastActivityTimestamp.lastact = null;
	}
	else {
		message.channel.send('You need to join a voice channel first!')
			.then(msg => {
				setTimeout(() => msg.delete(), 2000);
			});
	}
}

// change the activity of the bot (playing, listening, watching, streaming) only for admins of the server
function changeActivity(isClient, clInteraction, type, message) {
	// transform the type of activity to the one used by discord.js
	const actValue = setValueActivity(type);
	if (isClient) {
		clInteraction.user.setActivity(message, { type: actValue });
		console.log('activity set to ' + type + ' | with the message : ' + message);
		return;
	}
	clInteraction.client.user.setActivity(message, { type: actValue });
	console.log('activity set to ' + type + ' | with the message : ' + message);
	clInteraction.reply({ content: 'Activity Changed !', ephemeral: true });
}

function setValueActivity(value) {
	// change the value of activite to the one used by discord.js
	let activityType;
	switch (value) {
	case 'Playing':
		activityType = ActivityType.Playing;
		break;
	case 'Streaming':
		activityType = ActivityType.Streaming;
		break;
	case 'Listening':
		activityType = ActivityType.Listening;
		break;
	case 'Watching':
		activityType = ActivityType.Watching;
		break;
	case 'Custom':
		activityType = ActivityType.Custom;
		break;
	case 'Competing':
		activityType = ActivityType.Competing;
		break;
	default:
		activityType = ActivityType.Playing;
		break;
	}
	return activityType;
}

// refresh the commands of the bot
function refreshCommands() {
	const commands = [];
	// Grab all the command files from the commands directory you created earlier
	const commandPath = path.join(__dirname, './../slashCommands/');
	const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const command = require(`./../slashCommands/${file}`);
		commands.push(command.data.toJSON());
	}

	// Construct and prepare an instance of the REST module
	const rest = new REST({ version: '10' }).setToken(token);

	// and deploy your commands!
	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands },
			);

			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		}
		catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
}

// function to return the result of dices launched by the user
// example : /roll 2d6 => return the result of 2 dices of 6 faces
// eslint-disable-next-line no-unused-vars
function rollDice(interaction, dice, explode, keep, adding) {
	// split the dices to get the number of dices and the number of faces
	const nbdiceroll = dice.split('+').join('-').split('-').join('*').split('*').join('/').split('/');
	let result = 0;
	// for each dices to roll
	for (const element of nbdiceroll) {
		if (element.includes('d') === false) { continue; }
		// get the number of dices and the number of faces for the roll
		const nbdice = element.split('d')[0];
		const maxface = element.split('d')[1];
		// roll dices
		const resultdice = nbdice * (Math.floor(Math.random() * maxface));
		// add the result to the total
		result += resultdice;
	}
	interaction.reply({ content: `Result of ${interaction.user.username}\ndices : ${dice}\nresult : ${result}`, ephemeral: false });
}

// function to retrieve the data fro an API and return it in a JSON format
async function getApiData(interaction, pokemonName) {
	axios
		.get(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonName}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error(error);
			interaction.reply({ content:'Il y a une erreur dans la récupération des données', ephemeral: true });
		});
}

// async function to check if a stream on twitch is online and send a message if it is the case
async function checkTwitchStreamers(client) {
	// get the list of streamers from the variables
	const streamers = variables.streamers.streamers;
	// for each streamer
	for (const element of streamers) {
		// get the data from the api with axios and the streamer name without the twitch api url
		axios // eslint-disable-next-line no-await-in-loop
			.get(`https://api.twitch.tv/helix/streams?user_login=${element}`, {
				headers: { client_id:'4h7e1a40cq336kzgcv3b1gsv0pl7xv' },
			})
			.then(async (response) => {
				// if the streamer is online
				if (response.data.data.length > 0) {
					// get the data of the streamer
					const data = response.data.data[0];
					// get the data of the game the streamer is playing
					const game = await axios.get(`https://api.twitch.tv/helix/games?id=${data.game_id}`, {
						headers: { client_id:'4h7e1a40cq336kzgcv3b1gsv0pl7xv' },
					});
					// send a message in the channel of the streamer
					client.channels.cache.get('884672836550373888').send(`${data.user_name} is live !\nhttps://www.twitch.tv/${data.user_name}\nPlaying : ${game.data.data[0].name}`);

				}
			}) // eslint-disable-next-line no-console
			.catch((error) => console.error(error));
	}
}