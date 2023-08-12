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
			option.setName('explode')
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
		functions.rollDice(interaction, dice, explode, keep, adding);
	},
};