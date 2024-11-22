import Database from "../Database";

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
                rule: 'TEXT'
            }
        );
    }

    static fromData(data) {
        return new Map(
            data.name,
            data.rule
        );
    }

    static async findAll() {
        return await Database.select('Credits');
    }
}