import https from 'https';
import fs from 'fs';
import path from 'path';

function fetchSearch(query) {
  return new Promise((resolve) => {
    const url = 'https://unsplash.com/s/photos/' + encodeURIComponent(query);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => {
        const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
        if (nextDataMatch) {
          try {
            const data = JSON.parse(nextDataMatch[1]);
            const results = data.props?.pageProps?.initialSearch?.photos?.results || [];
            console.log(`Results for ${query}: ${results.length}`);
            results.slice(0, 5).forEach(r => {
              console.log({
                id: r.id,
                description: r.alt_description || r.description,
                url: r.urls?.regular
              });
            });
            resolve(results);
            return;
          } catch (e) {
            console.log('Error parsing JSON:', e.message);
          }
        } else {
          console.log('No NEXT_DATA found for', query);
        }
        resolve([]);
      });
    }).on('error', e => {
      console.log('Fetch error:', e.message);
      resolve([]);
    });
  });
}

async function run() {
  await fetchSearch('indian-student');
  await fetchSearch('indian-tutor');
  await fetchSearch('indian-brother');
}

run();
