import Database from '../Database';

export default class Stand {
    constructor(
        name    = '',
        map     = '',
        x       = 0,
        y       = 0,
        width   = 0,
        height  = 0,
        visited = false
    ) {
        this.name    = name;
        this.map     = map;
        this.x       = x;
        this.y       = y;
        this.width   = width;
        this.height  = height;
        this.visited = visited;
    }

    static async init() {
        await Database.createTable(
            'Stand',
            {
                name:    'TEXT',
                map:     'TEXT',
                x:       'INTEGER',
                y:       'INTEGER',
                width:   'INTEGER',
                height:  'INTEGER',
                visited: 'INTEGER',
            }
        );
    }

    static fromData(data) {
        return new Stand(
            data.name,
            data.map,
            data.x,
            data.y,
            data.width,
            data.height,
            data.visited,
        );
    }

    static async findAll() {
        return (await Database.select('Stand')).map(data => Stand.fromData(data));
    }

    static async findByMap(name) {
        return (await Database.select('Stand', { map: name })).map(data => Stand.fromData(data));
    }

    static async findByName(name) {
        const stands = await Database.select('Stand', { name: name });
        return stands.length === 0 ? null : Stand.fromData(stands[0]);
    }

    static async deleteAll() {
        await Database.delete('Stand');
    }

    async insert() {
        await Database.insert('Stand', {
            name:    this.name,
            map:     this.map,
            x:       this.x,
            y:       this.y,
            width:   this.width,
            height:  this.height,
            visited: this.visited,
        });
    }

    async update() {
        await Database.delete('Stand', { name: this.name });
        await this.insert();
    }
}