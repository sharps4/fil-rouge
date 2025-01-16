import Database from '../Database';

export default class Setup {
    static version     = '0';
    static from        = null;
    static to          = null;
    static description = null;
    static site        = null;

    static async init() {
        await Database.dropTable('Setup');
        await Database.createTable(
            'Setup',
            {
                version:     'TEXT',
                from:        'TEXT',
                to:          'TEXT',
                description: 'TEXT',
                site:        'TEXT',
            }
        );
        await Database.delete('Setup');
        await Database.insert('Setup', { version: '0', from: null, to: null, description: null, site: null });
        Setup.fromData((await Database.select('Setup'))[0]);
    }

    static fromData(data) {
        Setup.version     = data.version;
        Setup.from        = data.from;
        Setup.to          = data.to;
        Setup.description = data.description;
        Setup.site        = data.site;
    }

    static async update() {
        await Database.execute('UPDATE Setup SET version = ?, from = ?, to = ?, description = ?, site = ?', [
            Setup.version,
            Setup.from,
            Setup.to,
            Setup.description,
            Setup.site,
        ]);
    }

    static getWaitingTime() {
        const from = new Date(Setup.from);
        const to = new Date(Setup.to);
        const now = new Date();
        return (
            Setup.from && Setup.to ? (
                now < from ? from-now-(new Date(3600000))
                : now > to ? (
                    (now-to)/1000/3600/24 > 7 ? 'nothing'
                    : 'finish'
                ) : 'started'
            ) : 'nothing'
        );
    }
}