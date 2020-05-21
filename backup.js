const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "Njc5MjM2MjUzMzU4NjIwNzAx.Xkub5g.oV-8vlzL_-ADBSEAUQKo7Kg8Hps";
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

var version = "1.3"; // VERSION OF BOT
const PREFIX = "~"; // COMMAND PREFIX
var servers = {};

bot.on("ready", () => {
  console.log("This bot is online! + ", version);
});

bot.on("message", message => {
  if (message.content === "HELLO") {
    message.reply("HELLO FRIEND!");
  }
});

bot.on("message", message => {
  var mapArray = [
    "Outskirts_West",
    "Refinery",
    "Hideout_West",
    "Farmhouse_West",
    "Precinct_East",
    "Ministry",
    "Summit_East"
  ];
  var map = mapArray[Math.floor(Math.random() * mapArray.length)];
  var sideArray = ["Insurgents", "Security"];
  var side = sideArray[Math.floor(Math.random() * sideArray.length)];
  if (message.content === "~ct") {
    message.reply(`You will be starting on.... ${side} side of ${map}.`);
  }
});

bot.on("message", message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "play":
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
            connection.disconnect();
          }
        });
      } // end of function

      if (!args[1]) {
        message.channel.send("you need to provide a link!");
        return;
      }

      if (!message.member.voiceChannel) {
        message.channel.send("You must be in a channel to play the bot!");
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
      var server = servers[message.guild.id];
      if (server.dispatcher) server.dispatcher.end();
      message.channel.send("Skipping the song!");
      break;

    case "stop":
      var server = servers[message.guild.id];
      if (message.guild.voiceConnection) {
        for (var i = server.queue.length - 1; i >= 0; i--) {
          server.queue.splice(i, 1);
        }

        server.dispatcher.end();
        message.channel.send("Ending the queue, leaving now...");
        console.log("stopped the queue");
      }
      if (message.guild.connection) message.guild.voiceConnection.disconnect();
      break;
  }
});

bot.login(token);
