const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require("axios");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokemon')
		.setDescription("Afficher les infos d'un pokemon")
		.addStringOption(option => 
			option.setName('id_ou_nom')
				.setDescription('id ou nom du pokemon')
				.setRequired(true)),
	async execute(interaction) {
		const pokemonName = interaction.options.getString('id_ou_nom');
		functions.getApiData(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonName}`);
		console.log(variables.api.data);
    	axios
    	  .get(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonName}`)
    	  .then((response) => {
    	  	const pokemon = response.data;
    	  	const pokemonResistance = pokemon.apiResistances.filter(resistance => resistance.damage_multiplier < 1);
    	  	const pokemonVulnerable = pokemon.apiResistances.filter(resistance => resistance.damage_multiplier > 1);
        	const pokemonEmbed = new EmbedBuilder()
        	  .setTitle(pokemon.name)
        	  .setURL(`https://www.pokepedia.fr/${pokemon.name}`)
        	  .addFields({name: "ID", value: pokemon.id.toString(), inline: true})
        	  .addFields({name: "Nom", value: pokemon.name, inline: true})
        	  .setThumbnail(pokemon.image)
        	  .addFields({name: "Type", value: pokemon.apiTypes.map(pokemonType => pokemonType.name).join(", "), inline: true})
        	  .addFields({name: "Generation", value: pokemon.apiGeneration.toString(), inline: true})
        	  .addFields({name: "Résistances de types", value: pokemonResistance.map(pokemonType => pokemonType.name).join(", "), inline: true})
        	  .addFields({name: "Vulnérabilité de types", value: pokemonVulnerable.map(pokemonType => pokemonType.name).join(", "), inline: true});
        	interaction.reply({ embeds: [pokemonEmbed]})
    	  })
    	  .catch((error) => {
    	    console.error(error);
    	    interaction.reply({content:"Il y a une erreur dans le nom du pokemon ou le pokemon n'existe pas.", ephemeral: true});
    	  });
	},
};