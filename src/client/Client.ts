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

const globPromise = promisify(glob);

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

		setTimeout(async () => {
			try {
				//   Setting the custom activity
				if (this.user) {
					await this.user.setActivity({
						name: 'Researching for vaccine!',
					});
				}
			} catch (err) {
				console.error('Discord Rate Err: ' + err);
			}
		}, 2000);
		// increase the index and loop again

		// console.log(commandFiles);
		// console.log(eventFiles);
	}
	public emptyEmbed(options: MessageEmbedOptions): MessageEmbed {
		return new MessageEmbed({ ...options, color: '#ef1b1b' });
	}
	public embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
		return new MessageEmbed({ ...options, color: '#ef1b1b' }).setFooter(
			`${message.author.tag} | ${this.user.username}`,
			message.author.displayAvatarURL({ format: 'png', dynamic: true })
		);
	}
}

export { Bot };
