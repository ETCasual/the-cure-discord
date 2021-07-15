"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.run = void 0;
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
const run = async (client, message) => {
    await message.channel.send(client.emptyEmbed({
        title: rules.title,
        description: rules.description,
    }));
};
exports.run = run;
exports.name = 'rules';
//# sourceMappingURL=RulesCommand.js.map