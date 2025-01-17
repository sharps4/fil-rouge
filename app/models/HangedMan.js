import Database from '../Database';

export default class HangedMan {
    constructor(
        id      = 0,
        wordSet = ''
    ) {
        this.id      = id;
        this.wordSet = wordSet;
    }

    static async init() {
        await Database.createTable(
            'HangedMan',
            {
                id:      'INTEGER',
                wordSet: 'TEXT',
            }
        );
    }

    static fromData(data) {
        return new HangedMan(
            data.id,
            data.wordSet,
        );
    }

    static async findAll() {
        return (await Database.select('HangedMan')).map(data => HangedMan.fromData(data));
    }

    static async findById(id) {
        const hangedMans = await Database.select('HangedMan', { id: id });
        return hangedMans.length === 0 ? null : HangedMan.fromData(hangedMans[0]);
    }

    static async deleteAll() {
        await Database.delete('HangedMan');
    }

    async insert() {
        await Database.insert('HangedMan', {
            id:      this.id,
            wordSet: this.wordSet,
        });
    }
}