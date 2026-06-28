import { generatePartner } from '../../support/factories/partner';

class PartnersPage {

    get newPartnerButton() { return cy.get('[id^="new-"]'); }
    openNewPartnerCreateScreen(){
         this.newPartnerButton.click();
         cy.get("div.ant-modal-content").should('be.visible');
    }
    verifyPartnerExists(partnerName){
    cy.get('#search-partners').type(partnerName);
    cy.get('tbody tr').should('have.length.greaterThan', 0)
    cy.get('tr[data-row-key]').first().find('td.testid-requestNumberColumn').should('contain.text', partnerName).as('partner');
}
    openPartnerDetails(){
       cy.get('@partner').click({ force: true });
    }
}

export default new PartnersPage(); 