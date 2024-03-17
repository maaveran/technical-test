require('dotenv').config();

const SEEDER_STORAGE = "sequelize"
const MIGRATION_TABLE_NAME = "sequelize_migrations"
const SEEDER_TABLE_NAME = "sequelize_seeders"

const dbConfig = {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    seederStorage: SEEDER_STORAGE,
    migrationStorageTableName: MIGRATION_TABLE_NAME,
    seederStorageTableName: SEEDER_TABLE_NAME,
    define: {
        charset: 'latin1',
        collate: 'latin1_swedish_ci'
    }
}

module.exports = {
    development: dbConfig,
    staging: dbConfig,
    test: dbConfig,
    preproduction: dbConfig,
    production: dbConfig
};