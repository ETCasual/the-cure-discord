import { RunFunction } from '../../interfaces/Event';
// import { Message } from 'discord.js';

// const leveling = require('discord-leveling');

export const run: RunFunction = async (client) => {
	client.logger.success(`${client.user.tag} is now online!`);
};

export const name: string = 'ready';
