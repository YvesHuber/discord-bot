const Discord = require("discord.js");
const config = require("../config.json");
const client = new Discord.Client();
const tmi = require('tmi.js');
const fs = require('fs')
const https = require('https');
const readline = require('readline');

var images = ["/images/1.jpeg", "/images/2.jpeg", "/images/3.jpeg", "/images/4.jpeg"];
var image = Math.floor(Math.random() * images.length);

const prefix = "!";

client.on("message", function (message) {

    client.user.setActivity("with great depression", {
        type: "CODING",
        url: "https://github.com/YvesHuber/EDAJBot"
    });
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    function printer(streamer,i){
        try {
            acti = 1
            var stats = fs.statSync('logs/' + streamer + '.txt');
            var fileSizeInBytes = stats.size;
            arr = [fileSizeInBytes]
        
            const rl = readline.createInterface({
                input: fs.createReadStream('logs/' + streamer + '.txt'),
                crlfDelay: Infinity
              });
              
              rl.on('line', (line) => {

                if(i < acti){
                setTimeout(() => {
                    message.channel.send(line)
                }, acti * (1000 + Date.now() - message.createdTimestamp + 100));
                }
                acti++
              });
            } catch (err) {
                return
            }
            arr.push(acti)
            return arr
    }

    if (command === "") {
        fs.readFile('help/help.txt', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            const help = data.split("\n")
            message.channel.send(help)
        });
    }

    else if (command === "status") {

    }

    else if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }

    else if (command === "calc") {
        try {
            const varaibles = message.content.split(" ");
            if (varaibles[2] == "+") {
                result = parseFloat(varaibles[1]) + parseFloat(varaibles[3])
                message.reply(varaibles[1] + ` ` + varaibles[2] + ` ` + varaibles[3] + ` = ` + result);
            }
            if (varaibles[2] == "-") {
                result = parseFloat(varaibles[1]) - parseFloat(varaibles[3])
                message.reply(varaibles[1] + ` ` + varaibles[2] + ` ` + varaibles[3] + ` = ` + result);
            }
            if (varaibles[2] == "*") {
                result = parseFloat(varaibles[1]) * parseFloat(varaibles[3])
                message.reply(varaibles[1] + ` ` + varaibles[2] + ` ` + varaibles[3] + ` = ` + result);
            }
            if (varaibles[2] == "/") {
                result = parseFloat(varaibles[1]) / parseFloat(varaibles[3])
                message.reply(varaibles[1] + ` ` + varaibles[2] + ` ` + varaibles[3] + ` = ` + result);
            }

        } catch (err) {
            console.log(err)
            return
        }
    }

    else if (command === "speak") {
        const dataArray = message.content.split("_speak ")
        message.channel.send(dataArray[1], { tts: true });
    }

    else if (command === "pic") {
        https.get('https://source.unsplash.com/random', (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                img = data.split('"')
                message.channel.send(img[1]);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }

    else if (command === "log") {
        const Bodynopre = message.content.split(" ");
        let streamer = ""
        let strn = ""
        try {
            streamer = Bodynopre[1].toString()
            strn = Bodynopre[1].toString()
            console.log(streamer)
        } catch (err) {
            console.log(err)
            return
        }
        try {
            https.get('https://api.twitch.tv/helix/search/channels?query=a_' + strn + 'client-id: wbmytr93xzw8zbg0p1izqyzzc5mbizAuthorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx', (resp) => {
                let data = '';

                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    console.log(JSON.parse(data).explanation);
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });
        } catch (err) {
            console.log(err)
            return
        }
        try {
            if (fs.existsSync('logs/' + strn + '.txt')) {
                fs.unlinkSync('logs/' + strn + '.txt')
            }
        } catch (err) {
            console.log(err)
            return
        }
        streamer = new tmi.Client({
            connection: {
                secure: true,
                reconnect: true
            },
            channels: [streamer]
        });
        streamer.connect();

        streamer.on('message', (channel, tags, message, self) => {
            m = `${tags['display-name']}: ${message}`
            text = m + "\r\n"
            fs.appendFile('logs/' + strn + '.txt', text, function (err) { // write it back
                if (err) throw err; {
                    return
                }
            });
        });
    }

    else if (command === "twitch") {
        i = 1
        const Bodynopre = message.content.split(" ");
        try {
            streamer = Bodynopre[1].toString()
        } catch (err) {
            return
        }
        try {
            if (fs.existsSync('logs/' + streamer + '.txt')) {

            }
        } catch (err) {
            return
        }
        flexdata = [0,0]
        var fileSizeInBytes = 1
        console.log("b while")
        while (flexdata[0] < fileSizeInBytes ) {
            console.log("while")
        var stats = fs.statSync('logs/' + streamer + '.txt');
        fileSizeInBytes = stats.size;
        flexdata = printer(streamer,flexdata[1])
        }
    }
});

client.login(config.BOT_TOKEN);