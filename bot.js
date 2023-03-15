const puppeteer = require("puppeteer");
require("dotenv").config();


(async () => {
	// Launch a new browser instance
	const browser = await puppeteer.launch();

	// Open a new page and navigate to the LinkedIn login page
	const page = await browser.newPage();
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

    await page.waitForTimeout(5000);
	

	// Take a screenshot of the logged-in homepage
	await page.screenshot({ path: "linkedin_homepage.png" });

	// Close the browser instance
	await browser.close();
})();
