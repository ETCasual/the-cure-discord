"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./client/Client");
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
new Client_1.Bot().start(token);
//# sourceMappingURL=index.js.map