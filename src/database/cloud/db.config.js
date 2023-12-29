export default {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_HOST | 5432,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
};


