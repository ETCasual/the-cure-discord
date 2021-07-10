"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebaseKey_json_1 = __importDefault(require("../../../firebaseKey.json"));
const discord_js_1 = require("discord.js");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(firebaseKey_json_1.default),
});
const answers = [
    {
        gameName: 'lockHeart',
        answer: 'GGWP',
    },
    {
        gameName: 'Hello Police',
        answer: 'OhMaiGawd',
    },
];
const answersList = [];
const gamesList = [];
for (var i in answers) {
    answersList.push(answers[i].answer);
    gamesList.push(answers[i].gameName);
}
class FetchedChannel extends discord_js_1.Channel {
    name;
}
const run = async (client, message, args) => {
    var channelName;
    await client.channels
        .fetch(message.channel.id)
        .then((channel) => (channelName = channel.name));
    console.log(channelName);
    if (channelName.includes('submission')) {
        const DB = firebase_admin_1.default.firestore();
        if (!answersList.includes(args[0]) || args.length != 1) {
            await message.channel.send(client.emptyEmbed({
                title: 'Wrong Answer!',
                description: 'Please Try Again!',
            }));
        }
        else {
            const indexNo = answersList.indexOf(args[0]);
            const today = new Date();
            if ((await DB.collection(gamesList[indexNo])
                .doc(message.member.displayName)
                .get()).exists) {
                console.log('Record Exist!');
                await message.channel.send(client.emptyEmbed({
                    title: 'Duplicate!',
                    description: 'Correct Answer is sent! Not accepting duplicate answers!',
                }));
            }
            try {
                await DB.collection(gamesList[indexNo])
                    .doc(message.member.displayName)
                    .create({
                    Answer: args[0],
                    Group: message.member.displayName,
                    'Submission Time': today.getHours() +
                        ':' +
                        today.getMinutes() +
                        ':' +
                        today.getSeconds(),
                })
                    .then(async () => {
                    console.log('Data Sent to database');
                    await message.channel.send(client.emptyEmbed({
                        title: 'Correct Answer!',
                        description: 'Please Proceed next!',
                    }));
                })
                    .catch(async (err) => {
                    console.log(err);
                    if (err.code != 6) {
                        await message.channel.send('<@430671266215886848>');
                        await message.channel.send(client.emptyEmbed({
                            title: 'FIREBASE ERROR!',
                            description: err.details,
                        }));
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    else {
        return;
    }
};
exports.run = run;
exports.name = 'answer';
//# sourceMappingURL=Answer.js.map