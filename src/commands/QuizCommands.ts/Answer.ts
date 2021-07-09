import { Message } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import axios from 'axios';
import cheerio, { Cheerio } from 'cheerio';

export const run: RunFunction = async (client, message, args) => {
	args[0] != 'answer'
		? await message.channel.send(
				client.embed(
					{
						title: 'Wrong Answer!',
						description: 'Please Try Again!',
					},
					message
				)
		  )
		: await message.channel.send(
				client.embed(
					{
						title: 'Correct Answer!',
						description: 'Please Proceed next!',
					},
					message
				)
		  );
};

export const name: string = 'answer';
