import urllib.request
import json

url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=indian+student+study+laptop&gsrlimit=10&prop=imageinfo&iiprop=url|extmetadata'
req = urllib.request.Request(url, headers={'User-Agent': 'GapZeroEducationBot/1.0 (contact@gapzero.in)'})
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        pages = data.get('query', {}).get('pages', {})
        for pid, p in pages.items():
            title = p.get('title')
            ii = p.get('imageinfo', [{}])[0]
            print(title)
            print("URL:", ii.get('url'))
            desc = ii.get('extmetadata', {}).get('ImageDescription', {}).get('value', 'No desc')
            print("Desc:", desc[:100])
            print("---")
except Exception as e:
    print("Error:", e)
