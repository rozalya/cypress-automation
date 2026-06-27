Cypress.on('uncaught:exception', (err) => {
  return false; 
});
import LoginPage from './page-objects/LoginPage';
import LeftNavigation from './page-objects/LeftNavigation.js';
import PartnersPage from './page-objects/PartnersPage.js';
import { generatePartner } from '../support/factories/partner';

describe(' My First Test', () => {
  it('create partner', () => {
    cy.visit('/login');   
    cy.url().should('include', 'avtoikonom')
    LoginPage.login('test_qa_ex@example.com', 'test_qa_ex@example.com');
    const newPartner = generatePartner();

    cy.createPartner(newPartner).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('uuid');
  });
  LeftNavigation.goToPartners();
  PartnersPage.verifyPartnerExists(newPartner.name);
   })
})