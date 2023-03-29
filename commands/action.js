const { SlashCommandBuilder } = require('discord.js');

const Reponses = [
	'Arhen dort',
	'Arhen miaule',
	'Arhen ouvre un oeil et vous observe',
	'Arhen crache les pois',
	'Arhen vous regarde avec intérêt',
	'Arhen réclame à manger',
	'Arhen patoune sur son couffin',
	'Arhen pioune: Il réclame Clothilde ❤️',
	'Arhen vous donne un coup de tête',
	'Arhen veut jouer',
	'Arhen fait sa toilette, vous le dérangez',
	'Arhen veut une croquette gâteau',
	'Arhen se cache, vous lui avez fait peur',
	'Arhen bouge une oreille en vous regardant, il vous salut',
	'Arhen a le dos rond et la grosse queue',
	'Arhen joue avec ses jouets',
	'Arhen vous niaque le mollet avant de partir en courant, il veut jouer',
	'Arhen vous tourne le dos',
	'Arhen pose pour une photo, c\'est le moment d\'en profiter',
	'Arhen dort profondément dans son panier (qu\'il est mignon ❤️)',
	'Arhen vous regarde d’un air hautain',
	'Arhen vous entend mais vous ignore',
	'Arhen vous regarde mais n\'en a rien à faire',
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('action')
		.setDescription('joue avec Arhen'),
	async execute(interaction) {
		const Reponse = Reponses[Math.floor(Math.random() * Reponses.length)];
		await interaction.reply(Reponse);
	},
};