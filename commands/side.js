module.exports = {
    name: 'side',
    description: "coin toss generator ",
    execute(message, args){
        var sideArray = ['Insurgents', 'Security'];
        var side = sideArray[Math.floor(Math.random() * sideArray.length)];
        message.reply(`You will be starting on.... ${side}.`)
    }
}