import { Telegraf } from 'telegraf';
import {AbstractCommand, IBotContext} from "./command";
import {StartCommand} from "./start.command";

export class TgBot {
    bot: Telegraf<IBotContext>;
    commands: AbstractCommand[] = [];

    constructor() {
        this.bot = new Telegraf<IBotContext>('7451620926:AAGiHyb6zInob1x-zxvfNoU_V7-nXRtD64U', { handlerTimeout: 1800000 });
    }

    init() {
        this.commands.push(new StartCommand(this.bot));
        this.commands.forEach((command) => {
            command.handler();
        });
        this.bot.launch();
    }
}

const bot = new TgBot();
bot.init();