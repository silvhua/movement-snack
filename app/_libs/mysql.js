import mysql from 'mysql2/promise'
import 'dotenv/config';

const connectionLimit = process.env.CONNECTION_LIMIT || 8;
console.log(`User: ${process.env.DB_USER}`)
console.log(`Connection limit: ${connectionLimit}`);
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    connectionLimit: connectionLimit,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    queueLimit: 0, // The maximum number of connection requests the pool will queue before returning an error from getConnection.
    idleTimeout: 30000, // 30 seconds idle timeout
    acquireTimeout: 20000, // 20 seconds to acquire connection
    timeout: 60000, // 60 seconds query timeout
    reconnect: true,
    multipleStatements: false
})
// pool.end(); // remove the pool
export default pool