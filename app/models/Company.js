import Database from '../Database';

export default class Company {
    constructor(
        name           = '',
        stand          = '',
        description    = '',
        site           = '',
        logo           = '',
        activitySector = ''
    ) {
        this.name           = name;
        this.stand          = stand;
        this.description    = description;
        this.site           = site;
        this.logo           = logo;
        this.activitySector = activitySector;
    }

    static async init() {
        await Database.createTable(
            'Company',
            {
                name:           'TEXT',
                stand:          'TEXT',
                description:    'TEXT',
                site:           'TEXT',
                logo:           'TEXT',
                activitySector: 'TEXT',
            }
        );
    }

    static fromData(data) {
        return new Company(
            data.name,
            data.stand,
            data.description,
            data.site,
            data.logo,
            data.activitySector,
        );
    }

    static async findAll() {
        return await Database.select('Company');
    }

    static async findByStand(name) {
        return (await Database.select('Company', { stand: name })).map(data => Company.fromData(data));
    }

    static async findByName(name) {
        return (await Database.select('Company', { name: name }))[0];
    }

    static async search(name = '', sector = 'Tous') {
        return await Database.execute(`
            SELECT *
            FROM Company
            ${name !== '' || sector !== 'Tous' ? 'WHERE ' : ''}
            ${name !== '' ? `name LIKE '%${name}%'` : ''}
            ${name !== '' && sector !== 'Tous' ? ' AND ' : ''}
            ${sector !== 'Tous' ? `activitySector = '${sector}'` : ''}
        `);
    }

    static async findAllSectors() {
        return (await Database.execute('SELECT DISTINCT activitySector FROM Company'));
    }

    static async deleteAll() {
        await Database.delete('Company');
    }

    async insert() {
        await Database.insert('Company', {
            name:           this.name,
            stand:          this.stand,
            description:    this.description,
            site:           this.site,
            logo:           this.logo,
            activitySector: this.activitySector,
        });
    }
}