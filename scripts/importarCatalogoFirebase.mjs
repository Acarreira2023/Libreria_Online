import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const logPath = path.join(rootDir, 'firebase-import.log');

function log(message) {
  fs.appendFileSync(logPath, `${new Date().toISOString()} ${message}\n`);
  console.log(message);
}

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');

  envContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .forEach((line) => {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value.replace(/^["']|["']$/g, '');
    });
}

log('Variables de entorno cargadas.');

const requiredKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
];

const missingKeys = requiredKeys.filter((key) => !process.env[key]);

if (missingKeys.length > 0) {
  throw new Error(`Faltan variables de Firebase en .env: ${missingKeys.join(', ')}`);
}

try {
  log('Inicializando Firebase e importando catalogo...');
  const { importarCatalogo } = await import('../src/utils/seed.js');
  log('Ejecutando batch de Firestore...');
  const result = await importarCatalogo();

  log(result.message);
  process.exit(0);
} catch (error) {
  log(`No se pudo importar el catalogo en Firebase: ${error.message}`);
  console.error('No se pudo importar el catalogo en Firebase:', error);
  process.exit(1);
}
