const { createAudioPlayer } = require('@discordjs/voice');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  name: '!deco',
  async execute(message) {
    if (!message.guild) return;
    message.delete();
    if (message.member.voice.channel) {
    	const voiceChannel = message.member.voice.channel
    	const connection = getVoiceConnection(voiceChannel.guild.id);
    	connection.destroy();
    } else {
      message.channel.send('You need to join a voice channel first!');
    }
  },
};