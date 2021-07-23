import { TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

const rules = {
	title: '游戏规则\nGame Rules! 📃',
	description: `⭐ 游戏将大多数使用 **Discord** 平台进行交流\n
    所有的答案必须透过官方提供给你们的提交频道提交\n\n
    ⭐ All games will mostly be using the platform **Discord** for communication.\n
    All answers must be submitted through the **Submission** channel for your respective groups.\n\n
    ⭐ **别作弊!!** 当发现有作弊者将被剥去参赛者名额\n就算赢了，最后的奖品也不会派发给作弊者\n
    ⭐ **Do Not Cheat!!** If cheaters were found, He/She will be disqualified from the game\nNo rewards will be rewarded to the cheater\n\n
    ⭐请别在这里散播任何的**负面、色情、政治、赌博 和 不正当的信息**\n发现违反此规则者也将被剥去参赛者名额\n
    ⭐ Do not spread **negative, pornographic, politics, gambling and wrongful messages**\nIf anyone is found violating this rule, He/She will be disqualified from the game\n\n
    💌 规则中如有更改，主办单位将另做补充 \n
    💌 The organizer remains the right to change the rules at any time, \nif changed, rules will be updated accordingly
    \n\n
    💯 最重要的 就是 **时时保持开心的心态! 友谊第一，比赛第二!**\n💯 Last but not least, **Stay happy! It's not winning that matters, but friendship!**`,
};

export const run: RunFunction = async (client, message, args) => {
	const isOwner = () => {
		if (message.author.id == '430671266215886848') {
			return true;
		} else return false;
	};

	const announcementChannel = client.channels.cache.get(
		'863041199090565160'
	) as TextChannel;
	const rulesChannel = client.channels.cache.get(
		'863048882300387338'
	) as TextChannel;

	// TODO: Add URL

	switch (args[0]) {
		case 'game1':
			if (isOwner()) {
				await announcementChannel.send(
					client.emptyEmbed({
						title: 'Test of Sight!',
						description: `1. Click The Title Text!\n2. Find **5 hidden words** from each image in the website!\n3. Submit your screenshots in your group's submission channel!`,
						url: '',
					})
				);
			}
			// .then((msg) => {
			// 	msg.delete();
			// });}
			break;

		case 'welcome':
			if (isOwner()) {
				await announcementChannel.send(
					client.emptyEmbed({
						title: '欢迎来到 **防疫行动** 💉\nWelcome To **The Cure**',
						description: `恭喜各位研究家成功获得我们研究所的录取通知!\n\n但这不代表你是我们要找的人。。。🔎\n\n我们只会录取最强 最具有能力的研究团队 🕵️\n在接下来的时间会有非常多的挑战\n你愿意接受挑战吗? 🛡️\n\n
                        Congratulations to all researchers that passed the recruitment!\n\nThough this does not mean you are who we want...🔎\n\nWe only recruit the best of the best research teams 🕵️\nThere will be several challenges along the way\nAre you up for the challenge? 🛡️\n\n我们在开幕仪式见! ✨\nSee you in the opening ceremony! ✨`,
					})
				);
				await announcementChannel.send('', {
					files: ['./assets/vid/trailer.mp4'],
				});
			}
			break;

		case 'rules':
			if (args[1] == 'here') {
				await message.channel.send(
					client.emptyEmbed({
						title: rules.title,
						description: rules.description,
					})
				);
			} else {
				if (isOwner()) {
					await rulesChannel.send(
						client.emptyEmbed({
							title: rules.title,
							description: rules.description,
						})
					);
				}
			}
			break;
		case 'create':
			if (isOwner()) {
				console.log(args[1]);
				const channelToSend = client.channels.cache.get(
					args[1].slice(2, args[1].length - 1)
				) as TextChannel;
				const title = args[2];
				const text = args.slice(2).join(' ');
				await channelToSend.send(
					client.emptyEmbed({
						title: title,
						description: text,
					})
				);
			}
			break;

		case 'cases':
			if (isOwner()) {
				switch (args[1]) {
					case '1':
						{
							await announcementChannel.send(
								'@everyone',
								client.emptyEmbed({
									title:
										'Day [1] Log: Unknown Virus Emergence!\n日志 [1]: 发现全新病毒!',
									description: '120 Cases Detected\n已有 120 个确证人数',
								})
							);
						}
						break;
					case '2':
						{
							await announcementChannel.send(
								'@everyone',
								client.emptyEmbed({
									title:
										'Day [365] Log: 90% World Population Exterminated!\n日志 [365]: 全球90%人民已被病毒消灭!',
									description:
										'The remaining survivors must work together to fend for themselves and cultivate THE CURE to combat the virus\nResearchers, an URGENT meeting will be held tonight discuss our plans to combat the spread in details!\nSee you there and Stay Safe\n剩下的人民必须同心协力 保护自己 并且研究出解药以 拯救全人类\n研究家们，今晚将会有个紧急会议 商讨我们如何面对这次的病毒\n我们今晚见!\n\nLink will be opened at 8.30PM\n链接将在 8.30PM 生效\nhttps://us02web.zoom.us/j/7693395809',
								})
							);
						}
						break;
					default:
						break;
				}
			}
			break;
		default:
			console.log('args0: ' + args[0]);
			console.log('args1: ' + args[1]);
			console.log('No args is passed, stopping command');
			break;
	}
};

export const name: string = 'announce';
