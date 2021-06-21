// import { Message, MessageAttachment } from 'discord.js';
// import { RunFunction } from '../../interfaces/Command';
// // import { channelToSendRank } from './BindCommand';

// const leveling = require('discord-leveling');
// const canvacord = require('canvacord');

// export const run: RunFunction = async (client, message: Message) => {
// 	var profile = await leveling.Fetch(message.author.id);

// 	const card = new canvacord.Rank()
// 		.setUsername(message.author.username)
// 		.setDiscriminator(message.author.discriminator)
// 		.setRank(profile.xp, 'placeholder', false)
// 		.setLevel(profile.xp === 100 ? profile.level + 1 : profile.level)
// 		.setCurrentXP(profile.xp)
// 		.setRequiredXP(100)
// 		.renderEmojis(true)
// 		.setBackground('COLOR', '#ff865c')
// 		.setOverlay('#323150', 1, true)
// 		.setProgressBar(['#9f3763', '#ff865c'], 'GRADIENT', true)
// 		.setStatus(message.author.presence.status)
// 		.setAvatar(message.author.displayAvatarURL({ format: 'png', size: 1024 }));

// 	const img = await card.build();
// 	message.channel.send('<@' + message.author.id.toString() + '>');
// 	message.channel.send(new MessageAttachment(img, 'rank.png'));
// };

// export const name: string = 'rank';
