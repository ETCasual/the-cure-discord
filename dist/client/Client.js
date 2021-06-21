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
const fetch = require('node-fetch'); // Api fetch() function
const moment = require('moment-timezone');
const globPromise = util_1.promisify(glob_1.default);
const getTime = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const time = moment.tz(data.datetime, data.timezone).format('hh:mm A');
        return time;
    }
    catch (err) {
        console.error('API Err: ' + err);
    }
};
const timeMap = {
    KUL: 'http://worldtimeapi.org/api/timezone/Asia/Kuala_Lumpur',
    LONDON: 'http://worldtimeapi.org/api/timezone/Europe/London',
    MELBOURNE: 'http://worldtimeapi.org/api/timezone/Australia/Melbourne',
    DARWIN: 'http://worldtimeapi.org/api/timezone/Australia/Darwin',
    PERTH: 'http://worldtimeapi.org/api/timezone/Australia/Perth',
};
class Bot extends discord_js_1.Client {
    constructor() {
        super({
            ws: { intents: discord_js_1.Intents.ALL },
            messageCacheLifetime: 180,
            messageCacheMaxSize: 200,
            messageSweepInterval: 180,
        });
        this.logger = consola_1.default;
        this.commands = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
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
        let index = 0;
        setInterval(async () => {
            const timezone = Object.keys(timeMap);
            if (index === timezone.length)
                index = 0;
            const url = timeMap[timezone[index]];
            const time = await getTime(url);
            try {
                //   Setting the custom activity
                if (this.user) {
                    await this.user.setActivity({
                        name: `${timezone[index].toString()}: ${time}`,
                    });
                }
            }
            catch (err) {
                console.error('Discord Rate Err: ' + err);
            }
            // increase the index and loop again
            index++;
        }, 10000);
        // console.log(commandFiles);
        // console.log(eventFiles);
    }
    embed(options, message) {
        return new discord_js_1.MessageEmbed({ ...options, color: '#800080' }).setFooter(`${message.author.tag} | ${this.user.username}`, message.author.displayAvatarURL({ format: 'png', dynamic: true }));
    }
}
exports.Bot = Bot;
//# sourceMappingURL=Client.js.map