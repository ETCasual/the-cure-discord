"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const fs_1 = __importDefault(require("fs"));
const run = async (client, message) => {
    var file = fs_1.default.readFileSync('channel.txt', 'utf-8');
    if (file === '' || file !== message.channel.id) {
        fs_1.default.writeFile('channel.txt', message.channel.id, (err) => {
            if (err)
                throw err;
            console.log('Channel Id is saved: ' + message.channel.id);
        });
        file = fs_1.default.readFileSync('channel.txt', 'utf-8');
    }
    else
        return;
    let channel = message.guild.channels.cache.find((i) => i.id === (file === '' ? message.channel.id : file));
    console.log(channel.id);
    message.channel.send(client.embed({
        description: `LGR Bot is binded to channel ➜ <#${message.channel.id}>`,
    }, message
    // `LGR Bot is binded to channel => <#${channel.id}>`
    ));
};
exports.run = run;
exports.name = 'bind';
//# sourceMappingURL=BindCommand.js.map