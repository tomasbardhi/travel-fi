import { Pool } from "pg"

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT as string),
    database: process.env.PGDATABASE
})

export default pool