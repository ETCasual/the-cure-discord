import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, message, args) => {
	await message.channel.send(
		// '@everyone',
		client.emptyEmbed({})
	);
};

export const name: string = 'score';
