const colors = require('colors');

import { mkdir } from "node:fs/promises";
import * as readline from 'node:readline/promises';  // This uses the promise-based APIs
import { stdin as input, stdout as output } from 'node:process';

import scraper from "./modules/scraper"
import reporter from "./modules/reporter"
import filters from "./modules/filters"


async function prompt(ask:string) {
    const rl = readline.createInterface({ input, output });
    let res = await rl.question(ask);
    rl.close();
    return res;
}
console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

console.clear();

console.log("Surfskip Fucker 2.0".rainbow + " | ".gray + "by: rare1k\n".blue.bold);

console.log("🧑‍🌾" + " Scraping Method: ".blue)
console.log("| ".gray + "🔗" + " [1]".brightBlue.bold + " links.surfskip.com")
console.log("| ".gray + "📄" + " [2]".brightBlue.bold + " Google Docs")
console.log("| ".gray + "🌐" + " [3]".yellow.bold + " Censys API Search" + " (not implemented)".gray)
console.log("| ".gray + "🚪" + " [0]".brightRed.bold + " Exit".red.bold)
console.log("| ".gray);
let method;
while (true) {
method = await prompt("| Type your option: ".gray);
if (Number(method) == 0) {
    console.log("\n🚪" + " Exiting...");
    process.exit(0)
} else
if (Number(method) == 3) {
    console.log("  ❌" + " Option not implemented.".red.bold);
} else
if (Number(method)) {
    break;
}
}
// console.log("\n📬" + " Starting Report".blue + " (to content keeper)".gray)
console.log("📬" + " Starting Report".blue + " (to lightspeed)".gray)
let email:string = await prompt("| ".gray + "📨 Report Email".blue + " [anonymous]".gray + ": ".blue);
if (email.trim() == "" || !email) {
    email = "lightspeedreports@xitroo.com"
    console.write("\u001b[K")
    console.write("\u001b[1A")
    console.write("| ".gray + "📨 Report Email:".blue + " anonymous    \n")
    console.log("|  ".gray + "  Using lightspeedreports@xitroo.com");
}
let reason:string = await prompt("| ".gray + "❔ Report Reason".blue + " [Surfskip Proxy]".gray + ": ".blue);
if (reason.trim() == "" || !reason) {
    reason = "Surfskip Proxy"
    console.write("\u001b[K")
    console.write("\u001b[1A")
    console.write("| ".gray + "❔ Report Reason:".blue + " Surfskip Proxy    \n")
}

console.log("\n🔗" + " Scraping links...".blue)
let links:string[] = [];
switch (Number(method)) {
    case 1:
        links = await scraper.scrapeLinks();
        console.log("| ".gray + "🔗" + " Got ".blue + String(links.length).green.bold + " links!".blue);
        break;
    case 2:
        links = await scraper.scrapeGoogleDoc();
        console.log("| ".gray + "🔗" + " Got ".blue + String(links.length).green.bold + " links!".blue);
        break;
}
await mkdir(new URL("./tmp/", import.meta.url), { recursive: true });
let file = Bun.write(new URL("./tmp/out.txt", import.meta.url),links.join("\n"))
console.log("| ".gray + "💾" + " For your convenience, the scraped links are in: ".green + "tmp/out.txt".bold);