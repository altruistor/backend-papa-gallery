import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { Client } from 'pg';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const readDir = promisify(fs.readdir);

const uploadsDir = path.join(__dirname, 'public', 'uploads');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  await client.connect();
  console.log('🔌 Connected to DB');

  const files = await readDir(uploadsDir);
    for (const file of files) {
        if (file.startsWith('.')) continue;
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile() && stats.size > 0){
      console.log(`⬆ Uploading ${file}...`);

      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'strapi_uploads',
        public_id: path.parse(file).name,
      });

      console.log(`✅ Uploaded: ${res.secure_url}`);

      const updateQuery = `
        UPDATE upload_file
        SET url = $1, provider = 'cloudinary'
        WHERE name = $2
      `;

      await client.query(updateQuery, [res.secure_url, file]);
      console.log(`📝 Updated DB record for ${file}`);
    }
  }

  await client.end();
  console.log('✅ Migration complete');
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});