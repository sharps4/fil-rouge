import Database from '../Database';

export default class Quizz {
    constructor(
        id          = 0,
        question0Id = 0,
        question1Id = 0,
        question2Id = 0,
        question3Id = 0
    ) {
        this.id          = id;
        this.question0Id = question0Id;
        this.question1Id = question1Id;
        this.question2Id = question2Id;
        this.question3Id = question3Id;
    }

    static async init() {
        await Database.createTable(
            'Quizz',
            {
                id:          'INTEGER',
                question0Id: 'INTEGER',
                question1Id: 'INTEGER',
                question2Id: 'INTEGER',
                question3Id: 'INTEGER',
            }
        );
    }

    static fromData(data) {
        return new Quizz(
            data.id,
            data.question0Id,
            data.question1Id,
            data.question2Id,
            data.question3Id,
        );
    }

    static async findAll() {
        return (await Database.select('Quizz')).map(data => Quizz.fromData(data));
    }

    static async findById(id) {
        const quizzs = await Database.select('Quizz', { id: id });
        return quizzs.length === 0 ? null : Quizz.fromData(quizzs[0]);
    }

    static async deleteAll() {
        await Database.delete('Quizz');
    }

    async insert() {
        await Database.insert('Quizz', {
            id:          this.id,
            question0Id: this.question0Id,
            question1Id: this.question1Id,
            question2Id: this.question2Id,
            question3Id: this.question3Id,
        });
    }
}