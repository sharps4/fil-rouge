import { openDatabase } from 'react-native-sqlite-storage';

export default class Database {
    static connection = undefined;

    static valueToString(value) {
        switch (typeof(value)) {
            case 'number':  return value.toString();
            case 'string':  return `'${value}'`;
            case 'boolean': return value ? '1' : '0';
        }
    }

    static init() {
        if (Database.connection == undefined) {
            Database.connection = openDatabase({
                name:     'todo-data.db',
                location: 'default'
            });
        }
    }

    static execute(query) {
        Database.init();
        return Database.connection.executeSql(query);
    }

    static createTable(name, columns) {
        Database.execute(`
            CREATE TABLE ${name}(
                ${Object.keys(columns).map(column => `${column} ${columns[column]}`).join(',')}
            );
        `);
    }

    static insert(table, values) {
        Database.execute(`
            INSERT INTO ${table}(
                ${Object.keys(values).join(',')}
            ) VALUES (
                ${Object.keys(values).map(column => Database.valueToString(values[column])).join(',')}
            )
        `);
    }

    static select(table, where) {
        const keys = Object.keys(where);
        return Database.execute(`
            SELECT *
            FROM ${table}
            ${where.length == 0 ? '' : `
                WHERE ${keys.map(key => `'${key}'=${Database.valueToString(where[key])}`).join(' AND ')}
            `}
        `);
    }
};