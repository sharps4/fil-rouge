import Database from '../Database';

export default class IntruderImage {
    constructor(
        id      = 0,
        keyword = '',
        image   = ''
    ) {
        this.id      = id;
        this.keyword = keyword;
        this.image   = image;
    }

    static async init() {
        await Database.createTable(
            'IntruderImage',
            {
                id:      'INTEGER',
                keyword: 'TEXT',
                image:   'TEXT',
            }
        );
    }

    static fromData(data) {
        return new IntruderImage(
            data.id,
            data.keyword,
            data.image,
        );
    }

    static async findAll() {
        return (await Database.select('IntruderImage')).map(data => IntruderImage.fromData(data));
    }

    static async findByKeyword(keyword) {
        return (await Database.select('IntruderImage', { keyword: keyword })).map(data => IntruderImage.fromData(data));
    }

    static async deleteAll() {
        await Database.delete('IntruderImage');
    }

    async insert() {
        await Database.insert('IntruderImage', {
            id:      this.id,
            keyword: this.keyword,
            image:   this.image,
        });
    }
}