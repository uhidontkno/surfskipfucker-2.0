if (process.argv.includes("--help")) {
    await import("./modules/help.ts");process.exit(0)
}

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
console.log("| ".gray + "🌐" + " [3]".yellow.bold + " BOTH".bold)
console.log("| ".gray + "🚪" + " [0]".brightRed.bold + " Exit".red.bold)
console.log("| ".gray);
let method;
while (true) {
    if (process.argv.indexOf("--method") != -1) {
        method = (process.argv.indexOf("--method")) + 1
        if (!process.argv[method] || !Number(process.argv[method])) {
            console.log("\n❌" + " Use --method followed by a number.".brightRed.bold);
            console.log("🚪" + " Exiting...");
            process.exit(0)
        }
        console.log("| Type your option: ".gray + process.argv[method] + " (from stdin)".gray)
        method = process.argv[method];
        
    } else {
method = await prompt("| Type your option: ".gray);
    }
if (Number(method) == 0) {
    console.log("\n🚪" + " Exiting...");
    process.exit(0)
} else
if (Number(method) && [1,2,3].includes(Number(method))) {
    break;
} else {
    console.log("❌" + " Not a valid choice.".brightRed.bold);
    if (process.argv.indexOf("--method") != -1) {
        
        console.log("🚪" + " Exiting...");
        process.exit(1)
    }
}
}
// console.log("\n📬" + " Starting Report".blue + " (to content keeper)".gray)
console.log("📬" + " Starting Report".blue + " (to lightspeed)".gray)
let email = ""
if (process.argv.indexOf("--email") == -1) {
email = await prompt("| ".gray + "📨 Report Email".blue + " [anonymous]".gray + ": ".blue);
if (email.trim() == "" || !email) {
    email = "lightspeedreports@xitroo.com"
    console.write("\u001b[K")
    console.write("\u001b[1A")
    console.write("| ".gray + "📨 Report Email:".blue + " anonymous    \n")
    console.log("|  ".gray + "  Using lightspeedreports@xitroo.com");
}
} else {
    let stdinEmail = (process.argv.indexOf("--email") + 1)
    if (!process.argv[stdinEmail]) {
        console.log("| ".gray + "📨 Report Email:".blue + ` ${"invalid".brightRed.bold}`)
        console.log("| ".gray + "Use anonymous, none, or default if you want to use defaults.".brightRed.bold)
        process.exit(1);
    }
    if (process.argv[stdinEmail].includes("@") && !["anonymous","none","default"].includes(process.argv[stdinEmail])) {
        email = process.argv[stdinEmail]
        console.log("| ".gray + "📨 Report Email:".blue + ` ${process.argv[stdinEmail]} ${"(from stdin)".gray}`)
    } else {
        if (["anonymous","none","default"].includes(process.argv[stdinEmail])) {
            email = "lightspeedreports@xitroo.com"
            console.log("| ".gray + "📨 Report Email:".blue + ` anonymous ${"(from stdin)".gray}`)
            console.log("|  ".gray + "  Using lightspeedreports@xitroo.com");
        } else {
            console.log("| ".gray + "📨 Report Email:".blue + ` ${"invalid".brightRed.bold}\n`)
            process.exit(1);
        }
    }
}
let reason;
if (process.argv.indexOf("--reason") != -1) {
    reason = process.argv[process.argv.indexOf("--reason") + 1]
    if (!reason) {
        console.log("| ".gray + "❔ Report Reason:".blue + " invalid".bold.brightRed)
        console.log("| ".gray + "Use none or default to use the defaults.".bold.brightRed)
    }
    if (reason == "none" || reason == "default") {
        reason = "Surfskip Proxy"

    }
    console.log("| ".gray + "❔ Report Reason: ".blue + reason + " (from stdin)".gray)
} else {
reason = await prompt("| ".gray + "❔ Report Reason".blue + " [Surfskip Proxy]".gray + ": ".blue);
if (reason.trim() == "" || !reason) {
    
    reason = "Surfskip Proxy"
    console.write("\u001b[K")
    console.write("\u001b[1A")
    console.write("| ".gray + "❔ Report Reason:".blue + " Surfskip Proxy    \n")
}
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
    case 3:
        links = await scraper.scrapeGoogleDoc();
        links = links.concat(await scraper.scrapeLinks())
        console.log("| ".gray + "🔗" + " Got ".blue + String(links.length).green.bold + " links!".blue);
        break;
}
await mkdir(new URL("./tmp/", import.meta.url), { recursive: true });
let file = Bun.write(new URL("./tmp/out.txt", import.meta.url),links.join("\n"))
console.log("| ".gray + "💾" + " For your convenience, the scraped links are in: ".green + "tmp/out.txt".bold);
console.log("| ".gray);
console.log("\n🤡" + " Reporting links...  ".rainbow + "MUAHAHAHAHA!".red.bold.underline);
console.write("\n\n")
let remove = ["status.surfskip.com/status/surfskip","whynotprivacy.com/blogs/privacy/proxies"]

let skipped = 0;
for (let i = 0; i < links.length; i++) {
    console.write("\u001b[2A")
    console.write("\u001b[32D")
    let category = await filters.lightspeed(links[i])
    // console.write(category[0]) //debug
    if (remove.includes(links[i].replace("https://",""))) {
        // silently skip for formatting purposes
        skipped++;
    } else 
    if (category[0].includes("security") || category[0].includes("proxy") || category[1].includes("security") || category[1].includes("proxy") ) {
        
        console.log("| ".gray + `❗ Skipped ${links[i].replace("https://","").replaceAll("/","")} because already blocked`.red);
        skipped++;
    } else {
        let reportOK = true
        if (process.argv.indexOf("--demo") == -1) {
        reportOK = await reporter.reportLightspeed(email,links[i].replace("https://","").replaceAll("/",""),reason)
        } 
        if (reportOK) {
            console.log("| ".gray + `✅ Sent ${links[i].replace("https://","").replaceAll("/","")} to lightspeed!`.green);
        } else {
            console.log("| ".gray + `❗ Failed to report ${links[i]}.`.red); skipped++;
        }
    }   
    console.write("                                             \n")
    console.write("                                             \n")
    console.write("\u001b[K")
    console.write("\u001b[2A")
    console.write("| ".gray + `🤡 Reported ${String((i+1) - skipped).bold} links!`.blue )
    console.write("\u001b[1B")
    console.write("\u001b[32D")
    console.write("| ".gray + `🤡 Skipped ${String(skipped).bold} links!`.blue )
    console.write("\u001b[1B")
    
}
console.write("\u001b[32D")
console.write("\n")