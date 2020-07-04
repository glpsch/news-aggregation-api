require('dotenv').config();

module.exports.PORT = process.env.PORT || 3000;
module.exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/news-db';
module.exports.JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
