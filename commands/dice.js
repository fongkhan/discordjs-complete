const { SlashCommandBuilder } = require('discord.js');
const functions = require('../utils/functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dice')
		.setDescription('Roll a dice with a number of faces')
        .addStringOption(option =>
			option.setName('dice')
				.setDescription('dice to roll (ex: 1d6 or 2d10 + 5d20))')
				.setRequired(true))
        .addStringOption(option =>
			option.setName('exlpode')
				.setDescription('explode dice (ex: 6)')
				.setRequired(false))
        .addStringOption(option =>
			option.setName('keep')
				.setDescription('keep dice (ex: 2)')
				.setRequired(false))
        .addStringOption(option =>
			option.setName('adding')
				.setDescription('adding fixed value (ex: 5)')
				.setRequired(false)),
	async execute(interaction) {
        const dice = interaction.options.getString('dice');
        const explode = interaction.options.getString('explode');
        const keep = interaction.options.getString('keep');
        const adding = interaction.options.getString('adding');
		//functions.rollAllDice(interaction, dice, explode, keep, adding);
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
	},
};