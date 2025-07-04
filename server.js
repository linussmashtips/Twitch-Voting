
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const tmi = require('tmi.js');

app.use(express.static('public'));

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'your-username',
		password: 'your-oauth-token'
	},
	channels: [ 'your-channel-name' ]
});

client.connect();

let votes = {};

client.on('message', (channel, tags, message, self) => {
	if(self) return;

    if(tags.bits) {
        const amount = parseInt(tags.bits, 10);
        const vote = message.split(' ')[0].toLowerCase();

        if(!votes[vote]) {
            votes[vote] = 0;
        }
        votes[vote] += amount;
        io.emit('votes', votes);
    }

    // Test vote command for broadcaster/mods
    if (message.toLowerCase().startsWith('!vote ')) {
        if (tags.badges && (tags.badges.broadcaster || tags.badges.moderator)) {
            const parts = message.split(' ');
            if (parts.length >= 2) {
                const vote = parts[1].toLowerCase();
                if (!votes[vote]) {
                    votes[vote] = 0;
                }
                votes[vote] += 1; // Add 1 vote for the test
                io.emit('votes', votes);
            }
        }
    }
});

io.on('connection', (socket) => {
  socket.emit('votes', votes);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
