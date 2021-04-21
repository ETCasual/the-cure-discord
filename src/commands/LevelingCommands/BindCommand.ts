import { Message, TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import fs from 'fs';

export const run: RunFunction = async (client, message: Message) => {
	var file: string = fs.readFileSync('channel.txt', 'utf-8');
	if (file === '' || file !== message.channel.id) {
		fs.appendFile(
			'channel.txt',
			message.guild.id + '_' + message.channel.id + '\n',
			(err) => {
				if (err) throw err;
				console.log(
					'Channel Id is saved: ' +
						message.channel.id +
						', with guild specific: ' +
						message.guild.id
				);
			}
		);
		file = fs.readFileSync('channel.txt', 'utf-8');
	} else return;

	let channel = message.guild.channels.cache.find(
		(i) => i.id === (file === '' ? message.channel.id : file)
	) as TextChannel;
	console.log(channel.id);
	message.channel.send(
		client.embed(
			{
				description: `LGR Bot is binded to channel ➜ <#${message.channel.id}>`,
			},
			message
			// `LGR Bot is binded to channel => <#${channel.id}>`
		)
	);
};

export const name: string = 'bind';
