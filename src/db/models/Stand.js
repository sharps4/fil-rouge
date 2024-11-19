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

    static fromData(data) {
        return Stand(
            data.name,
            data.map,
            data.x,
            data.y,
            data.width,
            data.height,
            data.visited
        );
    }

    static findAll() {
        return Database.select('Stand');
    }

    static findByMap(name) {
        return []
        return Database.select('Stand', {map: name}).map(data => Stand.fromData(data));
    }
}