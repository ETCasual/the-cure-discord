import { RunFunction } from '../../interfaces/Event';
import { Message } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { verseScrapper } from '../../api/verseScrapper';

export const run: RunFunction = async (client, message: Message) => {
	if (
		message.author.bot ||
		!message.guild ||
		!message.content.toLowerCase().startsWith('!')
	)
		return;

	// Test
	if (message.content.startsWith('!verse')) {
		var url: string = 'https://www.biblegateway.com/';
		verseScrapper(client, message, url);
	}

	const args: string[] = message.content.slice('!'.length).trim().split(/ +/g);
	const cmd: string = args.shift();
	// Hits
	console.log(cmd);

	const command: Command = client.commands.get(cmd);
	if (!command) return;
	// Does not hit
	console.log(command);
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
