/************* Set Up *************/

// Require Puppeteer
const puppeteer = require("puppeteer");
const argv = require("minimist")(process.argv.slice(2));
const fs = require("fs");

// Defaults to Galaxy s9 user agent
const USER_AGENT = argv.agent
  ? argv.agent
  : "Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36";
const REQUIRED_ARGS = ["username", "password"];
const INSTAGRAM_LOGIN_URL = "https://instagram.com/accounts/login";
const INSTAGRAM_URL = "https://instagram.com";

/************* Main Program *************/

// Make sure we have the required arguments
for (let arg of REQUIRED_ARGS) {
  if (!(arg in argv)) {
    console.log("Please specify a " + arg);
    fail();
  }
}
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
let json = [
  {
    text:
      "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
  },
  {
    text: "You can observe a lot just by watching.",
    author: "Yogi Berra",
  },
  {
    text: "A house divided against itself cannot stand.",
    author: "Abraham Lincoln",
  },
  {
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Johann Wolfgang von Goethe",
  },
  {
    text: "Fate is in your hands and no one elses",
    author: "Byron Pulsifer",
  },
  {
    text: "Be the chief but never the lord.",
    author: "Lao Tzu",
  },
  {
    text: "Nothing happens unless first we dream.",
    author: "Carl Sandburg",
  },
  {
    text: "Well begun is half done.",
    author: "Aristotle",
  },
  {
    text: "Life is a learning experience, only if you learn.",
    author: "Yogi Berra",
  },
  {
    text: "Self-complacency is fatal to progress.",
    author: "Margaret Sangster",
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
  {
    text: "What you give is what you get.",
    author: "Byron Pulsifer",
  },
  {
    text: "We can only learn to love by loving.",
    author: "Iris Murdoch",
  },
  {
    text: "Life is change. Growth is optional. Choose wisely.",
    author: "Karen Clark",
  },
  {
    text: "You'll see it when you believe it.",
    author: "Wayne Dyer",
  },
  {
    text: "Today is the tomorrow we worried about yesterday.",
    author: null,
  },
  {
    text: "It's easier to see the mistakes on someone else's paper.",
    author: null,
  },
  {
    text: "Every man dies. Not every man really lives.",
    author: null,
  },
  {
    text: "To lead people walk behind them.",
    author: "Lao Tzu",
  },
  {
    text: "Having nothing, nothing can he lose.",
    author: "William Shakespeare",
  },
  {
    text: "Trouble is only opportunity in work clothes.",
    author: "Henry J. Kaiser",
  },
  {
    text: "A rolling stone gathers no moss.",
    author: "Publilius Syrus",
  },
  {
    text: "Ideas are the beginning points of all fortunes.",
    author: "Napoleon Hill",
  },
  {
    text: "Everything in life is luck.",
    author: "Donald Trump",
  },
  {
    text: "Doing nothing is better than being busy doing nothing.",
    author: "Lao Tzu",
  },
  {
    text: "Trust yourself. You know more than you think you do.",
    author: "Benjamin Spock",
  },
  {
    text: "Study the past, if you would divine the future.",
    author: "Confucius",
  },
  {
    text: "The day is already blessed, find peace within it.",
    author: null,
  },
  {
    text: "From error to error one discovers the entire truth.",
    author: "Sigmund Freud",
  },
  {
    text: "Well done is better than well said.",
    author: "Benjamin Franklin",
  },
  {
    text: "Bite off more than you can chew, then chew it.",
    author: "Ella Williams",
  },
  {
    text: "Work out your own salvation. Do not depend on others.",
    author: "Buddha",
  },
  {
    text: "One today is worth two tomorrows.",
    author: "Benjamin Franklin",
  },
  {
    text: "Once you choose hope, anythings possible.",
    author: "Christopher Reeve",
  },
  {
    text: "God always takes the simplest way.",
    author: "Albert Einstein",
  },
  {
    text: "One fails forward toward success.",
    author: "Charles Kettering",
  },
  {
    text: "From small beginnings come great things.",
    author: null,
  },
  {
    text: "Learning is a treasure that will follow its owner everywhere",
    author: "Chinese proverb",
  },
  {
    text: "Be as you wish to seem.",
    author: "Socrates",
  },
  {
    text: "The world is always in movement.",
    author: "V. Naipaul",
  },
  {
    text: "Never mistake activity for achievement.",
    author: "John Wooden",
  },
  {
    text: "What worries you masters you.",
    author: "Haddon Robinson",
  },
  {
    text: "One faces the future with ones past.",
    author: "Pearl Buck",
  },
  {
    text: "Goals are the fuel in the furnace of achievement.",
    author: "Brian Tracy",
  },
  {
    text: "Who sows virtue reaps honour.",
    author: "Leonardo da Vinci",
  },
  {
    text: "Be kind whenever possible. It is always possible.",
    author: "Dalai Lama",
  },
  {
    text: "Talk doesn't cook rice.",
    author: "Chinese proverb",
  },
  {
    text: "He is able who thinks he is able.",
    author: "Buddha",
  },
  {
    text: "A goal without a plan is just a wish.",
    author: "Larry Elder",
  },
  {
    text: "To succeed, we must first believe that we can.",
    author: "Michael Korda",
  },
  {
    text: "Learn from yesterday, live for today, hope for tomorrow.",
    author: "Albert Einstein",
  },
  {
    text: "A weed is no more than a flower in disguise.",
    author: "James Lowell",
  },
  {
    text: "Do, or do not. There is no try.",
    author: "Yoda",
  },
  {
    text: "All serious daring starts from within.",
    author: "Harriet Beecher Stowe",
  },
  {
    text: "The best teacher is experience learned from failures.",
    author: "Byron Pulsifer",
  },
  {
    text: "Think how hard physics would be if particles could think.",
    author: "Murray Gell-Mann",
  },
  {
    text: "Love is the flower you've got to let grow.",
    author: "John Lennon",
  },
  {
    text: "Don't wait. The time will never be just right.",
    author: "Napoleon Hill",
  },
  {
    text: "Time is the wisest counsellor of all.",
    author: "Pericles",
  },
  {
    text: "You give before you get.",
    author: "Napoleon Hill",
  },
  {
    text: "Wisdom begins in wonder.",
    author: "Socrates",
  },
];
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
  await page.keyboard.type(argv.username);

  // Type the password in the password input
  await passwordInput.click();
  await page.keyboard.type(argv.password);

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

  // Type
  const random = Math.floor(Math.random() * json.length);
  await page.keyboard.type(
    json[random].text +
      " " +
      json[random].author +
      "#codeart #sketch #artista #artoninstagram #artstagram #artistofinstagram #painting #arts #arte #instaart #artist #dailyart"
  );

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
