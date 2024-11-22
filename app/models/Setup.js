import Database from "../Database";

export default class Setup {
    static version = '0';

    static async init() {
        await Database.createTable(
            'Setup',
            {
                version: 'TEXT'
            }
        );
        await Database.delete('Setup');
        await Database.insert('Setup', {version: '0'});
        Setup.fromData((await Database.select('Setup'))[0]);
    }

    static fromData(data) {
        Setup.version = data.version;
    }

    static async findAll() {
        return await Database.select('Map');
    }
}