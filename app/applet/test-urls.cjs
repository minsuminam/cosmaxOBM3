const https = require('https');
const http = require('http');

const urls = [
  'https://godomall-storage.cdn-nhncommerce.com/e9f3698822f4752682e9e476d8056c3d/goods/9250802/image/detail/9250802_detail_342.jpg',
  'https://m.intelrior.com/web/product/big/202402/160227e09a5a21874f32fdf06e98419a.png',
  'https://media.bunjang.co.kr/product/263843896_1_1724590464_w360.jpg',
  'https://www.cosinkorea.com/data/photos/20240937/art_17259462623283_5161e6.jpg',
  'https://id-live-01.slatic.net/p/0f1be9ecf084bb5eca01dbc1998a8d97.jpg',
  'https://img-cf.kurly.com/hdims/resize/>720x/quality/90/src/shop/data/goodsview/20240219/gv40000801716_2.jpg'
];

urls.forEach(url => {
  const client = url.startsWith('https') ? https : http;
  client.get(url, (res) => {
    console.log(`${url}: ${res.statusCode}`);
  }).on('error', (e) => {
    console.error(`${url}: ${e.message}`);
  });
});
