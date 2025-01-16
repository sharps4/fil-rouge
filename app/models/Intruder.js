import Database from '../Database';

export default class Intruder {
    constructor(
        id      = 0,
        keyword = ''
    ) {
        this.id      = id;
        this.keyword = keyword;
    }

    static async init() {
        await Database.createTable(
            'Intruder',
            {
                id:      'INTEGER',
                keyword: 'TEXT',
            }
        );
    }

    static fromData(data) {
        return new Intruder(
            data.id,
            data.keyword,
        );
    }

    static async findAll() {
        return (await Database.select('Intruder')).map(data => Intruder.fromData(data));
    }

    static async findById(id) {
        const intruders = await Database.select('Intruder', { id: id });
        return intruders.length === 0 ? null : Intruder.fromData(intruders[0]);
    }

    static async deleteAll() {
        await Database.delete('Intruder');
    }

    async insert() {
        await Database.insert('Intruder', {
            id:      this.id,
            keyword: this.keyword,
        });
    }
}