import { RunFunction } from '../../interfaces/Command';

import admin from 'firebase-admin';

import serviceAccount from '../../../firebaseKey.json';

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

for (var i in answers) {
	answersList.push(answers[i].answer);
}

export const run: RunFunction = async (client, message, args) => {
	const DB = admin.firestore();

	if (!answersList.includes(args[0]) || args.length != 1) {
		await message.channel.send(
			client.emptyEmbed({
				title: 'Wrong Answer!',
				description: 'Please Try Again!',
			})
		);
	} else {
		const today = new Date();
		try {
			await DB.collection('answers')
				.doc(message.member.displayName + ' - ' + '  ')
				.create({
					Answer: args[0],
					Group: message.member.displayName,
					Time:
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
					await message.channel.send('<@430671266215886848>');
					await message.channel.send(
						client.emptyEmbed({
							title: 'FIREBASE ERROR!',
							description: err.details,
						})
					);
				});
		} catch (err) {
			console.log(err);
		}
	}
};

export const name: string = 'answer';
