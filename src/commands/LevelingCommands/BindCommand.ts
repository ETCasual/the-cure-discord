// import { Message, TextChannel } from 'discord.js';
// import { RunFunction } from '../../interfaces/Command';

// import * as data from '../../../bindedRankChannels.json';

// export const run: RunFunction = async (client, message: Message) => {
// 	var file: string = data.find((item) => (item.serverId = message.guild.id))
// 		.textChannelId;
// 	if (file === '' || file !== message.channel.id) {
// 		data.push({
// 			serverId: message.guild.id,
// 			textChannelId: message.channel.id,
// 		});
// 	} else return;

// 	let channel = message.guild.channels.cache.find(
// 		(i) => i.id === (file === '' ? message.channel.id : file)
// 	) as TextChannel;
// 	console.log(channel.id);
// 	message.channel.send(
// 		client.embed(
// 			{
// 				title: `LGR Bot is binded to channel ➜ <#${message.channel.id}>`,
// 			},
// 			message
// 			// `LGR Bot is binded to channel => <#${channel.id}>`
// 		)
// 	);
// };

// export const name: string = 'bind';
