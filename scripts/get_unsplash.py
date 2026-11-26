import subprocess
import json
import re
import urllib.request
import os

queries = ['indian-student-studying', 'indian-tutoring', 'indian-student-laptop', 'indian-teen-studying']

for q in queries:
    print(f"=== Query: {q} ===")
    cmd = ['curl.exe', '-s', '-L', f'https://unsplash.com/s/photos/{q}']
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding='utf-8', errors='ignore')
    match = re.search(r'<script id="__NEXT_DATA__" type="application/json">([\s\S]*?)</script>', res.stdout)
    if match:
        try:
            data = json.loads(match.group(1))
            photos = data.get('props', {}).get('pageProps', {}).get('initialSearch', {}).get('photos', {}).get('results', [])
            print(f"Found {len(photos)} photos")
            for p in photos[:4]:
                pid = p.get('id')
                alt = p.get('alt_description') or p.get('description') or 'No description'
                raw_url = p.get('urls', {}).get('regular')
                print(f"ID: {pid} | Alt: {alt} | URL: {raw_url}")
        except Exception as e:
            print("Error parsing JSON:", e)
    else:
        print("No __NEXT_DATA__ found")
