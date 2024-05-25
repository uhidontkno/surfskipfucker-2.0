import cheerio from 'cheerio';

export async function scrapeLinks(): Promise<string[]> {
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
export async function scrapeGoogleDoc(): Promise<string[]> {
    let res = await fetch("https://docs.google.com/document/u/0/export?format=txt&id=1ebE4sCBR6u7B4xPfSPKt29IpgOpdv8L7oe-DRHiu9GE&includes_info_params=true&cros_files=false")
    let txt= await res.text()
    const regex = /https?:\/\/[^"\s]+/g;
    const matches = txt.match(regex);
    return matches || [];
}
export default {scrapeLinks,scrapeGoogleDoc}