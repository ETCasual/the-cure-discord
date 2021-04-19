"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verseScrapper = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const verseScrapper = async (client, message, url) => {
    const AxiosInstance = axios_1.default.create();
    AxiosInstance.get(url)
        .then(
    // Once we have data returned ...
    async (response) => {
        const html = response.data; // Get the HTML from the HTTP request
        const $ = cheerio_1.default.load(html);
        const dailyVerse = $('.passage-box');
        console.log(dailyVerse);
        dailyVerse.each(async (i, elem) => {
            const verseTitle = $(elem)
                .find('.verse-bar > a > span')
                .text(); // Parse the title
            const verseVersion = $(elem)
                .find('.verse-bar > a')
                .text()
                .trim()
                .slice(verseTitle.length); // Parse the version
            const versePassage = $(elem).find('#verse-text').text(); // Parse the passage
            await message.channel.send(client.embed({ title: `${verseTitle}`, description: `${versePassage}` }, message));
        });
    })
        .catch(console.error); // Error handling
};
exports.verseScrapper = verseScrapper;
//# sourceMappingURL=verseScrapper.js.map