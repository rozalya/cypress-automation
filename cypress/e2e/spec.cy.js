Cypress.on('uncaught:exception', (err) => {
  return false; 
});
import LoginPage from './page-objects/LoginPage';
import LeftNavigation from './page-objects/LeftNavigation.js';
import PartnersPage from './page-objects/PartnersPage.js';

describe(' My First Test', () => {
  it('Visits avtoikonom and checks the title', () => {
    cy.ignoreNoise();
    cy.visit('/login');
    
    cy.url().should('include', 'avtoikonom')
    LoginPage.login('test_qa_ex@example.com', 'test_qa_ex@example.com');
    cy.setLanguageToEnglish();
    LeftNavigation.goToPartners();
    const newPartner = PartnersPage.CreateNewPartner();
    PartnersPage.verifyPartnerExists(newPartner.name);
   })
})