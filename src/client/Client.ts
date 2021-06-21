import consola, { Consola } from 'consola';
import {
	Client,
	MessageEmbedOptions,
	MessageEmbed,
	Message,
	Intents,
	Collection,
} from 'discord.js';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { Config } from '../interfaces/Config';
import glob from 'glob';
import { promisify } from 'util';

const fetch = require('node-fetch'); // Api fetch() function
const moment = require('moment-timezone');

const globPromise = promisify(glob);

const getTime = async (url) => {
	try {
		const res = await fetch(`http://worldtimeapi.org/api/timezone/${url}`);
		const data = await res.json();
		const time = moment.tz(data.datetime, data.timezone).format('hh:mm A');
		return time;
	} catch (err) {
		console.error('API Err: ' + err);
	}
};
const timeMap = {
	KUL: 'Asia/Kuala_Lumpur',
	LONDON: 'Europe/London',
	MELBOURNE: 'Australia/Melbourne',
	DARWIN: 'Australia/Darwin',
	PERTH: 'Australia/Perth',
};

class Bot extends Client {
	public logger: Consola = consola;
	public commands: Collection<string, Command> = new Collection();
	public events: Collection<string, Event> = new Collection();
	public config: Config;
	public constructor() {
		super({
			ws: { intents: Intents.ALL },
			messageCacheLifetime: 180,
			messageCacheMaxSize: 200,
			messageSweepInterval: 180,
		});
	}
	public async start(config: Config): Promise<void> {
		this.config = config;
		this.login(config.token);
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/**/*{.ts,.js}`
		);
		commandFiles.map(async (value: string) => {
			const file: Command = await import(value);
			this.commands.set(file.name, file);
			console.log(file);
		});
		const eventFiles: string[] = await globPromise(
			`${__dirname}/../events/**/*{.ts,.js}`
		);
		eventFiles.map(async (value: string) => {
			const file: Event = await import(value);
			this.events.set(file.name, file);
			this.on(file.name, file.run.bind(null, this));
			console.log(file);
		});
		let index = 0;
		setInterval(async () => {
			const timezone = Object.keys(timeMap);

			if (index === timezone.length) index = 0;
			const url = timeMap[timezone[index]];
			const time = await getTime(url);
			try {
				//   Setting the custom activity
				if (this.user) {
					await this.user.setActivity({
						name: `${timezone[index].toString()}: ${time}`,
					});
				}
			} catch (err) {
				console.error('Discord Rate Err: ' + err);
			}
			// increase the index and loop again
			index++;
		}, 10000);
		// console.log(commandFiles);
		// console.log(eventFiles);
	}
	public embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
		return new MessageEmbed({ ...options, color: '#800080' }).setFooter(
			`${message.author.tag} | ${this.user.username}`,
			message.author.displayAvatarURL({ format: 'png', dynamic: true })
		);
	}
}

export { Bot };
