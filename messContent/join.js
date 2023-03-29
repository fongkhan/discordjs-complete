const { joinVoiceChannel } = require('@discordjs/voice');


module.exports = {
  name: '!join',
  async execute(message) {
    if (!message.guild) return;
    message.delete();
    if (message.member.voice.channel) {
    	const voiceChannel = message.member.voice.channel;
        const connection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
		});
    } else {
      message.channel.send('You need to join a voice channel first!')
      	.then(msg => {
      		setTimeout(() => msg.delete(), 2000)
      	});
    }
  },
};