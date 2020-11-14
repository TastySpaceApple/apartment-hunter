const PAGE_URL = "https://www.facebook.com/groups/ApartmentsTelAviv/";
var puppeteer = require('puppeteer');

var user = {"email": "charlie@mailismagic.com", pass: "CharlieDog10"}

let browser, page;
let firstPage = true;

module.exports = {
  open: async function(){
    this.browser = await puppeteer.launch({headless:false, args: [ "--disable-notifications" ]});
  },
  login: async function(){
    page = await this.browser.newPage();
    await page.goto(`https://www.facebook.com/`);
    await page.waitFor('#email');
    await page.type('#email', user['email']);
    await page.waitFor('#pass');
    await page.type('#pass', user['pass']);
    await page.click('#loginbutton');
    await page.waitForNavigation({ waitUntil: 'networkidle0' })
  },
  scrapeGroup: async function(groupId, numPosts){
    //this.browser = await puppeteer.launch({headless:false});
    page = await this.browser.newPage();
    await page.goto(`https://www.facebook.com/groups/${groupId}/`);
    let posts = await page.evaluate( numPosts => {
      function waitTime(time){
        return new Promise((resolve, reject) => {
          setTimeout(resolve, time)
        })
      }
      async function read(){
        let feed = document.querySelector('div[role="feed"]');
        let el = feed.firstChild;
        let result = []
        while(result.length < numPosts){
          if(el.getAttribute("role") == "heading"){
            el = el.nextSibling;
          } else {
            window.scrollBy(0, el.getBoundingClientRect().top)
            await waitTime(1000);
            let text= el.querySelector('div[data-testid="post_message"]').textContent;
            let pictures = [...el.querySelectorAll('a[data-ploi]')].map(node => {
              return node.dataset.ploi;
            })
            let userLink = el.querySelector('.fwb > a')
            let posterLink = userLink.getAttribute('href');
            let posterName = userLink.getAttribute('title');
            let posterId = posterLink.substring('https://www.facebook.com/'.length, posterLink.indexOf('?'))
            let time = el.querySelector('[data-utime]').dataset.utime;
            // https://www.facebook.com/monita.roni?fref=gs&__tn__=%2CdC-R-R&eid=ARDNe7LlB76PLWEVLGk1HwWN0iSLw3OByEs5oxNue8WIWVO3VH3TqUqIHLCtVBPac85gefb3jK3DtcxP&hc_ref=ARSLPAmoGGNk3MfL_MX-3zZ2j5O0j6T3xcxGkRfPiEGrRmQs-LTjQbmBsF2PRQjh5Uo&dti=45245752193&hc_location=group
            result.push({text, pictures, postId: el.getAttribute('id'),
                        posterName,
                        posterId,
                        date: new Date(time*1000)})
            el = el.nextSibling;
          }
        }
        return result;
      }

      return read();
    }, numPosts)
    return posts
  }
}
