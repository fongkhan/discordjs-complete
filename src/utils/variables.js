const { createAudioPlayer } = require('@discordjs/voice');
const audioPlayer = {
	_musicStream: createAudioPlayer(),
	_connection: null,
	_connectionId: null,
	get musicStream() {
		return this._musicStream;
	},
	set musicStream(newMusicStream) {
		this._musicStream = newMusicStream;
	},
	get connection() {
		return this._connection;
	},
	set connection(newConnection) {
		this._connection = newConnection;
	},
	get connectionId() {
		return this._connectionId;
	},
	set connectionId(newConnectionId) {
		this._connectionId = newConnectionId;
	},
};

const lastActivityTimestamp = {
	_lastact: null,
	_interval: 1800000,
	get lastact() {
		return this._lastact;
	},
	set lastact(newlastact) {
		this._lastact = newlastact;
	},
	get interval() {
		return this._interval;
	},
	set interval(newInterval) {
		this._interval = newInterval;
	},
};

const command_names = {
	_names: null,
	get names() {
		return this._names;
	},
	set names(newNames) {
		this._names = newNames;
	},
};


// set getter and setter of a list with each element being a hyperlink to streamers on twitch only
// ex : fongkhan
const streamers = {
	_streamers: ['fongkhan'],
	get streamers() {
		return this._streamers;
	},
	set streamers(newStreamers) {
		this._streamers = newStreamers;
	},
};

const youtube_link = {
	_link: null,
	get link() {
		return this._link;
	},
	set link(newLink) {
		this._link = newLink;
	},
};

module.exports = {
	audioPlayer, lastActivityTimestamp, command_names, streamers, youtube_link,
};