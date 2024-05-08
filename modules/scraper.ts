import cheerio from 'cheerio';

async function scrapeLinks(): Promise<string[]> {
    try {
        const res = await fetch('https://links.surfskip.com');
        const html = await res.text();
        const c = cheerio.load(html);
        const url = c('script[type="module"]').attr('src');
        const jsRes = await fetch(url);
        const bundle = await jsRes.text();
        const regex = /(?i)\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/;
        const matches = bundle.match(regex);
        return matches || [];
    } catch (error) {
        console.error('Error occurred while scraping links:', error);
        return [];
    }
}
export default {scrapeLinks}