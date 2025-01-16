import Database from '../Database';

export default class QuizzQuestion {
    constructor(
        id           = 0,
        description  = '',
        proposition0 = 0,
        proposition1 = 0,
        proposition2 = 0,
        proposition3 = 0,
        answer       = ''
    ) {
        this.id           = id;
        this.description  = description;
        this.proposition0 = proposition0;
        this.proposition1 = proposition1;
        this.proposition2 = proposition2;
        this.proposition3 = proposition3;
        this.answer       = answer;
    }

    static async init() {
        await Database.createTable(
            'QuizzQuestion',
            {
                id:           'INTEGER',
                description:  'TEXT',
                proposition0: 'INTEGER',
                proposition1: 'INTEGER',
                proposition2: 'INTEGER',
                proposition3: 'INTEGER',
                answer:       'INTEGER',
            }
        );
    }

    static fromData(data) {
        return new QuizzQuestion(
            data.id,
            data.description,
            data.proposition0,
            data.proposition1,
            data.proposition2,
            data.proposition3,
            data.answer,
        );
    }

    static async findAll() {
        return (await Database.select('QuizzQuestion')).map(data => QuizzQuestion.fromData(data));
    }

    static async findById(id) {
        const quizzQuestions = await Database.select('QuizzQuestion', { id: id });
        return quizzQuestions.length === 0 ? null : QuizzQuestion.fromData(quizzQuestions[0]);
    }

    static async deleteAll() {
        await Database.delete('QuizzQuestion');
    }

    async insert() {
        await Database.insert('QuizzQuestion', {
            id:           this.id,
            description:  this.description,
            proposition0: this.proposition0,
            proposition1: this.proposition1,
            proposition2: this.proposition2,
            proposition3: this.proposition3,
            answer:       this.answer,
        });
    }
}