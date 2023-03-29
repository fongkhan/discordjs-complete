const MUSIC_PATH = "./messContent/sound/noice.mp3";
const { getVoiceConnection,
        createAudioPlayer,
        createAudioResource, } = require('@discordjs/voice');
    const audioPlayer = {
      musicStream: createAudioPlayer(),
      connection: null,
      connectionId: null,
    }

module.exports = {
  name: '!noice',
  async execute(message) {
    message.delete();
    audioPlayer.connection = getVoiceConnection(message.member.voice.channel.guild.id);
    audioPlayer.connection.subscribe(audioPlayer.musicStream);
    if (!message.guild) return;
    playMusic(MUSIC_PATH);
  },
};

function playMusic(url){
    const resource = createAudioResource(MUSIC_PATH)
    audioPlayer.musicStream.play(resource);
}