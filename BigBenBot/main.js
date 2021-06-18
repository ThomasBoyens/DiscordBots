const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();

const prefix = '~';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Big Ben Bot is online!');
    var now = new Date();
    var minutes = now.getMinutes();
    console.log(minutes)
    //if (minutes === 0) {
        const channel = client.channels.cache.get("705135370861281335");
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
            // Yay, it worked!
            console.log("Successfully connected.");
        }).catch(e => {
            // Oh no, it errored! Let's log it to console :)
            console.error(e);
        });
    //}
});




client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
});


client.login(config.token);