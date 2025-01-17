import Database from '../Database';

export default class HangedManWord {
    constructor(
        word        = '',
        wordSet     = '',
        description = ''
    ) {
        this.word        = word;
        this.wordSet     = wordSet;
        this.description = description;
    }

    static async init() {
        await Database.createTable(
            'HangedManWord',
            {
                word:        'TEXT',
                wordSet:     'TEXT',
                description: 'TEXT',
            }
        );
    }

    static fromData(data) {
        return new HangedManWord(
            data.word,
            data.wordSet,
            data.description,
        );
    }

    static async findAll() {
        return (await Database.select('HangedManWord')).map(data => HangedManWord.fromData(data));
    }

    static async findBySet(set) {
        return (await Database.select('HangedManWord', { wordSet: set })).map(data => HangedManWord.fromData(data));
    }

    static async deleteAll() {
        await Database.delete('HangedManWord');
    }

    async insert() {
        await Database.insert('HangedManWord', {
            word:        this.word,
            wordSet:     this.wordSet,
            description: this.description,
        });
    }
}