const mysql = require('mysql2/promise');

// Crear pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'entrenador_virtual_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función para probar la conexión
const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conectado a MySQL exitosamente');
        connection.release();
        return pool;
    } catch (error) {
        console.error('❌ Error conectando a MySQL:', error.message);
        throw error;
    }
};

module.exports = { pool, connectDB };