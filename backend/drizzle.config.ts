import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './src/schema',
    dialect: 'postgresql',
    dbCredentials: {
        url: "postgresql://postgres:rajatkumar@localhost:5432/email_sender"
    },
});


// npx drizzle-kit push
