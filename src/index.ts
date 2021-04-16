import { Bot } from './client/Client';

require('dotenv').config();

const token: string = process.env.DISCORD_TOKEN;
new Bot().start(token);
