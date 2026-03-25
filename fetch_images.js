const https = require('https');

https.get('https://smartstore.naver.com/lottehotel/products/12248114755', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const matches = data.match(/https:\/\/shop-phinf\.pstatic\.net\/[^"']+/g);
    if (matches) {
      console.log(Array.from(new Set(matches)).slice(0, 5).join('\n'));
    } else {
      console.log('No images found');
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
