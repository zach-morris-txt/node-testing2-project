const common = {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
        conn.run('PRAGMA journal_mode = OFF')
      },
    },
  }
  
  module.exports = {
    development: {
      ...common,
      connection: {
        filename: './data/books.db3',
      },
    },
    testing: {
      ...common,
      connection: {
        filename: './data/books.db3',
      },
    },
    production: {
  
    },
  };