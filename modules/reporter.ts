export async function reportLightspeed(email:string,domain:string,reason:string) {
    let res = await fetch("https://production-archive-proxy-api.lightspeedsystems.com/archiveproxy", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.5",
          "content-type": "application/json",
          "x-api-key": "onEkoztnFpTi3VG7XQEq6skQWN3aFm3h"
        },
        "referrerPolicy": "same-origin",
        "body": `{\"query\":\"query SubmitIntoBFR($item: BFRSubmission!){\\n        item: custom_BFRSubmission(item: $item) {\\n            SubmittedURL\\n            ok\\n        }\\n      }\",\"variables\":{\"item\":{\"EmailAddress\":\"${email}\",\"Reason\":\"${reason}\",\"SubmittedURL\":\"${domain}\",\"Type\":\"DomainStandard\",\"Source\":\"archive\"}}}`,
        "method": "POST"
      });
      return res.ok
}
export default {reportLightspeed}