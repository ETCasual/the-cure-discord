import { RunFunction } from '../../interfaces/Event';
import { ClientUser, Message } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { verseScrapper } from '../../api/verseScrapper';

export const run: RunFunction = async (client, message: Message) => {
	if (
		message.author.bot ||
		!message.guild ||
		!message.content.toLowerCase().startsWith('!')
	)
		return;

	// verseScrapper
	if (message.content.startsWith('!verse')) {
		var url: string = 'https://www.biblegateway.com/';
		verseScrapper(client, message, url);
	}

	const args: string[] = message.content.slice('!'.length).trim().split(/ +/g);

	// console.log('args: ' + args);
	const cmd: string = args.shift();

	// console.log('cmd: ' + cmd);

	const command: Command = client.commands.get(cmd);

	console.log('client commands: ' + JSON.stringify(client.commands, null, 2));
	if (!command) return;

	// console.log('command: ' + command);
	command
		.run(client, message, args)
		.catch(
			async (reason: any) =>
				await message.channel.send(
					client.embed({ description: `An Error came: ${reason}` }, message)
				)
		);
};

export const name: string = 'message';
