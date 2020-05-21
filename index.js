const Discord = require("discord.js");
const bot = new Discord.Client();
const ytdl = require("ytdl-core");
const fs = require("fs");
bot.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}
const token = "Njc5MjM2MjUzMzU4NjIwNzAx.Xkub5g.oV-8vlzL_-ADBSEAUQKo7Kg8Hps";
const PREFIX = "."; // COMMAND PREFIX
var version = "2.1"; // VERSION OF BOT
var servers = {};
bot.on("ready", () => {
  console.log("This bot is online! + ", version);
});

bot.on("message", message => {
  if (!message.content.startsWith(PREFIX)) return;
  let args = message.content.substring(PREFIX.length).split(" ");
  switch (args[0]) {
    case "hello":
      bot.commands.get("hello").execute(message, args);
      break;

    case "ping":
      bot.commands.get("ping").execute(message, args);
      break;

    case "flip":
    case "cointoss":
    case "ct":
      bot.commands.get("ct").execute(message, args);
      break;

    case "sandstorm":
    case "ss":
      bot.commands.get("sandstorm").execute(message, args);
      break;

    case "side":
      bot.commands.get("side").execute(message, args);
      break;

    case "map":
      bot.commands.get("map").execute(message, args);
      break;

    case "play":
      message.react("🎶");
      function play(connection, message) {
        var server = servers[message.guild.id];
        server.dispatcher = connection.playStream(
          ytdl(server.queue[0], { filter: "audioonly" })
        );
        server.queue.shift();
        server.dispatcher.on("end", function() {
          if (server.queue[0]) {
            play(connection, message);
          } else {
            message.channel.send(
              "https://media.giphy.com/media/l2Je3c8bBb8cXwLDy/giphy.gif"
            );
            connection.disconnect();
          }
        });
      } // end of function
      if (!args[1]) {
        message.channel.send("you need to provide a link dumbass!");
        return;
      }
      if (!message.member.voiceChannel) {
        message.channel.send(
          "You must be in a channel to play the bot! you dumb fucking bot"
        );
        return;
      }
      if (!servers[message.guild.id])
        servers[message.guild.id] = {
          queue: []
        };
      var server = servers[message.guild.id];
      server.queue.push(args[1]);
      if (!message.guild.voiceConnection)
        message.member.voiceChannel.join().then(function(connection) {
          play(connection, message);
        });
      break;

    case "skip":
      message.react("👌");
      var server = servers[message.guild.id];
      if (server.dispatcher) server.dispatcher.end();
      message.channel.send("Skipping the song! Who plays that shit anyway...");
      break;

    case "stop":
      message.react("👋");
      var server = servers[message.guild.id];
      if (message.guild.voiceConnection) {
        for (var i = server.queue.length - 1; i >= 0; i--) {
          server.queue.splice(i, 1);
        }
        server.dispatcher.end();

        message.channel.send("");
        console.log("stopped the queue");
      }
      if (message.guild.connection) message.guild.voiceConnection.disconnect();
      break;
  }
});

bot.login(token);
