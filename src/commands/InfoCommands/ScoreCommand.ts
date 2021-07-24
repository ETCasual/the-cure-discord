import { TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, message) => {
	const announcementChannel = client.channels.cache.get(
		'863041199090565160'
	) as TextChannel;
	await announcementChannel.send(
		'@everyone',
		client.emptyEmbed({
			title: 'Top 3',
			description: 'As of findme.\n只到 findme 环节',
			image: {
				url: 'https://i.ibb.co/wY5JLTz/score.png',
			},
		})
	);
};

export const name: string = 'score';
