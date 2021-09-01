const PG_URI = 'postgres://bqoedcuf:goPsR7j5kF7TM9swbzfELNc697Vx3brd@kashin.db.elephantsql.com/bqoedcuf';
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
