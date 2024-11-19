import { openDatabase } from 'react-native-sqlite-storage';

export default class Database {
    static connection = undefined;

    static valueToString(value) {
        switch (typeof(value)) {
            case 'number':  return value.toString();
            case 'string':  return `"${value}"`;
            case 'boolean': return value ? '1' : '0';
        }
    }

    static async init() {
        if (Database.connection == undefined) {
            Database.connection = await openDatabase({
                name:     'todo-data.db',
                location: 'default'
            });
        }
    }

    static async execute(query) {
        await Database.init();
        return await Database.connection.executeSql(query);
    }

    static async createTable(name, columns) {
        await Database.execute(`
            CREATE TABLE ${name}(
                ${Object.keys(columns).map(column => `${column} ${columns[column]}`).join(',')}
            );
        `);
    }

    static async insert(table, values) {
        await Database.execute(`
            INSERT INTO ${table}(
                ${Object.keys(values).join(',')}
            ) VALUES (
                ${Object.keys(values).map(column => Database.valueToString(values[column])).join(',')}
            )
        `);
    }

    static async select(table, where) {
        const keys = Object.keys(where);
        return await Database.execute(`
            SELECT *
            FROM ${table}
            ${where.length == 0 ? '' : `
                WHERE ${keys.map(key => `${table}.${key}=${Database.valueToString(where[key])}`).join(' AND ')}
            `}
        `);
    }
};