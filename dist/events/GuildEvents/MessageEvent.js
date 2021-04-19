"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const verseScrapper_1 = require("../../api/verseScrapper");
const run = async (client, message) => {
    if (message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith('!'))
        return;
    // verseScrapper
    if (message.content.startsWith('!verse')) {
        var url = 'https://www.biblegateway.com/';
        verseScrapper_1.verseScrapper(client, message, url);
    }
    const args = message.content.slice('!'.length).trim().split(/ +/g);
    // console.log('args: ' + args);
    const cmd = args.shift();
    // console.log('cmd: ' + cmd);
    const command = client.commands.get(cmd);
    console.log('client commands: ' + JSON.stringify(client.commands, null, 2));
    if (!command)
        return;
    // console.log('command: ' + command);
    command
        .run(client, message, args)
        .catch(async (reason) => await message.channel.send(client.embed({ description: `An Error came: ${reason}` }, message)));
};
exports.run = run;
exports.name = 'message';
//# sourceMappingURL=MessageEvent.js.map