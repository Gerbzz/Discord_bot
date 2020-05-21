module.exports = {
  name: "sandstorm",
  description: "Selects a random team and map for Insurgency Sandstorm",
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
    var sideArray = ["Insurgents", "Security"];
    var side = sideArray[Math.floor(Math.random() * sideArray.length)];
    message.reply(`You will be starting on.... ${side} side of ${map}.`);
  }
};
