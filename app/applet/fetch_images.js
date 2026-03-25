async function run() {
  try {
    const res = await fetch('https://smartstore.naver.com/lottehotel/products/12248114755');
    const data = await res.text();
    const matches = data.match(/https:\/\/shop-phinf\.pstatic\.net\/[^"'\\]+/g);
    if (matches) {
      console.log(Array.from(new Set(matches)).slice(0, 10).join('\n'));
    } else {
      console.log('No images found');
    }
  } catch (e) {
    console.log(e);
  }
}
run();
