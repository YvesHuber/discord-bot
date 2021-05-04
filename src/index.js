const Discord = require("discord.js");
const config = require("../config.json");
const client = new Discord.Client();
const tmi = require('tmi.js');
const fs = require('fs')
const https = require('https');

var images = ["/images/1.jpeg", "/images/2.jpeg", "/images/3.jpeg", "/images/4.jpeg"];
var image = Math.floor(Math.random() * images.length);



const prefix = "_";

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

    if (command === "help") {
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

    else if (command === "sum") {
        try {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
        } catch {
            return
        }
    }

    else if (command === "dif") {
        try {
        const numArgs = args.map(x => parseFloat(x));
        const dif = numArgs.reduce((counter, x) => counter -= x);
        message.reply(`The dif of all the arguments you provided is ${dif}!`);
    } catch {
        return
    }
    }

    else if (command === "mul") {
        try {
        const numArgs = args.map(x => parseFloat(x));
        const mul = numArgs.reduce((counter, x) => counter *= x);
        message.reply(`The mul of all the arguments you provided is ${mul}!`);
    } catch {
        return
    }
    }

    else if (command === "quo") {
        try {
        const numArgs = args.map(x => parseFloat(x));
        const quo = numArgs.reduce((counter, x) => counter /= x);
        message.reply(`/tts The quo of all the arguments you provided is ${quo}!`);
    } catch {
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
            console.log (streamer)
            } catch (err){
                console.log(err)
                return
            }
            try {
                https.get('https://api.twitch.tv/helix/search/channels?query=a_'+strn+'client-id: wbmytr93xzw8zbg0p1izqyzzc5mbizAuthorization: Bearer 2gbdx6oar67tqtcmt49t3wpcgycthx', (resp) => {
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
          } catch(err) {
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
        const Bodynopre = message.content.split(" ");
        try {
        streamer = Bodynopre[1].toString()
        } catch(err) {
            return
        }
        try {
            if (fs.existsSync('logs/' + streamer + '.txt')) {
              
            }
          } catch(err) {
            return
          }
        fs.readFile('logs/' + streamer + '.txt', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            const dataArray = data.split("\n")
            dataArray.forEach(element => {
                message.channel.send(element)
            });
        });
    }

});

client.login(config.BOT_TOKEN);