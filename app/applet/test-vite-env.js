import { loadEnv } from 'vite';
const env = loadEnv('production', '.', '');
console.log('JSON.stringify(env.GEMINI_API_KEY):', JSON.stringify(env.GEMINI_API_KEY));
