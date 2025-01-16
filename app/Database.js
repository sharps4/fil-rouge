import { enablePromise, openDatabase, deleteDatabase } from 'react-native-sqlite-storage';

export default class Database {
    static connection = undefined;

    static async init() {
        if (Database.connection === undefined) {
            enablePromise(true);
            Database.connection = await openDatabase({
                name:     'db.sqlite',
                location: 'default'
            });
        }
    }

    static async execute(query, prepare = []) {
        try {
            await Database.init();
            const items = [];
            const results = await Database.connection.executeSql(query, prepare);
            results.forEach(result => {
                for (let i = 0; i < result.rows.length; i++) {
                    items.push(result.rows.item(i));
                }
            });
            return items;
        }
        catch (error) {
            return [];
        }
    }

    static async dropTable(name) {
        return await Database.execute(`DROP TABLE IF EXISTS ${name}`);
    }

    static async createTable(name, columns) {
        return await Database.execute(`
            CREATE TABLE IF NOT EXISTS ${name}(
                ${Object.keys(columns).map(column => `${column} ${columns[column]}`).join(',')}
            );
        `);
    }

    static async insert(table, values) {
        const keys = Object.keys(values);
        return await Database.execute(
            `
                INSERT INTO ${table}(
                    ${keys.join(',')}
                ) VALUES (
                    ${keys.map(column => '?').join(',')}
                )
            `,
            keys.map(key => values[key])
        );
    }

    static async delete(table, where = {}) {
        const keys = Object.keys(where);
        return await Database.execute(
            `
                DELETE FROM ${table}
                ${keys.length == 0 ? '' : `
                    WHERE ${keys.map(key => `${table}.${key}=?`).join(' AND ')}
                `}
            `,
            keys.map(key => where[key])
        );
    }

    static async select(table, where = {}) {
        const keys = Object.keys(where);
        return await Database.execute(
            `
                SELECT *
                FROM ${table}
                ${keys.length == 0 ? '' : `
                    WHERE ${keys.map(key => `${table}.${key}=?`).join(' AND ')}
                `}
            `,
            keys.map(key => where[key])
        );
    }
};