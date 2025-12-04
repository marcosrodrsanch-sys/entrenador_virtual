const jwt = require('jsonwebtoken');
require('dotenv').config();

// Pega tu token aquí (sin Bearer)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c3VhcmlvMUBnbWFpbC5jb20iLCJpYXQiOjE3NjQ2NjM3OTUsImV4cCI6MTc2NTI2ODU5NX0.vhPETXKwTRzkFh3tCLxaivKPplQuBiju2t0unIuvDzg';

const secret = process.env.JWT_SECRET;

console.log('Token a verificar:', token);
console.log('Secret usado:', secret);

try {
    const decoded = jwt.verify(token, secret);
    console.log('✅ Token válido!');
    console.log('Contenido:', decoded);
} catch (error) {
    console.log('❌ Error:', error.message);
}