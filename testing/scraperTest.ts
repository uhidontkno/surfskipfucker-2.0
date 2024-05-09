import scraper from "../modules/scraper"
let start = Date.now();
console.log(await scraper.scrapeLinks())
let end = Date.now();
console.log(`Took ${end-start}ms`)
start = Date.now();
console.log(await scraper.scrapeGoogleDoc())
end = Date.now();
console.log(`Took ${end-start}ms`)