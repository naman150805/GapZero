import https from 'https';

function getPhotos(query) {
  return new Promise((resolve) => {
    const url = 'https://unsplash.com/s/photos/' + encodeURIComponent(query);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => {
        const regex = /https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9_-]+)\?/g;
        const matches = new Set();
        let m;
        while ((m = regex.exec(html)) !== null) {
          matches.add(m[1]);
        }
        console.log('QUERY:', query, 'FOUND:', Array.from(matches).slice(0, 8));
        resolve();
      });
    }).on('error', (e) => {
      console.log('Error', e.message);
      resolve();
    });
  });
}

async function run() {
  await getPhotos('indian-student');
  await getPhotos('indian-student-study');
  await getPhotos('student-mentoring');
  await getPhotos('tutoring');
}

run();
