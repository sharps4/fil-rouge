import Database from '../Database';

export default class Color {
    static all = {
        'primary':   '#00f',
        'secondary': '#ff7f00',
        'light':     '#fff',
        'dark':      '#000',
        'disabled':  '#7f7f7f',
        'valid':     '#0f0',
        'warning':   '#ff7f00',
        'error':     '#f00',
    };

    constructor(
        name = '',
        code = ''
    ) {
        this.name = name;
        this.code = code;
    }

    static async init() {
        await Database.createTable(
            'Color',
            {
                name: 'TEXT',
                code: 'TEXT',
            }
        );
        for (const color of await Color.findAll()) Color.all[color.name] = color.code;
    }

    static fromData(data) {
        return new Color(
            data.name,
            data.code,
        );
    }

    static async findAll() {
        return (await Database.select('Color')).map(data => Color.fromData(data));
    }

    static async deleteAll() {
        await Database.delete('Color');
        Color.all = {};
    }

    async insert() {
        await Database.insert('Color', {
            name: this.name,
            code: this.code,
        });
        Color.all[this.name] = this.code
    }

    static getCode(name) {
        return Color.all[name];
    }
}