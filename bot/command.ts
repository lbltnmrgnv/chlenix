import { Telegraf, Context } from 'telegraf';
import * as tt from 'telegraf/typings/telegram-types';

export interface IBotContext extends Context { }

export abstract class AbstractCommand {
    constructor(public bot: Telegraf<IBotContext>) { }

    abstract handler(): void;

    async safeEditMessageText(ctx: Context, newText: string, extra?: tt.ExtraEditMessageText) {
        try {
            if ('callback_query' in ctx.update) {
                const message = ctx.update.callback_query.message;
                if (message && 'text' in message && typeof message.text === 'string') {
                    const currentMessageText = message.text;
                    const currentReplyMarkup = message.reply_markup;
                    const newReplyMarkup = extra?.reply_markup;
                    const isTextChanged = newText !== currentMessageText;
                    const isMarkupChanged = JSON.stringify(newReplyMarkup) !== JSON.stringify(currentReplyMarkup);

                    if (isTextChanged || isMarkupChanged) {
                        await ctx.editMessageText(newText, extra);
                    }
                }
            }
        } catch (error) {
            return
        }
    }
}