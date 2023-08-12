const { SlashCommandBuilder } = require('discord.js');
const Roll = require('roll');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Entrez la formule du dé personnalisé (ex: d6, d20, 2d8, etc.)')
		.addStringOption(option => option.setName('dice').setDescription('Dice to roll').setRequired(true)),
	async execute(interaction) {
        const roll = new Roll();
        const result = roll.roll(interaction.options.getString('dice'));
		return interaction.reply({ content: `Résultat du lancer: ${result.result}\nDétail: ${result.rolled}` });
	},
};
