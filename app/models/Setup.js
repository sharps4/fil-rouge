import Database from '../Database';

export default class Setup {
    static version     = '0';
    static description = null;
    static site        = null;

    static async init() {
        await Database.dropTable('Setup');
        await Database.createTable(
            'Setup',
            {
                version:     'TEXT',
                description: 'TEXT',
                site:        'TEXT',
            }
        );
        await Database.delete('Setup');
        await Database.insert('Setup', { version: '0', description: null, site: null });
        Setup.fromData((await Database.select('Setup'))[0]);
    }

    static fromData(data) {
        Setup.version     = data.version;
        Setup.description = data.description;
        Setup.site        = data.site;
    }

    static async findAll() {
        return await Database.select('Map');
    }

    static async update() {
        await Database.execute('UPDATE Setup SET version = ?', [Setup.version]);
    }
}