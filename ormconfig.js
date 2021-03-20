require('dotenv/config');

module.exports = {
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    },
  },
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [process.env.DB_ENTITIES],
  migrations: [process.env.DB_MIGRATIONS],
  cli: {
    migrationsDir: process.env.DB_MIGRATIONS_DIR,
  },
};
