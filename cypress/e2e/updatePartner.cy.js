Cypress.on('uncaught:exception', (err) => {
  return false;
});
import LeftNavigation from './page-objects/LeftNavigation.js';
import PartnersPage from './page-objects/PartnersPage.js';
import PartnerDetailsPage from './page-objects/PartnerDetailsPage.js';
import PartnerDataModal from './page-objects/PartnerDataModal.js';
import { generatePartner } from '../support/factories/partner';

describe('Upade existing parter', () => {
  beforeEach(() => {
    cy.loginViaUI();
  });
  it('create partner', () => {
    cy.visit('/requests');
    cy.setLanguageToEnglish();

    // Arrange
    const newPartner = generatePartner();

    cy.createPartner(newPartner).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('uuid');
    });
    LeftNavigation.goToPartners();
    PartnersPage.verifyPartnerExists(newPartner.name);
    PartnersPage.openPartnerDetails();
    PartnerDetailsPage.openEditPartnerScreen();
    const editPartner = generatePartner();
    cy.intercept('PUT', '/admin/partner/**').as('updatePartner')

    // Act
    PartnerDataModal.fillPartnerForm(editPartner);
    PartnerDataModal.saveData();

    // Assert
    cy.wait('@updatePartner').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]);
      expect(interception.request.body).to.exist
      expect(interception.request.body.name).to.eq(editPartner.name)
      expect(interception.request.body.contactPerson).to.eq(editPartner.contact)
      expect(interception.request.body.description).to.eq(editPartner.description)

    });
    PartnerDetailsPage.verifyPartnerData(editPartner);
  })
})