const { Pool } = require("pg");

const pool = new Pool({
    connectionString: 'postgresql://postgres.afutioapoaruxmdvyaar:8B6J05EtByiV8WoA@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres',
});


pool.connect()
.then(() => {
    console.log("PostgreSQL Connected");
})
.catch((err) => {
    console.log("DB Connection Error::", err);
});

module.exports = pool;