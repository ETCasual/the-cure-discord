import axios from 'axios';
import cheerio, { Cheerio } from 'cheerio';

import { Message } from 'discord.js';

export const verseScrapper = async (client, message: Message, url: string) => {
	const AxiosInstance = axios.create();
	AxiosInstance.get(url)
		.then(
			// Once we have data returned ...
			async (response) => {
				const html = response.data; // Get the HTML from the HTTP request
				const $ = cheerio.load(html);
				const dailyVerse: Cheerio = $('.passage-box');
				console.log(dailyVerse);

				dailyVerse.each(async (i, elem) => {
					const verseTitle: string = $(elem)
						.find('.verse-bar > a > span')
						.text(); // Parse the title
					const verseVersion: string = $(elem)
						.find('.verse-bar > a')
						.text()
						.trim()
						.slice(verseTitle.length); // Parse the version
					const versePassage: string = $(elem).find('#verse-text').text(); // Parse the passage
					await message.channel.send(
						client.embed(
							{ title: `${verseTitle}`, description: `${versePassage}` },
							message
						)
					);
				});
			}
		)
		.catch(console.error); // Error handling
};
