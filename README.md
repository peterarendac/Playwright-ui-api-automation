# Playwright UI & API Automation Testing

Automation testing project created using Playwright and TypeScript.

## Technologies Used

* Playwright
* TypeScript
* Page Object Model (POM)
* Fixtures
* API Testing
* GitHub Actions
* JSON Test Data

## Task 1 – UI Automation

UI tests were implemented for the Swag Labs demo application.

### Implemented Test Scenarios

* User login
* Home page verification
* Add product to cart
* Remove product from cart
* Checkout process
* Checkout totals validation

### Design Principles

* Page Object Model
* Reusable fixtures
* Playwright assertions
* Test data separation

## Task 2 – API Automation

API tests were implemented using Playwright APIRequestContext.

### Implemented Test Scenarios

* GET requests
* POST requests
* Status code validation
* Response body validation
* Response time validation

### Test Data

Test data is stored separately in JSON files and reused across API test scenarios.

### Test Data

For security reasons, the actual key is not included in the repository and should be provided through a local `.env` file or GitHub Secrets.

## Important Note

API response time validation was implemented according to the assignment requirements.

The tested public API does not consistently respond within the required 100 ms threshold. Because of this, response time assertions may fail even though the API request itself is successful and all other validations pass.

Soft assertions were used so that response time failures do not stop the execution of the remaining tests.

## Installation

Install project dependencies:

```bash
npm install
```

## Run UI Tests

```bash
npm run test:ui
```

## Run API Tests

```bash
npm run test:api
```

## Run All Tests

```bash
npm run test:all
```

## Continuous Integration

GitHub Actions pipeline automatically executes automated tests after code changes are pushed to the repository.

## Performed activites:

* UI test automation
* API test automation
* Page Object Model
* Playwright fixtures
* Test data management
* CI/CD integration using GitHub Actions
* TypeScript-based automation framework development
