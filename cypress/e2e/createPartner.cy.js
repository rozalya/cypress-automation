Cypress.on('uncaught:exception', (err) => {
  return false; 
});
import LoginPage from './page-objects/LoginPage.js';
import LeftNavigation from './page-objects/LeftNavigation.js';
import PartnersPage from './page-objects/PartnersPage.js';
import PartnerDataModal from './page-objects/PartnerDataModal.js';
import { generatePartner } from '../support/factories/partner';

describe('Create new partner', () => {
  it('Visits avtoikonom and checks the title', () => {
    cy.ignoreNoise();
    cy.visit('/login');
    
    // Arrange
    cy.url().should('include', 'avtoikonom')
    LoginPage.login('test_qa_ex@example.com', 'test_qa_ex@example.com');
    cy.setLanguageToEnglish();
    LeftNavigation.goToPartners();
    PartnersPage.openNewPartnerCreateScreen();
    const newPartner = generatePartner();
    cy.intercept('POST', '/admin/partner').as('createPartner')

    // Act
    PartnerDataModal.fillPartnerForm(newPartner);
    PartnerDataModal.saveData();

    // Assert
    cy.wait('@createPartner').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
      expect(interception.request.body).to.exist
      expect(interception.request.body.name).to.eq(newPartner.name)
      expect(interception.request.body.contactPerson).to.eq(newPartner.contact)
      expect(interception.request.body.description).to.eq(newPartner.description)
    });
    PartnersPage.verifyPartnerExists(newPartner.name);
  })
})