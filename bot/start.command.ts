import {Telegraf, Telegram} from 'telegraf';
import {AbstractCommand, IBotContext} from './command';

import * as fs from 'fs'

export class StartCommand extends AbstractCommand {
    private readonly logPrefix = '[Bot]'

    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }

    handler(): void {
        this.bot.use()
        this.bot.on('inline_query', async (ctx) => {
            console.log('salam')
            const {first_name, last_name, id} = ctx.from
            console.log(first_name, last_name, id)
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            const dickLength = id === 642309347 ? Math.floor(Math.random() * (90 - 80 + 1)) + 80 : randomNumber
            const uniqueId = `${Date.now()}-${Math.random()}`;
            const getTextByDickLength = (dickLength: number): string => {
                const messages = [
                    {min: 0, max: 0, text: 'Красотка, ты чего тут забыла? 👩‍🦳'},
                    {min: 1, max: 10, text: 'Корнишончик для засолочки подойдет 😂'},
                    {min: 11, max: 20, text: 'Таким особо никого не удивишь 🤔'},
                    {min: 21, max: 30, text: 'Неплохой аппарат 🤙'},
                    {min: 31, max: 40, text: 'Три ноги это сильно 💪'},
                    {min: 41, max: 50, text: 'Нет слов... 🙈'},
                    {min: 51, max: Infinity, text: 'Наш слоняра 🐘'},
                ];

                const match = messages.find(({min, max}) => dickLength >= min && dickLength <= max);
                return match?.text || '';
            };
            const text = getTextByDickLength(dickLength);

            // Создаем ответ в инлайн-режиме
            const result = {
                type: 'article',
                id: uniqueId,
                title: 'Узнай биг ли у тебя дик',
                input_message_content: {
                    message_text: `Размер твоего члена: ${dickLength}cm. ` + text,
                },
            };

            // Отправляем результат
            // @ts-ignore
            await ctx.answerInlineQuery([result], {cache_time: 0});
        });
    }
}