const mysql = require('mysql2');
require('dotenv').config(); 

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:  process.env.DB_NAME
});

function handleDisconnect() {
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database: ' + err.stack);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('Connected to the database');
        }
    });

    db.on('error', (err) => {
        console.error('Database error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Reconnecting to the database...');
            handleDisconnect(); 
        } else {
            throw err; 
        }
    });
}

handleDisconnect();

module.exports = db;
