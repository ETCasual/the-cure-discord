"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const run = async (client, message) => {
    await message.channel.send(
    // '@everyone',
    client.emptyEmbed({
        title: 'Top 3',
        description: 'As of findme.\n只到 findme 环节',
        image: {
            url: 'https://i.ibb.co/wY5JLTz/score.png',
        },
    }));
};
exports.run = run;
exports.name = 'score';
//# sourceMappingURL=ScoreCommand.js.map