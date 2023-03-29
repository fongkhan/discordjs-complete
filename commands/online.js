const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('online')
		.setDescription('combien de personnes sont connectés ?'),
	async execute(interaction) {
		// First use guild.members.fetch to make sure all members are cached
		guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
			const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online');
			// Now you have a collection with all online member objects in the totalOnline variable
			console.log(`There are currently ${totalOnline.size} members online in this guild!`);
		});
	},
};