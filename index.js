const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = "MzgyMjY4MDQ0ODM3MTI2MTQ0.......";

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.channel.send('pong');
  }
  if (/.*bot.*/i.test(message.content)) {
    message.react("🤖");
    message.reply('je suis une IA !', {tts: true});
  }
});

client.on('channelCreate', chan => {
  if (chan.type === 'text') {
    chan.send('First !').catch((err) => {
      console.log(err);
    });
  }
});

client.on('disconnect', (event) => {
  if (event.wasClean) {
    console.log('bye!');
    process.exit(0);
  } else {
    console.log('Unexpected disconnection: ' + event.reason);
    process.exit(1);
  }
});

client.login(token).then((res) => {
  let general = client.channels.find('name', 'general');

  client.user.setUsername('Jarvis');
  general.send("De retour !").catch(console.log);
  client.user.setGame('Kamoulox!')
    .catch((err) => {
      console.log('setGame error: ' + err);
    });

}, (err) => {
  console.log("login failed: " + err);
  process.exit(1);
});
