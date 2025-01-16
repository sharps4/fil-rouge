import Database from '../Database';

export default class Credits {
    constructor(
        name = '',
        rule = ''
    ) {
        this.name = name;
        this.rule = rule;
    }

    static async init() {
        await Database.createTable(
            'Credits',
            {
                name: 'TEXT',
                rule: 'TEXT',
            }
        );
    }

    static fromData(data) {
        return new Credits(
            data.name,
            data.rule,
        );
    }

    static async findAll() {
        return (await Database.select('Credits')).map(data => Credits.fromData(data));
    }

    static async deleteAll() {
        await Database.delete('Credits');
    }

    async insert() {
        await Database.insert('Credits', {
            name: this.name,
            rule: this.rule,
        });
    }
}