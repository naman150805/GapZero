import urllib.request
import json

queries = ['student India studying', 'classroom India student', 'college student India', 'tutoring India']

for q in queries:
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch={urllib.parse.quote(q)}&gsrlimit=6&prop=imageinfo&iiprop=url|mime|extmetadata"
    req = urllib.request.Request(url, headers={'User-Agent': 'GapZeroEducationBot/1.0 (contact@gapzero.in)'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data.get('query', {}).get('pages', {})
            print("=== Query:", q, "===")
            for pid, p in pages.items():
                title = p.get('title')
                ii = p.get('imageinfo', [{}])[0]
                mime = ii.get('mime')
                if mime in ['image/jpeg', 'image/png', 'image/webp']:
                    url_img = ii.get('url')
                    desc = ii.get('extmetadata', {}).get('ImageDescription', {}).get('value', '')
                    print(title)
                    print(url_img)
                    print("Desc:", desc[:80])
    except Exception as e:
        print("Error:", e)
