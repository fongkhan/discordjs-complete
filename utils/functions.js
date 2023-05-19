// require all the modules needed
const { joinVoiceChannel,
	getVoiceConnection,
	createAudioResource } = require('@discordjs/voice');
const variables = require('./variables.js');
const lists = ('./activity.js');
const { REST, Routes, ActivityType } = require('discord.js');
const { clientId, token } = require('./../config.json');
const fs = require('node:fs');
const dice = require('../commands/dice.js');

// export the functions to be used in the commands
module.exports = {
	playMusic, join, deco, changeActivity, refreshCommands, rollDice,
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
		return
	};
	clInteraction.client.user.setActivity(message, { type: actValue });
	console.log('activity set to ' + type + ' | with the message : ' + message);
	clInteraction.reply({content: 'Activity Changed !', ephemeral: true});
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
	return activityType;};

// refresh the commands of the bot
function refreshCommands() {
	const commands = [];
	// Grab all the command files from the commands directory you created earlier
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const command = require(`./../commands/${file}`);
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
// /roll 2d6 + 3d10 : Roll two six-sided dice and three ten-sided dice.
// /roll 3d6 + 5 : Roll three six-sided dice and add five. Other supported static modifiers are add (+), subtract (-), multiply (*), and divide (/).
// /roll 1d20 - 4 : Roll one 20-sided die and subtract four.
// /roll 3d6 e6 : Roll three six-sided dice and explode on sixes. Some game systems call this 'open ended' dice. If the number rolled is greater than or equal to the value given for this option, the die is rolled again and added to the total. If no number is given for this option, it is assumed to be the same as the number of sides on the die. Thus, '3d6 e' is the same as '3d6 e6'. The dice will only explode once with this command. Use "ie" for indefinite explosions.
// /roll 3d6 ie6 : Roll three six-sided dice and explode on sixes indefinitely within reason. We will cap explosions at 100 // rolls to prevent abuse.
// 
// /roll 3d10 d1 : Roll three ten-sided dice and drop one die. The lowest value will be dropped first. NOTE: These dice are // dropped before any dice are kept with the following k command. Order of operations is : roll dice, drop dice, keep dice
// 
// /roll 3d10 k2 : Roll three ten-sided dice and keep two. The highest value rolled will be kept.
// 
// /roll 4d6 r2 : Roll four six-sided dice and reroll any that are equal to or less than two once. Use ir for indefinite rerolls.
// 
// /roll 4d6 ir2 : Roll four six-sided dice and reroll any that are equal to or less than two (and do the same to those dice). // This is capped at 100 rerolls per die to prevent abuse.
// 
// /roll 6d10 t7 : Roll six ten-sided dice and any that are seven or higher are counted as a success. The dice in the roll are // not added together for a total. Any die that meets or exceeds the target number is added to a total of successes.
// 
// /roll 5d10 t8 f1 : f# denotes a failure number that each dice must match or be beneath in order to count against successes. // These work as a sort of negative success and are totaled together as described above. In the example roll, roll five // ten-sided dice and each dice that is 8 or higher is a success and subtract each one. The total may be negative. If the option // is given a 0 value, that is the same as not having the option at all thus a normal sum of all dice in the roll is performed // instead.
// /roll 4d10 kl3 : Roll four ten-sided dice and keep the lowest three dice rolled.
// /roll purge 10: Purge the last 10 messages from channel. The purge value can be between 2 to 100 messages and requires the // user to have the "manage messages" or "administrator" role.
// /roll 4d6 ! Hello World!: Roll four six-sided dice and add comment to the roll.
// /roll 6 4d6 : Roll 6 sets of four six-sided dice. A size of a set can be between 2 and 20.
// /roll s 4d6 : Simplify roll output by not showing the tally.
// /roll 4d6 ! unsort or !roll ul 4d6: Roll four six-sided dice and unsort the tally.
// /roll help : Displays basic usage instructions.
// /roll help alias : Displays alias instructions.
// /roll help system : Displays game system instructions.
// /roll donate : Get donation information on how to help support the bot!
// These commands can be combined. For example:
// /roll 10d6 e6 k8 +4 : Roll ten six-sided dice , explode on sixes and keep eight of the highest rolls and add four.
function rollDice(interaction, dice, explode, keep, adding) {
	// split the dices to get the number of dices and the number of faces
    const nbdiceroll = dice.split('+').join('-').split('-').join('*').split('*').join('/').split('/');
	let result = 0;
	// for each dices to roll
	for (let dice = 0; dice < nbdiceroll.length; dice++) {
	    if (nbdiceroll[dice].includes('d') === false) { continue; }
		// get the number of dices and the number of faces for the roll
		const nbdice = nbdiceroll[dice].split('d')[0];
		const maxface = nbdiceroll[dice].split('d')[1];
		// roll dices
		const resultdice = nbdice*(Math.floor(Math.random() * maxface));
		// add the result to the total
		result += resultdice;
	}
	interaction.reply({ content: `Result of ${interaction.user.username}\ndices : ${dice}\nresult : ${result}`, ephemeral: false });
}