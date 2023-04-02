const { Pool } = require('pg');

const db = new Pool({
    user: 'postgres',
    host: '65.0.173.177',
    database: 'postgres',
    password: 'dogzone',
    port: 5432, // default PostgreSQL port
    max: 20, // maximum number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
});


module.exports = {
    db
};



