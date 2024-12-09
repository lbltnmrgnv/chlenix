import { Telegraf, Telegram } from 'telegraf';
import { AbstractCommand, IBotContext } from './command';
import * as fs from 'fs'
import { createHash } from 'crypto';

export class StartCommand extends AbstractCommand {
    private readonly logPrefix = '[Bot]'

    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }

    handler(): void {
        this.bot.use()
        this.bot.on('inline_query', async (ctx) => {
            const { first_name, last_name, id } = ctx.from
            console.log(first_name, last_name, id)
            const uniqueId = `${Date.now()}-${Math.random()}`;
            const uniqueId2 = `${Date.now()}-${Math.random()}`;


            const generateDailyRandomNumber = (inlineType: 'gay' | 'dick') => {
                const today = new Date();
                const seed = `${id}-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
                const hash = createHash('sha256').update(seed).digest('hex');
                const hashNumber = parseInt(hash.slice(0, 8), 16);

                const min = inlineType === 'gay' ? 0 : id === 642309347 ? 80 : 0;
                const max = inlineType === 'gay' ? 100 : id === 642309347 ? 100 : 52;

                const random = hashNumber % (max - min + 1);
                return random + min;
            };

            let dickLength = generateDailyRandomNumber('dick')

            const getTextByDickLength = (length: number): string => {
                if (dickLength === 49) {
                    dickLength = 49.5
                    return 'Как у девочек в проруби 👧🥶'
                }
                const messages = [
                    { min: 0, max: 0, text: 'Красотка, ты чего тут забыла? 👩‍🦳' },
                    { min: 1, max: 10, text: 'Корнишончик для засолочки подойдет 😂' },
                    { min: 11, max: 15, text: 'Как у моего деда 👴' },
                    { min: 16, max: 20, text: 'Таким особо никого не удивишь 🤔' },
                    { min: 21, max: 25, text: 'Будь у меня такой член - я б может и не женился бы никогда 🧑‍🤝‍🧑' },
                    { min: 26, max: 30, text: 'Неплохой аппарат 🤙' },
                    { min: 31, max: 35, text: 'Мужчинский у тебя писюнярик 👊' },
                    { min: 36, max: 40, text: 'Три ноги это сильно 💪' },
                    { min: 41, max: 51, text: 'Дрова колоть можно 🪓' },
                    { min: 52, max: 52, text: 'ПИСЯТ ДВА ✋✌️' },
                    { min: 53, max: Infinity, text: 'Наш слоняра 🐘' },
                ];

                const match = messages.find(({ min, max }) => length >= min && length <= max);
                return match?.text || '';
            };
            const text = getTextByDickLength(dickLength);

            const dickResult = {
                type: 'article',
                id: uniqueId,
                title: 'Узнай биг ли у тебя дик',
                input_message_content: {
                    message_text: `Размер твоего члена: ${dickLength}cm. ` + text,
                },
            };

            const procent = generateDailyRandomNumber('gay')

            const gayResult = {
                type: 'article',
                id: uniqueId2,
                title: 'Узнай на сколько ты гей',
                input_message_content: {
                    message_text: `Ты гей на ${procent}%🏳️‍🌈`,
                },
            };
            // @ts-ignore
            await ctx.answerInlineQuery([dickResult, gayResult], { cache_time: 0 });
        });
    }
}