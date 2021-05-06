const Discord = require("discord.js");
const config = require("../config.json");
const client = new Discord.Client();
const tmi = require('tmi.js');
const fs = require('fs')
const https = require('https');
const readline = require('readline');

const prefix = "!";

client.on("message", function (message) {

    client.user.setActivity("with great depression", {
        type: "Streaming",
        url: "https://github.com/YvesHuber/EDAJBot"
    });
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "") {
        fs.readFile('help/help.txt', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            const help = data.split("\n")
            message.channel.send(help)
            message.author.send(help)
        });
    }
    else if (command === "status") {

    }

    else if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
    else if (command === "count") {
        const varaibles = message.content.split(" ");
        i = parseFloat(varaibles[1])
        acti = 1
        num = 1
        arr = [0]
        while (num <= i) {
            arr.push(num)
            num++
        }
        arr.forEach(element => {
            setTimeout(() => {
                message.channel.send(element)
            }, acti * (1000 + Date.now() - message.createdTimestamp + 300));
            acti++
        });
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
        try {
            acti = 1
            const rl = readline.createInterface({
                input: fs.createReadStream('logs/' + streamer + '.txt'),
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                setTimeout(() => {
                    message.channel.send(line)
                }, acti * (1000 + Date.now() - message.createdTimestamp + 100));
                acti++
            });
        } catch (err) {
            return console.log(err)
        }
    }

    else if (command === "rps") {
        message.react("🪨"),message.react("🧻"),message.react("✂️")
        const filter = (reaction, user) => {
            return ['🪨', '🧻', '✂️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        message.awaitReactions(filter, { max: 1, time: 180000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
                rando = Math.random()
                if (rando < 0.33 && rando > 0) {
                    enemy = '🪨'
                }
                else if (rando < 0.66 && rando > 0.33) {
                    enemy = '🧻'
                }
                else if (rando < 1 && rando > 0.66) {
                    enemy = '✂️'
                }
                player = reaction.emoji.name
                if (player == enemy ) {
                    message.channel.send("Its a Draw")
                }
                else if (player == '🪨' && enemy == '🧻' || player == '🧻' && enemy == '✂️' ||player == '✂️' && enemy == '🪨' ) {
                    message.channel.send("You Lost")
                }
                else if (enemy == '🪨' && player == '🧻' || enemy == '🧻' && player == '✂️' ||enemy == '✂️' && player == '🪨' ) {
                    message.channel.send("You Won")

                }
            
            });
    }

    else if (command === "duel") {
        var help = ""
        fs.readFile('duel/rules.txt', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            help = data.split("\n")
            const challanger = message.author
            const duelist = message.mentions.members.first()
            var challangeritem = 0
            var duelistitem = 0
            client.users.cache.get(challanger.id).send('You wanted to duel ' + duelist.displayName)
            client.users.cache.get(challanger.id).send(help)
            client.users.cache.get(duelist.id).send('You got challanged from ' + challanger.username)
            client.users.cache.get(duelist.id).send(help)
            client.on('message', message => {
                    if (message.author.bot) return;
                    if (message.content != "") {
                        if(message.author.id === challanger.id){
                        challangeritem = parseFloat(message.content)
                        }
                    }
            });
            client.on('message', mess => {
                if (mess.channel.type == "dm") {
                    if (mess.author.bot) return;
                    if (mess.content != "") {
                        if (mess.author.id === duelist.id){
                        duelistitem = parseFloat(mess.content)
                        }
                    }
                }
            });
            var timerID = setInterval(() => {
                console.log(challangeritem,duelistitem)
                if (challangeritem != 0 && duelistitem != 0) {
                    if (challangeritem > duelistitem || challangeritem * 4 < duelistitem || duelistitem > 100 || duelistitem < 1){
                        client.users.cache.get(challanger.id).send("You won the Duel")
                        client.users.cache.get(duelist.id).send("You lost Sadge")
                    }
                    else if (duelistitem > challangeritem || duelistitem * 4 < challangeritem || challangeritem > 100 || challangeritem < 1){
                        client.users.cache.get(challanger.id).send("You lost Sadge")
                        client.users.cache.get(duelist.id).send("You won the Duel Ez Clap")
                    }
                    else if (challangeritem == duelistitem) {
                        client.users.cache.get(challanger.id).send("Draw!")
                        client.users.cache.get(duelist.id).send("Draw!") 
                    }
                    clearInterval(timerID)
                }
              }, 3000)


        });

    }
})

client.login(config.BOT_TOKEN);