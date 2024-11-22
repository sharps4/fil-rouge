import Database from "../Database";

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
        this.name = name;
        this.map = map;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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
                visited: 'INTEGER'
            }
        );
        await Database.delete('Stand');
        await Database.insert('Stand', {
            name:   'Stand 1',
            map:    'Map 0',
            x:      0,
            y:      0,
            width:  2,
            height: 1
        });
        await Database.insert('Stand', {
            name:   'Stand 2',
            map:    'Map 0',
            x:      2,
            y:      2,
            width:  1,
            height: 1
        });
        await Database.insert('Stand', {
            name:   'Stand 10',
            map:    'Map 1',
            x:      0,
            y:      0,
            width:  2,
            height: 2
        });
    }

    static fromData(data) {
        return new Stand(
            data.name,
            data.map,
            data.x,
            data.y,
            data.width,
            data.height,
            data.visited
        );
    }

    static async findAll() {
        return await Database.select('Stand');
    }

    static async findByMap(name) {
        return (await Database.select('Stand', {map: name})).map(data => Stand.fromData(data));
    }
}