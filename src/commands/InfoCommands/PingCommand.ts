import { Message } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, message) => {
	const msg: Message = await message.channel.send(
		client.embed({ description: `Ponging!!!` }, message)
	);
	console.log(msg);
	await msg.edit(
		client.embed(
			{
				description: `WebSocket: ${client.ws.ping}MS\nMessage edit: ${
					msg.createdTimestamp - message.createdTimestamp
				}MS`,
			},
			message
		)
	);
};

export const name: string = 'ping';
