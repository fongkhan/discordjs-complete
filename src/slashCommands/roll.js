/* eslint-disable quotes */
const { SlashCommandBuilder } = require("discord.js");
const functions = require("./../utils/functions.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription(
			"Entrez la formule du dé personnalisé (ex: d6, d20, 2d8, etc.)",
		)
		.addStringOption((option) =>
			option.setName("dice")
				.setDescription("Dice to roll")
				.setRequired(true),
		),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: false });
		const dice = interaction.options.getString("dice");
		const flag = functions.rollDice(interaction, dice);
		if (flag === false) {
			await interaction.followUp({
				content: `Dice couldn't be rolled.` });
		}
	},
};