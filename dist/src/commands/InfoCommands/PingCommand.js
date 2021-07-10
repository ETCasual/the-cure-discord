"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const run = async (client, message) => {
    const msg = await message.channel.send(client.embed({ description: `Ponging!!!` }, message));
    console.log(msg);
    await msg.edit(client.embed({
        description: `WebSocket: ${client.ws.ping}MS\nMessage edit: ${msg.createdTimestamp - message.createdTimestamp}MS`,
    }, message));
};
exports.run = run;
exports.name = 'ping';
//# sourceMappingURL=PingCommand.js.map