// refresh commands with function refreshCommands() in deploy-commands.js
const { SlashCommandBuilder } = require('discord.js');
const functions = require('../utils/functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('refreshcommands')
		.setDescription('rafraichit les commandes en slash'),
	async execute(interaction) {
		await interaction.reply({content: `Rafraichissement des commandes en cours...`, ephemeral: true});
        functions.refreshCommands();
        await interaction.editReply({content: 'Rafraichissement des commandes terminé !', ephemeral: true});
	},
};