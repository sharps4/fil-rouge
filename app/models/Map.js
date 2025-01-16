import Database from '../Database';

export default class Map {
    constructor(
        name = ''
    ) {
        this.name = name;
    }

    static async init() {
        await Database.createTable(
            'Map',
            {
                name: 'TEXT',
            }
        );
    }

    static fromData(data) {
        return new Map(
            data.name,
        );
    }

    static async findAll() {
        return (await Database.select('Map')).map(data => Map.fromData(data));
    }

    static async deleteAll() {
        await Database.delete('Map');
    }

    async insert() {
        await Database.insert('Map', {
            name: this.name,
        });
    }
}