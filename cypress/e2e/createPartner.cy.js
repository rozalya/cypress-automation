Cypress.on('uncaught:exception', (err) => {
  return false; 
});
import LoginPage from './page-objects/LoginPage.js';
import LeftNavigation from './page-objects/LeftNavigation.js';
import PartnersPage from './page-objects/PartnersPage.js';
import PartnerDataModal from './page-objects/PartnerDataModal.js';
import { generatePartner } from '../support/factories/partner';

describe(' My First Test', () => {
  it('Visits avtoikonom and checks the title', () => {
    cy.ignoreNoise();
    cy.visit('/login');
    
    cy.url().should('include', 'avtoikonom')
    LoginPage.login('test_qa_ex@example.com', 'test_qa_ex@example.com');
    cy.setLanguageToEnglish();
    LeftNavigation.goToPartners();
    PartnersPage.openNewPartnerCreateScreen();
    const newPartner = generatePartner();
    PartnerDataModal.fillPartnerForm(newPartner);
    PartnerDataModal.saveData();
    PartnersPage.verifyPartnerExists(newPartner.name);
   })
})