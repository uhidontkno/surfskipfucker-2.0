const colors = require('colors');

import * as readline from 'node:readline/promises';  // This uses the promise-based APIs
import { stdin as input, stdout as output } from 'node:process';

async function prompt(ask:string) {
    const rl = readline.createInterface({ input, output });
    let res = await rl.question(ask);
    rl.close();
    return res;
}

console.clear();

console.log("Surfskip Fucker 2.0".rainbow + " | ".gray + "by: rare1k\n".blue.bold);

console.log("🧑‍🌾" + " Scraping Method: ".blue)
console.log("| ".gray + "🔗" + " [1]".brightBlue.bold + " links.surfskip.com")
console.log("| ".gray + "📄" + " [2]".brightBlue.bold + " Google Docs")
console.log("| ".gray + "🌐" + " [3]".yellow.bold + " Censys API Search" + " (not implemented)".gray)
console.log("| ".gray);
let method;
while (true) {
method = await prompt("| Type your option: ".gray);
if (Number(method)) {
    break;
} 
}
console.log(method)