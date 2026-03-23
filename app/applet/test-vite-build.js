import { build } from 'vite';
import fs from 'fs';

async function test() {
  fs.writeFileSync('test-app.js', 'console.log(process.env.GEMINI_API_KEY);');
  
  await build({
    root: '.',
    build: {
      lib: { entry: 'test-app.js', formats: ['es'] },
      outDir: 'test-dist',
      emptyOutDir: true,
    },
    define: {
      'process.env.GEMINI_API_KEY': undefined
    }
  });

  const out = fs.readFileSync('test-dist/test-app.js', 'utf-8');
  console.log('OUTPUT:', out);
}

test();
