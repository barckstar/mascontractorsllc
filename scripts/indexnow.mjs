// Tells Bing (and other IndexNow engines) which URLs changed, so they re-crawl
// now instead of waiting. Usage:
//   node scripts/indexnow.mjs                 -> every URL in the live sitemap
//   node scripts/indexnow.mjs <url> [<url>…]  -> only those URLs
// The key is public by design: the engines fetch it from the site to verify
// ownership (public/f64918cc50d3b4f92c37343b7d0885d1.txt).
const HOST = 'mascontractors.com';
const KEY = 'f64918cc50d3b4f92c37343b7d0885d1';

const args = process.argv.slice(2);
let urls = args;
if (!urls.length) {
    const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (!urls.length) throw new Error('No URLs to submit');

const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URLs -> HTTP ${res.status} ${res.statusText}`);
if (res.status !== 200 && res.status !== 202) {
    console.log(await res.text());
    process.exit(1);
}
