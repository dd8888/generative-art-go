/************* Set Up *************/

// Require Puppeteer
const puppeteer = require("puppeteer");
const argv = require("minimist")(process.argv.slice(2));
const fs = require("fs");

// Defaults to Galaxy s9 user agent
const USER_AGENT = argv.agent
  ? argv.agent
  : "Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36";
const INSTAGRAM_LOGIN_URL = "https://instagram.com/accounts/login";
const INSTAGRAM_URL = "https://instagram.com";

/************* Main Program *************/

// Make sure we have the required arguments

const imageUrl = "./images/preimage.svg.jpeg";
// Make sure the image exists and is a jpeg/jpg
if (
  !(
    imageUrl.toLowerCase().endsWith("jpg") ||
    imageUrl.toLowerCase().endsWith("jpeg")
  )
) {
  console.log("Instagram only accepts jpeg/jpg images.");
  fail();
}

// Make sure the image exists on the user's computer
if (!fs.existsSync(imageUrl)) {
  console.log("The image you specified does not exist.");
  fail();
}

// We are good to go
run();

/************* Functions *************/

/**
 * Run the program.
 */

async function run() {
  console.debug("launching puppeteer");

  // Configure puppeteer options
  let options = {
    defaultViewport: {
      width: 320,
      height: 570,
    },
  };
  if (argv.executablePath) {
    options.executablePath = argv.executablePath;
  }

  // Get the browser
  let browser = await puppeteer.launch(options);

  // Get the page
  let page = await browser.newPage();

  // Instagram only allows posting on their mobile site, so we have to pretend to be on mobile
  page.setUserAgent(USER_AGENT);

  console.debug("visiting the instagram login page");

  // Go to instagram.com
  await page.goto(INSTAGRAM_LOGIN_URL);

  console.debug("waiting for the username input");

  // Wait for the username input
  await page.waitForSelector("input[name='username']");
  await page.waitFor(250);

  console.debug("typing in the username and password");

  // Get the inputs on the page
  let usernameInput = await page.$("input[name='username']");
  let passwordInput = await page.$("input[name='password']");

  // Type the username in the username input
  await usernameInput.click();
  await page.keyboard.type(process.env.INSTA_ACCOUNT);

  // Type the password in the password input
  await passwordInput.click();
  await page.keyboard.type(process.env.INSTA_PASSWORD);

  console.debug("clicking log in");

  // Click the login button
  let button = await page.$x("//div[contains(text(),'Log In')]//..");
  await button[0].click();

  // Make sure we are signed in
  await page.waitForNavigation();

  console.debug("going to instagram home");

  // They may try to show us something but just go straight to instagram.com
  await page.goto(INSTAGRAM_URL);

  console.debug("waiting for the file inputs");

  // Wait until everything is loaded
  await page.waitForSelector("input[type='file']");

  // Set the value for the correct file input (last on the page is new post)
  let fileInputs = await page.$$('input[type="file"]');
  let input = fileInputs[fileInputs.length - 1];

  console.debug("clicking new post");

  // Upload the file
  // Note: Instagram seems to have a check in place to make sure you've viewed the file upload dialog,
  // so we have to open it here.
  await page.evaluate(function () {
    document.querySelector("[aria-label='New Post']").parentElement.click();
  });
  //await page.click("[aria-label='New Post']");
  await page.waitFor(250);

  console.debug("uploading the image");

  await input.uploadFile(imageUrl);
  await page.waitFor(250);

  console.debug("waiting for next");

  // Wait for the next button
  await page.waitForXPath("//button[contains(text(),'Next')]");

  console.debug("clicking next");

  // Get the next button
  let next = await page.$x("//button[contains(text(),'Next')]");
  await next[0].click();

  console.debug("adding the caption");

  // Wait for the caption option
  await page.waitForSelector("textarea[aria-label='Write a caption…']");

  // Click the caption option
  await page.click("textarea[aria-label='Write a caption…']");
  const fetch = require("node-fetch");

  const request = async () => {
    const response = await fetch("https://type.fit/api/quotes");
    const json = await response.json();
    const random = Math.floor(Math.random() * json.length);
    await page.keyboard.type(json[random].text + " " + json[random].author);
  };

  request();

  // Type

  console.debug("waiting for share");

  // Get the share button and click it
  await page.waitForXPath("//button[contains(text(),'Share')]");
  let share = await page.$x("//button[contains(text(),'Share')]");

  console.debug("clicking share");

  await share[0].click();

  console.debug("finishing up");

  // Wait for a little while before finishing
  await page.waitFor(5000);

  // Close
  await browser.close();

  console.log("the post was made successfully");
}

/**
 * Print the correct usage of this program.
 */
function usage() {
  console.log(
    "Usage: node index.js --username <username> --password <password> --image <image_path (jpeg/jpg only)> [-caption <caption>] [-executablePath <chrome_path>] [-agent <user_agent>]"
  );
}

/**
 * Exit the program with an error
 */
function fail() {
  usage();
  process.exit(1);
}
