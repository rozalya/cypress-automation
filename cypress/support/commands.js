// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// 1. Команда за игнориране на "шумни" заявки (централизирано управление)
Cypress.Commands.add('ignoreNoise', () => {
  cy.intercept('POST', 'https://m.stripe.com/**', { statusCode: 200, body: {} }).as('stripe');
  cy.intercept('GET', '**/admin/notification/**', { body: [] }).as('notifications');
});

Cypress.Commands.add('setLanguageToEnglish', () => {
      cy.get('#current-user-email').should('be.visible').click();
       cy.get('#language-option').should('be.visible').click();
       cy.get('#english-language-item').should('be.visible').click();
      cy.get('body').click(0, 0); 
});



