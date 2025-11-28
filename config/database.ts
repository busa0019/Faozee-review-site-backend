// config/database.js

const { parse } = require('pg-connection-string'); // <--- CRITICAL: Make sure this line exists!

module.exports = ({ env }) => {
  const connectionString = env('DATABASE_URL');

  if (connectionString) {
    const config = parse(connectionString);

    return {
      connection: {
        client: 'postgres', // <--- This must be 'postgres'
        connection: {
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          // Neon requires SSL. rejectUnauthorized: false is common for self-signed certs.
          ssl: env.bool('DATABASE_SSL', true) ? { rejectUnauthorized: false } : false, 
        },
        acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
      },
    };
  }

  // Fallback (We don't use this, but it must be present for the file to be valid)
  return {
    connection: {
      client: env('DATABASE_CLIENT', 'sqlite'), // NOTE: If DATABASE_URL fails, it might fall back to 'sqlite' here
      filename: env('DATABASE_FILENAME', '.tmp/data.db'),
    },
  };
};