import cheerio from 'cheerio';

async function scrapeLinks(): Promise<string[]> {
    try {
        const res = await fetch('https://links.surfskip.com');
        const html = await res.text();
        const c = cheerio.load(html);
        const url:any = c('script[type="module"]').attr('src');
        const jsRes = await fetch(new URL("https://links.surfskip.com"+url));
        const bundle = await jsRes.text();
        
        const regex = /https?:\/\/[^"\s]+/g;
        const matches = bundle.match(regex);
        return matches || [];
    } catch (error) {
        console.error('Error occurred while scraping links:', error);
        return [];
    }
}
export default {scrapeLinks}