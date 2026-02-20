#!/bin/sh
# Create the CMS schema if it doesn't exist (required for Railway PostgreSQL)
if [ -n "$DATABASE_URL" ]; then
  echo "Creating cms schema if not exists..."
  node -e "
    const { Client } = require('pg');
    const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
    client.connect()
      .then(() => client.query('CREATE SCHEMA IF NOT EXISTS cms'))
      .then(() => { console.log('Schema cms ready.'); client.end(); })
      .catch(err => { console.warn('Schema creation skipped:', err.message); client.end(); });
  "
fi
exec npm run start
