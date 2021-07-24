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
		case 'kahoot':
			if (isOwner()) {
				await announcementChannel.send(
					'@everyone',
					client.emptyEmbed({
						title: 'Kahoot It!',
						description: `1. Click The Title Text!\n2. Enter into **Kahoot!** and answer all questions!\n
						1. 点击标题文以展开我们的网页!\n2. 进入 **Kahoot!** 游戏 并且回答所有问题!\n\nNote: This is a group effort game, use your group names! ie: The Cure 1\n温馨提醒: 这是一个团队游戏, 请使用团队的名字! 例如: The Cure 1\n\nOnly 1 submission per group allowed. Do Not Attempt To Cheat! 😉\n一个组只能提交一次, 别作弊哦! 😉`,
						url: 'https://thecure-web.vercel.app',
					})
				);
			}
			// .then((msg) => {
			// 	msg.delete();
			// });}
			break;
		case 'endKahoot':
			if (isOwner()) {
				await announcementChannel.send(
					'@everyone',
					client.emptyEmbed({
						title: 'Congrats on finishing the first task!',
						description:
							'Congratulations to all researchers upon finishing their task.\nSeems like everyone has good knowledge about the virus!\nNext, we will test on your visual prowess!\nRest and prepare for now!\n\n恭喜各位研究员成功闯过了第一个关卡\n看来大家都对这个疫情有不错的了解\n明天 我们将会考验你们的眼力!\n现在就抓紧时间休息吧!\n\nSee You Tomorrow!\n明天见!',
					})
				);
			}
			break;

		case 'observe':
			if (isOwner()) {
				await announcementChannel.send(
					'@everyone',
					client.emptyEmbed({
						title: 'Observation is key!',
						description:
							'Study shows the virus has a weakness!\nObserve the virus and study its weakness!\nIt may be the final puzzle piece to unlock the vaccine formula!\n\n许多的研究显示这个病毒是存有弱点的!\n我们必须仔细观察病毒并且研究它的弱点!\n这也许能为解锁疫苗的蓝图做最大的贡献!\n\n*Hint: Click the Title Text to navigate to website!*\n*温馨提示: 点击此标题以进入网站!*',
						url: 'https://thecure-web.vercel.app/',
					})
				);
			}
			break;
		case 'templerun':
			if (isOwner()) {
				await announcementChannel.send(
					'@everyone',
					client.emptyEmbed({
						title: '[MUTATION EVENT] Lambda!',
						image: {
							url: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,g=0.5x0.5,f=auto/f4b3ac7fe25cad9bc028b33f7a407f28.png',
						},
						description:
							"Theres a new variant of the virus, called Lambda!\nIt is known for its immune evasion\nEvading immune systems renders the body into a weaker state!\nWe must **RACE** against time to defeat the variant!\n\n病毒变异了! 被赋予了 Lambda之名!\n此病毒特征是回避身体的免疫系统\n导致身体进入了虚弱的状态!\n研究员们必须立刻与时间 **赛跑** 以打败变异的病毒!\n\n1. Researchers must download **Temple Run**\n2. Each research team must accumulate more than **20,000 meters** in distance\n3. Screenshot your results with the distance visible and submit to your group's submission channel\n4. Only a maximum of 6 images allowed for submission!\n\n1. 研究员们必须下载 **Temple Run**\n2. 并且每研究团队需在游戏里获得不少于 **20,000米** 的距离\n3. 截图游戏的结果并确保距离数额需清楚可见\n4. 最多只允许 6 张图片作呈交",
					})
				);
			}
			break;
		case 'crowdcity':
			if (isOwner()) {
				await announcementChannel.send(
					'@everyone',
					client.emptyEmbed({
						title: '[MUTATION EVENT] Delta!',
						description:
							"With it's increased transmission rate,\nThe Delta variant is dangerously infectous to people\nWe must study its transmission rate and discover how to stop it!\n\n透过高度的散播率,\n变异病毒 Delta 已成为了现在传染性最强的病毒\n我们需要研究此变异病毒的感染率以了解如何击破它!\n\n1. Researchers must find a form of **Crowd City** game\n2. Each research team must accumulate more than **3000** in score\n3. Screenshot your results and submit them in your group's submission channel\n4. Only a maximum of 6 images allowed for submission!\n\n1. 研究员们必须玩一款 **Crowd City** 游戏\n2. 并且每研究团队需在游戏里获得不少于 **3000** 分\n3. 截图游戏的结果并确保距离数额需清楚可见\n4. 最多只允许 6 张图片作呈交",
					})
				);
			}
			break;

		case 'findme':
			if (isOwner()) {
				await announcementChannel.send(
					'@everyone',
					client.emptyEmbed({
						title: 'Virus Pattern!',
						description:
							'Seems like our researchers have found patterns on living bodies indicating the virus!\nQuickly proceed to the website and check on your tasks!\n\n看来有研究员发现了存活在生物上的病毒规律!\n赶快到网站检查你们的新任务吧!\n\n*Hint: Click the Title Text to navigate to website!*\n*温馨提示: 点击此标题以进入网站!*',
						url: 'https://thecure-web.vercel.app/',
					})
				);
			}
			break;
		case 'zoom':
			if (isOwner()) {
				await announcementChannel.send(
					'@everyone',
					client.emptyEmbed({
						title: 'The Cure Research Emergency Meeting! 🚨',
						description:
							'The Cure Research Emergency Meeting has started! All Researchers Join in Now!\n防疫行动紧急会议 已召开, 各位研究家们赶快进入会议\n\nhttps://us02web.zoom.us/j/7693395809',
						url: 'https://us02web.zoom.us/j/7693395809',
					})
				);
			}
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
