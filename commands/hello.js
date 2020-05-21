module.exports = {
  name: "hello",
  description: "does not say hello",
  execute(message, args) {
    var helloArray = [
      "Go the fuck away",
      "You are a stupid prick",
      "Suck a dick",
      "Tell Robert I said he is a hoe",
      "Do not talk to me",
      "Conner and his cousin touched wieners",
      "Anthony and Robert play switch"
    ];
    var hello = helloArray[Math.floor(Math.random() * helloArray.length)];
    message.channel.send(`${hello}`);
  }
};
