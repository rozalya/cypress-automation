**Cypress E2E Automation Project**
**Overview**

This project is an End-to-End (E2E) automation framework built with **Cypress** for validating a Partner management workflow.
The goal is to demonstrate not only functional test coverage, but also a scalable, maintainable, and production-ready test automation architecture.

**Covered Workflow**

- User login;
- Navigation to Partners section;
- Creating a new Partner;
- Filling required data;
- Saving the Partner;
- Verifying successful creation;
- Updating an existing Partner;
- Validating persisted changes;

**Tech Stack**

- Cypress;
- JavaScript / TypeScript (optional);
- Node.js;
- npm;
  
**Project Structure**

The framework follows the **Page Object Model (POM)** to improve maintainability and separation of concerns.

**Installation**

Clone the repository:
_git clone <repository-url>
cd <project-folder>_

Install dependencies:
_npm install_

**Running the Tests**

Open Cypress UI: _npx cypress open_

Run tests in headless mode: _npx cypress run_

Run a specific test file: _npx cypress run --spec cypress/e2e/partners.cy.js_

**Architecture & Design Decisions**
- **Page Object Model (POM):** Improves reusability and reduces duplication;
- **Custom Cypress Commands:** Common actions (e.g. login) are abstracted for readability;
- **Fixtures for test data:** Static data separated from test logic;
- **Separation of concerns:** Clear structure between tests, pages, and support utilities;
- **Stable selectors approach:** Prefer resilient selectors (e.g. data attributes when available);
- **Execution stability focus:** Assertions placed at key workflow steps to ensure deterministic results;

**Improvements / Future Extensions**

- Increase coverage for create/update flows with full dropdown validation;
- Add deeper address form validation for edge cases and constraints;
- Expand telephone field testing across multiple countries and formats;
- Improve Partner list coverage:
   - Search functionality validation;
   - Filter behavior;
   - UI visibility and state assertions;
   - Data consistency validation using cy.intercept();
 - Add multi-language testing to ensure stability beyond English across core workflows;

**Assumptions**

- The test user has full permissions to create and update Partners;
- The environment is stable and does not require external mocking;
- Created entities are immediately available after submission;
- No explicit teardown/cleanup mechanism is required;

**Future Improvements (Technical Enhancements)**
- API-based test setup and teardown (faster + more stable tests);
- Network control using cy.intercept() for deterministic testing;
- Reporting integration (Allure / Mochawesome);
- Parallel execution in CI pipelines;
- Cross-browser execution (Chrome, Firefox, Edge);
- Retry strategy for flaky environments;
- Visual regression testing layer;
