
# Twitch Bit-Based Voting Overlay

A simple Node.js application that creates a live voting overlay for your Twitch stream. Viewers can vote on two options, "a" or "b", using bits (cheers), and the results are displayed as a real-time 50/50 slider. This is designed to be added as a browser source in OBS or other streaming software.

## Features

- **Real-time vote counting:** Votes are instantly tallied and displayed.
- **50/50 Slider:** A clean, visual representation of the vote split between two options.
- **Bit-Powered Voting:** Viewers vote by cheering. The number of bits corresponds to the number of votes.
- **Test Command:** Broadcasters and moderators can use a chat command to add test votes without using bits.
- **Easy OBS Integration:** Simply add it as a browser source.

## Setup and Installation

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### 2. Install Dependencies

Navigate to the `twitch-voting-app` directory in your terminal and run:

```bash
npm install
```

This will install the necessary libraries (`express`, `socket.io`, and `tmi.js`).

### 3. Configure the Application

Open the `server.js` file and edit the following configuration section:

```javascript
const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'YOUR_USERNAME',       // <-- CHANGE THIS
		password: 'YOUR_OAUTH_TOKEN'  // <-- CHANGE THIS
	},
	channels: [ 'YOUR_CHANNEL_NAME' ] // <-- CHANGE THIS
});
```

- **`YOUR_USERNAME`**: Your Twitch bot's username. It's recommended to use a separate Twitch account for your bot.
- **`YOUR_CHANNEL_NAME`**: The name of the Twitch channel you want the bot to join (your main channel).
- **`YOUR_OAUTH_TOKEN`**: Your Twitch bot's OAuth token. 
    1. Go to [twitchtokengenerator.com](https://twitchtokengenerator.com).
    2. Click "Customize..." and select the `chat:read` and `bits:read` scopes.
    3. Click "Generate Token!" and authorize with your bot's Twitch account.
    4. Copy the **Access Token** and paste it here. **Keep this token secret!**

## Running the Application

Once configured, start the server from the `twitch-voting-app` directory:

```bash
node server.js
```

You should see the message `listening on *:3000` in your terminal. This means the server is running.

## Adding to OBS

1.  In OBS, click the `+` under "Sources" to add a new source.
2.  Select **Browser**.
3.  Name it something like "Voting Overlay".
4.  In the properties window, set the **URL** to `http://localhost:3000`.
5.  Set the **Width** and **Height** to your desired dimensions.
6.  Click **OK**.

The slider should now appear in your OBS scene.

## How to Use

### Live Voting

Viewers can vote by cheering with the options `a` or `b`. The number of bits they cheer is the number of votes they cast.

- **Example:** `cheer100 a` will add 100 votes to option A.
- **Example:** `cheer50 b` will add 50 votes to option B.

### Test Command

To test the overlay without spending bits, the broadcaster or a moderator can use the `!vote` command.

- **Usage:** `!vote <option>`
- **Example:** `!vote a` adds 1 test vote to option A.
- **Example:** `!vote b` adds 1 test vote to option B.

## Customization

To change the appearance of the slider (colors, fonts, size), you can edit the `public/style.css` file.
