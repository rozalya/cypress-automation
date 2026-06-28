Cypress.on('uncaught:exception', (err) => {
  return false; 
});
import LeftNavigation from './page-objects/LeftNavigation.js';
import PartnersPage from './page-objects/PartnersPage.js';
import PartnerDetailsPage from './page-objects/PartnerDetailsPage.js';
import PartnerDataModal from './page-objects/PartnerDataModal.js';
import { generatePartner } from '../support/factories/partner';

describe(' My First Test', () => {
    beforeEach(() => {
  cy.loginViaUI(); 
});
  it('create partner', () => {
    cy.visit('/requests');   
    cy.setLanguageToEnglish();
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
    PartnerDataModal.fillPartnerForm(editPartner);
    PartnerDataModal.saveData();
    PartnerDetailsPage.verifyPartnerName(newPartner.name);
   })
})