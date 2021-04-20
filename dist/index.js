"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./client/Client");
const fs_1 = __importDefault(require("fs"));
require('dotenv').config();
function checkForFile(fileName) {
    fs_1.default.access(fileName, (err) => {
        if (err) {
            fs_1.default.openSync(fileName, 'wx');
            console.log(fileName + ' is created');
            return;
        }
        else {
            console.log(fileName + ' exists');
        }
    });
}
checkForFile('channel.txt');
const token = process.env.DISCORD_TOKEN;
new Client_1.Bot().start(token);
//# sourceMappingURL=index.js.map