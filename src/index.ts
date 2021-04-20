import { Bot } from './client/Client';
import { Config } from './interfaces/Config';
import fs from 'fs';

require('dotenv').config();

function checkForFile(fileName) {
	fs.access(fileName, (err) => {
		if (err) {
			fs.openSync(fileName, 'wx');
			console.log(fileName + ' is created');
			return;
		} else {
			console.log(fileName + ' exists');
		}
	});
}
checkForFile('channel.txt');

const token: string = process.env.DISCORD_TOKEN;
new Bot().start((token as unknown) as Config);
