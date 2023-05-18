# discordjs-basis

This git is a squeleton of a discord bot using discord.js
This is a discordjs bot easy to use and handle !
It has all the commands i use.
You can fork it and add/change/remove commands

# Installation
Install all dependecies from node

```sh
npm install
```

Then Add the config.json file with the keys of your bot:

```js
{
  "token": "ENTER YOUR TOKEN HERE",
  "clientId": "ENTER YOU CLIENTID HERE"
}
```

# Usage
To start the bot, use the command:

```sh
node index.js
```

I recommend using nodemon to restart the bot automatically when you change something in the code:

```sh
nodemon index.js
```

To install nodemon:

```sh
npm install -g nodemon
```
it will install nodemon globally on your computer so you can use it in any project you want to.

# Commands
There is 2 types of commands:
- The commands in the commands folder (the Slash commands)
- The commands in the messCommands folder (the message commands)

When you do something that is repetiting in your code, you can create a function in the functions file in utils folder and call it in your code like this:

```js
const functions = require('./../utils/functions.js');
```

# Contributing
If you want to contribute to this project and make it better, your help is very welcome.
You can add new commands, improve the code, etc...
Fork this repo and make a pull request.