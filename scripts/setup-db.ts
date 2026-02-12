
import { Pool } from 'pg';

// Netlify automatically injects 'NETLIFY_DATABASE_URL' (pooled) when using the Neon integration.
// We fall back to the manual string provided if the env var isn't present.
const connectionString =
    process.env.NETLIFY_DATABASE_URL ||
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_rDJWIvH7Q1fZ@ep-icy-water-ae0115ox-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

if (!connectionString) {
    console.error('No DATABASE_URL or NETLIFY_DATABASE_URL found.');
    process.exit(1);
}

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

const createTables = async () => {
    try {
        console.log('Creating tables...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS members (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                role TEXT,
                profession TEXT,
                short_description TEXT,
                business_help TEXT,
                image_url TEXT,
                email TEXT,
                whatsapp TEXT,
                birthday TEXT,
                business_url TEXT,
                socials JSONB
            );
        `);
        console.log(' - members table created/verified.');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                date_str TEXT,
                time_str TEXT,
                location TEXT,
                description TEXT,
                image_url TEXT
            );
        `);
        console.log(' - events table created/verified.');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS gallery_items (
                id SERIAL PRIMARY KEY,
                image_url TEXT NOT NULL,
                caption TEXT,
                is_instagram BOOLEAN DEFAULT false,
                link TEXT
            );
        `);
        console.log(' - gallery_items table created/verified.');

        console.log('Tables setup complete.');
    } catch (err) {
        console.error('Error creating tables:', err);
    }
};

const seedData = async () => {
    try {
        console.log('Seeding initial data...');

        const membersCount = await pool.query('SELECT COUNT(*) FROM members');
        if (parseInt(membersCount.rows[0].count) === 0) {
            console.log('Seeding members...');
            const members = [

                {
                    name: "Sixto Matrínez Garrido",
                    role: "Socio Activo",
                    profession: "Contador Público",
                    shortDescription: "Experto en contabilidad y finanzas.",
                    businessHelp: "Asesoría fiscal, contable y financiera.",
                    imageUrl: "/sixto-martinez.jpeg",
                    email: "sixto.martinez@example.com",
                    whatsapp: "522224394451",
                    birthday: "01/01",
                    socials: { linkedin: "https://linkedin.com" }
                }
            ];

            for (const m of members) {
                await pool.query(
                    `INSERT INTO members (name, role, profession, short_description, business_help, image_url, email, whatsapp, birthday, socials)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                    [m.name, m.role, m.profession, m.shortDescription, m.businessHelp, m.imageUrl, m.email, m.whatsapp, m.birthday, JSON.stringify(m.socials)]
                );
            }
            console.log(' - Members seeded.');
        } else {
            console.log(' - Members table not empty, skipping seed.');
        }

        const galleryCount = await pool.query('SELECT COUNT(*) FROM gallery_items');
        if (parseInt(galleryCount.rows[0].count) === 0) {
            console.log('Seeding gallery...');
            const items = [
                { imageUrl: "/gallery-1.png", caption: "Evento Rotario", isInstagram: false },
                { imageUrl: "/gallery-2.png", caption: "Actividades del Club", isInstagram: false }
            ];
            for (const item of items) {
                await pool.query(
                    `INSERT INTO gallery_items (image_url, caption, is_instagram) VALUES ($1, $2, $3)`,
                    [item.imageUrl, item.caption, item.isInstagram]
                );
            }
            console.log(' - Gallery seeded.');
        } else {
            console.log(' - Gallery table not empty, skipping seed.');
        }

        const eventsCount = await pool.query('SELECT COUNT(*) FROM events');
        if (parseInt(eventsCount.rows[0].count) === 0) {
            console.log('Seeding events...');
            const events = [
                {
                    title: "Brindis Navideño",
                    date: "Jueves 4 Diciembre",
                    time: "20:00 hrs",
                    location: "Restaurante Mil Amores",
                    description: "Celebremos juntos las fiestas decembrinas en nuestro tradicional brindis navideño.",
                    imageUrl: "/brindis-navideno.jpg"
                }
            ];
            for (const e of events) {
                await pool.query(
                    `INSERT INTO events (title, date_str, time_str, location, description, image_url)
                     VALUES ($1, $2, $3, $4, $5, $6)`,
                    [e.title, e.date, e.time, e.location, e.description, e.imageUrl]
                );
            }
            console.log(' - Events seeded.');
        } else {
            console.log(' - Events table not empty, skipping seed.');
        }

        console.log('Seeding complete.');

    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        await pool.end();
    }
};

// Execute
(async () => {
    await createTables();
    await seedData();
})();
