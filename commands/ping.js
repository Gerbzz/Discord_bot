module.exports = {
  name: "ping",
  description: "says pong back",
  execute(message, args) {
    message.channel.send("pong!");
  }
};
