const https = require('https');
const fs = require('fs');

const url1 = 'https://storage.googleapis.com/aistudio-user-uploads-prod/2026-03-25/01-51-53/image_0.png';
const url2 = 'https://storage.googleapis.com/aistudio-user-uploads-prod/2026-03-25/01-51-53/image_1.png';

https.get(url1, (res) => {
  const file = fs.createWriteStream("image_0.png");
  res.pipe(file);
});

https.get(url2, (res) => {
  const file = fs.createWriteStream("image_1.png");
  res.pipe(file);
});
