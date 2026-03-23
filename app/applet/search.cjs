const google = require('googlethis');

async function searchImages() {
  const queries = [
    '롯데호텔 어메니티 Emissary.73 Depaysmo',
    '단미르 화장품',
    '레이레이 화장품 박막례',
    '에버랜드 플로레비다 화장품',
    '원더미스 WONDERMIS 화장품',
    '퍼셀 PURCELL 화장품'
  ];

  for (const q of queries) {
    try {
      const images = await google.image(q, { safe: false });
      console.log(`\n--- ${q} ---`);
      if (images && images.length > 0) {
        for (let i = 0; i < Math.min(3, images.length); i++) {
          console.log(images[i].url);
        }
      } else {
        console.log('No images found');
      }
    } catch (e) {
      console.error(`Error for ${q}:`, e.message);
    }
  }
}

searchImages();
