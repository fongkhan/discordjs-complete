# discordjs-basis

This folder is a global folder for all the commands and variables of the bot.

## Usage

To use this folder, you need to require it in your code like this:

```js
const function = require('./../functions.js');
const variables = require('./../variables.js');
```

## Functions

Here is the list of all the functions in this folder:
playMusic: play music in a voice channel
join: join a voice channel
deco: disconnect from a voice channel
changeActivity: change the activity of the bot (Playing Minecraft, Watching a movie, etc...) (only for administrator of the server)
refreshCommands: refresh the slash commands of the bot

Here is the list of all the variables in this folder:
audioPlayer: the audio player of the bot
lastActivityTimestamp: the timestamp of the last activity of the bot and the interval to disconnect the bot if there is no activity
command_names: the list of all the commands with the '!' prefix of the bot (used for voice channel module)