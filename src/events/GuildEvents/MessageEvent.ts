import { RunFunction } from '../../interfaces/Event';
import { Message, MessageAttachment, TextChannel } from 'discord.js';
import { Command } from '../../interfaces/Command';
import fs from 'fs';

const leveling = require('discord-leveling');
const canvacord = require('canvacord');
const readline = require('readline');

var channelRank: string;
var channelRankId: string;
var guildId: string;
// var currentGuild: string;

async function processLineByLine(fileName: string, message: Message) {
	const fileStream = fs.createReadStream(fileName);

	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	for await (const line of rl) {
		if (line.startsWith(message.guild.id)) {
			channelRank = line;
			channelRank.split('_');
			channelRankId = channelRank[1];
			guildId = channelRank[0];
		}
	}
}

export const run: RunFunction = async (client, message: Message) => {
	// currentGuild = message.guild.id
	//When someone sends a message add xp
	if (!message.content.toLowerCase().startsWith('!') && !message.author.bot) {
		var profile = await leveling.Fetch(message.author.id);
		if (profile.level == 0) {
			leveling.SetLevel(message.author.id, 1);
			leveling.SetXp(message.author.id, 0);
		}
		leveling.AddXp(message.author.id, 5);
		//If user xp higher than 100 add level
		if (profile.xp + 5 > 100) {
			await leveling.AddLevel(message.author.id, 1);
			await leveling.SetXp(message.author.id, 0);
			if ((profile.xp = 100)) {
				processLineByLine('channel.txt', message);
				// TODO: Add function for iteration to read each guild and channel id

				console.log(`guild id: ${guildId}, channel id: ${channelRankId}`);
				const channelToSendRank = message.guild.channels.cache.find(
					(i) => i.id === channelRankId
				) as TextChannel;
				// console.log(profile.xp);
				const card = new canvacord.Rank()
					.setUsername(message.author.username)
					.setDiscriminator(message.author.discriminator)
					.setRank(profile.xp, 'placeholder', false)
					.setLevel(profile.level + 1)
					.setCurrentXP(profile.xp)
					.setRequiredXP(100)
					.renderEmojis(true)
					.setBackground('COLOR', '#ff865c')
					.setOverlay('#323150', 1, true)
					.setProgressBar(['#9f3763', '#ff865c'], 'GRADIENT', true)
					.setStatus(message.author.presence.status)
					.setAvatar(
						message.author.displayAvatarURL({ format: 'png', size: 1024 })
					);

				const img = await card.build();
				console.log(channelToSendRank.id);
				channelToSendRank.send(
					`Congratulations! ${message.author.toString()}, You Are now Level ${
						profile.level + 1
					}!!`
				);
				channelToSendRank.send(new MessageAttachment(img, 'rank.png'));
			}
		}
	}
	if (
		message.author.bot ||
		!message.guild ||
		!message.content.toLowerCase().startsWith('!')
	)
		return;

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
