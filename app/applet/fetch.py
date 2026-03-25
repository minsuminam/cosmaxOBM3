import urllib.request
import re

url = "https://smartstore.naver.com/lottehotel/products/12248114755"
req = urllib.request.Request(
    url, 
    data=None, 
    headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
    }
)

try:
    response = urllib.request.urlopen(req)
    html = response.read().decode('utf-8')
    matches = re.findall(r'https://shop-phinf\.pstatic\.net/[^"\']+', html)
    unique_matches = list(set(matches))
    for match in unique_matches[:10]:
        print(match)
except Exception as e:
    print(e)
