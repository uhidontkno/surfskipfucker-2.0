const colors = require('colors');

import * as readline from 'node:readline/promises';  // This uses the promise-based APIs
import { stdin as input, stdout as output } from 'node:process';

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
let email:string = await prompt("| ".gray + "📨 Report Email: ".blue);
let reason:string = await prompt("| ".gray + "❔ Report Reason".blue + " [Surfskip Proxy]".gray + ": ".blue);
if (reason.trim() == "" || !reason) {reason = "Surfskip Proxy"}

console.log("\n🔗" + " Scraping links...".blue)