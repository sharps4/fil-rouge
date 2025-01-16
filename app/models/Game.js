import Database from '../Database';

export default class Game {
    constructor(
        id      = 0,
        stand   = '',
        type    = '',
        gameId  = 0,
        score   = 0,
        played  = false
    ) {
        this.id     = id;
        this.stand  = stand;
        this.type   = type;
        this.gameId = gameId;
        this.score  = score;
        this.played = played;
    }

    static async init() {
        await Database.createTable(
            'Game',
            {
                id:     'INTEGER',
                stand:  'TEXT',
                type:   'TEXT',
                gameId: 'INTEGER',
                score:  'INTEGER',
                played: 'INTEGER',
            }
        );
    }

    static fromData(data) {
        return new Game(
            data.id,
            data.stand,
            data.type,
            data.gameId,
            data.score,
            data.played,
        );
    }

    static async findAll() {
        return (await Database.select('Game')).map(data => Game.fromData(data));
    }

    static async findByStand(name) {
        const games = await Database.select('Game', { stand: name });
        return games.length === 0 ? null : Game.fromData(games[0]);
    }

    static async deleteAll() {
        await Database.delete('Game');
    }

    async insert() {
        await Database.insert('Game', {
            id:     this.id,
            stand:  this.stand,
            type:   this.type,
            gameId: this.gameId,
            score:  this.score,
            played: this.played,
        });
    }

    async update() {
        await Database.delete('Game', { id: this.id });
        await this.insert();
    }
}