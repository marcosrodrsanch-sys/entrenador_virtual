const { connectDB, pool } = require('./config/database');

const testConnection = async () => {
    try {
        // Probar conexión
        await connectDB();
        
        // Probar una consulta simple
        const [rows] = await pool.execute('SELECT 1 + 1 AS resultado');
        console.log('✅ Consulta de prueba:', rows[0].resultado);
        
        // Ver las tablas
        const [tables] = await pool.execute('SHOW TABLES');
        console.log('📊 Tablas en la base de datos:');
        tables.forEach(table => {
            console.log(`   - ${table.Tables_in_entrenador_virtual_db}`);
        });
        
        console.log('\n✅ ¡Todo funcionando correctamente!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

testConnection();