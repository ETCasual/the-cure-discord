import axios from 'axios';
import cheerio, { Cheerio } from 'cheerio';

interface Votd {
	verseTitle: string;
	verseVersion: string;
	versePassage: string;
}
const votd: Votd[] = [];

export const verseScrapper = async (url: string): Promise<Votd[]> => {
	const AxiosInstance = axios.create();
	AxiosInstance.get(url)
		.then(
			// Once we have data returned ...
			(response) => {
				const html = response.data; // Get the HTML from the HTTP request
				const $ = cheerio.load(html);
				const dailyVerse: Cheerio = $('.passage-box');
				console.log(dailyVerse);

				dailyVerse.each((i, elem) => {
					const verseTitle: string = $(elem)
						.find('.verse-bar > a > span')
						.text(); // Parse the title
					const verseVersion: string = $(elem)
						.find('.verse-bar > a')
						.text()
						.trim()
						.slice(30, 55); // Parse the version
					const versePassage: string = $(elem).find('#verse-text').text(); // Parse the passage
					votd.push({
						verseTitle,
						verseVersion,
						versePassage,
					});
					// Here got
					console.log('here: ' + votd);
				});
			}
		)
		.catch(console.error); // Error handling
	// Here no
	console.log('no' + votd);
	return votd;
};
