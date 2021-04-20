"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
const discord_js_1 = require("discord.js");
const leveling = require('discord-leveling');
const canvacord = require('canvacord');
const run = async (client, message) => {
    var profile = await leveling.Fetch(message.author.id);
    const card = new canvacord.Rank()
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator)
        .setRank(profile.xp, 'placeholder', false)
        .setLevel(profile.level)
        .setCurrentXP(profile.xp)
        .setRequiredXP(100)
        .renderEmojis(true)
        .setBackground('COLOR', '#ff865c')
        .setOverlay('#323150', 1, true)
        .setProgressBar(['#9f3763', '#ff865c'], 'GRADIENT', true)
        .setStatus(message.author.presence.status)
        .setAvatar(message.author.displayAvatarURL({ format: 'png', size: 1024 }));
    const img = await card.build();
    message.channel.send('<@' + message.author.id.toString() + '>');
    message.channel.send(new discord_js_1.MessageAttachment(img, 'rank.png'));
};
exports.run = run;
exports.name = 'rank';
//# sourceMappingURL=RankCardCommand.js.map