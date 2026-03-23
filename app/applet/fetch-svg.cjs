const https = require('https');
https.get('https://www.cosmax.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const svgs = data.match(/<svg[\s\S]*?<\/svg>/g);
    if (svgs) {
      svgs.forEach(svg => console.log(svg));
    }
  });
});
