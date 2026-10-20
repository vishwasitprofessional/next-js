import nextEnv from '@next/env';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'node:url';

nextEnv.loadEnvConfig(fileURLToPath(new URL('../', import.meta.url)));
let connection;

try {
 for (const key of ['DB_HOST', 'DB_USER', 'DB_NAME']) {
   if (!process.env[key]) {
     throw new Error(`Missing ${key}. Set it in .env.local before running the seed.`);
   }
 }


 connection = await mysql.createConnection({
   host: process.env.DB_HOST,
   port: Number(process.env.DB_PORT || 3306),
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD || '',
   database: process.env.DB_NAME,
 });


//  await connection.query(`DROP TABLE users`);  

 await connection.query(`

    CREATE TABLE IF NOT EXISTS \`users\` (
     \`id\` bigint(20) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
     \`name\` varchar(255) NOT NULL,
     \`email\` varchar(255) NOT NULL,
     \`phone\` varchar(20) DEFAULT NULL,
     \`email_verified_at\` timestamp NULL DEFAULT NULL,
     \`password\` varchar(255) NOT NULL,
     \`remember_token\` varchar(100) DEFAULT NULL,
     \`type\` enum('admin','user') NOT NULL DEFAULT 'user',
     \`status\` tinyint(4) NOT NULL DEFAULT 0,
     \`created_at\` timestamp NULL DEFAULT NULL,
     \`updated_at\` timestamp NULL DEFAULT NULL
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
 `);


 const [existingUsers] = await connection.query('SELECT 1 FROM `users` LIMIT 1');

 if (existingUsers.length === 0) {
   await connection.query(`
   INSERT INTO \`users\` (\`id\`, \`name\`, \`email\`, \`phone\`, \`email_verified_at\`, \`password\`, \`remember_token\`, \`type\`, \`status\`, \`created_at\`, \`updated_at\`) VALUES
   (1, 'Admin', 'admin@dummy.com', NULL, NULL, '$2a$10$PAmiNiTJMrNKL6aqhMVa2uqZGgF6wye9aBOtLwsw7.soZIwXUXama', NULL, 'admin', 1, NULL, NULL),
   (2, 'user', 'user@dummy.com', NULL, NULL, '$2a$10$PAmiNiTJMrNKL6aqhMVa2uqZGgF6wye9aBOtLwsw7.soZIwXUXama', NULL, 'user', 1, NULL, NULL)
   `);
   console.log('Users seeded successfully.');
 } else {
   console.log('Users table is not empty. Skipping seed.');
 }
} catch (error) {
 console.error('Users seed failed:', error.message);
 process.exitCode = 1;
} finally {
 if (connection) await connection.end();
}

//node seeds/users.mjs              -- to run the seed