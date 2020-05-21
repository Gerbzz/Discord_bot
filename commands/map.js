module.exports = {
  name: "map",
  description: "random map generator",
  execute(message, args) {
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
    message.reply(`You will be playing on.... ${map}.`);
  }
};
