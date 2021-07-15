"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const consola_1 = __importDefault(require("consola"));
const discord_js_1 = require("discord.js");
const glob_1 = __importDefault(require("glob"));
const util_1 = require("util");
const globPromise = util_1.promisify(glob_1.default);
class Bot extends discord_js_1.Client {
    logger = consola_1.default;
    commands = new discord_js_1.Collection();
    events = new discord_js_1.Collection();
    config;
    constructor() {
        super({
            ws: { intents: discord_js_1.Intents.ALL },
            messageCacheLifetime: 180,
            messageCacheMaxSize: 200,
            messageSweepInterval: 180,
        });
    }
    async start(config) {
        this.config = config;
        this.login(config.token);
        const commandFiles = await globPromise(`${__dirname}/../commands/**/*{.ts,.js}`);
        commandFiles.map(async (value) => {
            const file = await Promise.resolve().then(() => __importStar(require(value)));
            this.commands.set(file.name, file);
            console.log(file);
        });
        const eventFiles = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`);
        eventFiles.map(async (value) => {
            const file = await Promise.resolve().then(() => __importStar(require(value)));
            this.events.set(file.name, file);
            this.on(file.name, file.run.bind(null, this));
            console.log(file);
        });
        setTimeout(async () => {
            try {
                //   Setting the custom activity
                if (this.user) {
                    await this.user.setActivity({
                        name: 'Researching for vaccine!',
                    });
                }
            }
            catch (err) {
                console.error('Discord Rate Err: ' + err);
            }
        }, 2000);
        // increase the index and loop again
        // console.log(commandFiles);
        // console.log(eventFiles);
    }
    emptyEmbed(options) {
        return new discord_js_1.MessageEmbed({ ...options, color: '#ef1b1b' });
    }
    embed(options, message) {
        return new discord_js_1.MessageEmbed({ ...options, color: '#ef1b1b' }).setFooter(`${message.author.tag} | ${this.user.username}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
    }
}
exports.Bot = Bot;
//# sourceMappingURL=Client.js.map