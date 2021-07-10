import { RunFunction } from '../../interfaces/Command';

import admin from 'firebase-admin';

import serviceAccount from '../../../firebaseKey.json';
import { Channel } from 'discord.js';

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const answers = [
	{
		gameName: 'lockHeart',
		answer: 'GGWP',
	},
	{
		gameName: 'Hello Police',
		answer: 'OhMaiGawd',
	},
];

const answersList = [];
const gamesList = [];
for (var i in answers) {
	answersList.push(answers[i].answer);
	gamesList.push(answers[i].gameName);
}

class FetchedChannel extends Channel {
	name?: string;
}

export const run: RunFunction = async (client, message, args) => {
	var channelName: string;

	await client.channels
		.fetch(message.channel.id)
		.then((channel: FetchedChannel) => (channelName = channel.name));

	console.log(channelName);
	if (channelName.includes('submission')) {
		const DB = admin.firestore();

		if (!answersList.includes(args[0]) || args.length != 1) {
			await message.channel.send(
				client.emptyEmbed({
					title: 'Wrong Answer!',
					description: 'Please Try Again!',
				})
			);
		} else {
			const indexNo = answersList.indexOf(args[0]);

			const today = new Date();

			if (
				(
					await DB.collection(gamesList[indexNo])
						.doc(message.member.displayName)
						.get()
				).exists
			) {
				console.log('Record Exist!');
				await message.channel.send(
					client.emptyEmbed({
						title: 'Duplicate!',
						description:
							'Correct Answer is sent! Not accepting duplicate answers!',
					})
				);
			}
			try {
				await DB.collection(gamesList[indexNo])
					.doc(message.member.displayName)
					.create({
						Answer: args[0],
						Group: message.member.displayName,
						'Submission Time':
							today.getHours() +
							':' +
							today.getMinutes() +
							':' +
							today.getSeconds(),
					})
					.then(async () => {
						console.log('Data Sent to database');
						await message.channel.send(
							client.emptyEmbed({
								title: 'Correct Answer!',
								description: 'Please Proceed next!',
							})
						);
					})
					.catch(async (err) => {
						console.log(err);

						if (err.code != 6) {
							await message.channel.send('<@430671266215886848>');
							await message.channel.send(
								client.emptyEmbed({
									title: 'FIREBASE ERROR!',
									description: err.details,
								})
							);
						}
					});
			} catch (err) {
				console.log(err);
			}
		}
	} else {
		return;
	}
};

export const name: string = 'answer';
