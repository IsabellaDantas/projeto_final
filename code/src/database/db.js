const { Pool } = require('pg');


const pool = new Pool({
  connectionString: 'postgres://aluno_20201214010030:1365@177.136.200.206:5439/temp?schema=aluno_20201214010030',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});


module.exports = pool;