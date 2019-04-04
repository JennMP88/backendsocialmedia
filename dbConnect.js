// const pgp=require('pg-promise')({});
// const connectionString='postgres://localhost/socialmedia';
// const db=pgp(connectionString)

const pgp = require('pg-promise')({});
const db = pgp(process.env.DATABASE_URL || 'postgres://localhost/socialmedia')


module.exports={
    db
}