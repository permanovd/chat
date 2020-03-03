import { User } from "../../security/services/AuthService";

export class Message {
    constructor(private _author: User, private _text: string, private _date: Date) { }

    public get author(): User {
        return this._author;
    }

    public get text(): string {
        return this._text;
    }

    public get date(): Date {
        return this._date;
    }

    public static of(data: { author: string, text: string, date: string }): Message {
        return new Message({ name: data.author }, data.text, new Date(data.date));
    }
}