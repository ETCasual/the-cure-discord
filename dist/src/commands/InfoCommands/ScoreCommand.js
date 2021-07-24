"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const run = async (client, message, args) => {
    await message.channel.send(
    // '@everyone',
    client.emptyEmbed({}));
};
exports.run = run;
exports.name = 'score';
//# sourceMappingURL=ScoreCommand.js.map