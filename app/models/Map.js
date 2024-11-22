import Database from "../Database";

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
                name: 'TEXT'
            }
        );
        await Database.delete('Map');
        await Database.insert('Map', {name: 'Map 0'});
        await Database.insert('Map', {name: 'Map 1'});
    }

    static fromData(data) {
        return new Map(
            data.name
        );
    }

    static async findAll() {
        return await Database.select('Map');
    }
}