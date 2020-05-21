module.exports = {
  name: "ct",
  description: "coin toss generator ",
  execute(message, args) {
    var sideArray = ["Heads", "Tails"];
    var side = sideArray[Math.floor(Math.random() * sideArray.length)];
    message.reply(`Flipping the coin.... It's ${side}!`);
  }
};
