const puppeteer = require("puppeteer");
require("dotenv").config();

let page = null;
let browser = null;

(async () => {
	// Launch a new browser instance
	const browser = await puppeteer.launch({ headless: false });

	// Open a new page and navigate to the LinkedIn login page
	const page = await browser.newPage();
	page.setViewport({
		width: 1280,
		height: 800,
		isMobile: false,
	});
	await page.goto("https://www.linkedin.com/login");

	// Fill in the username and password fields using the environment variables
	await page.type("#username", process.env.USERNAME);
	await page.type("#password", process.env.PASSWORD);

	// Submit the login form
	await page.click('button[type="submit"]');

	// Wait for the page to load after logging in
	await page.waitForNavigation();

	// Navigate to the Jobs page
	await page.goto("https://www.linkedin.com/jobs/");

	// Wait for the page to load after navigating to the Jobs page
	await page.waitForNavigation();

// click on the search bar
	await page.waitFor(2000);
	await page.click('input[class="jobs-search-box__text-input jobs-search-box__keyboard-text-input"]', "Software Engineer", {
		delay: 5,
	});
	await page.click('input[class="jobs-search-box__text-input jobs-search-box__keyboard-text-input"]', "Software Engineer", {
		delay: 5
	});


	// Wait for the page to load after submitting the search query
	await page.waitForNavigation();




	await browser.close();
})();
