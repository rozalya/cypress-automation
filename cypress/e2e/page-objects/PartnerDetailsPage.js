import { generatePartner } from '../../support/factories/partner';

class PartnerDetailsPage {
    get partnerDetalsCard() { return cy.get('#partner-details-card'); }
    get actionButton() { return cy.get('#action-button'); }
    get editButton() { return cy.get('#edit-button'); }
    get partnerName() { return cy.get('#partner-name-value'); }

    openEditPartnerScreen(){
    this.partnerDetalsCard.should('be.visible');
    this.actionButton.click();
    cy.get(".ant-menu-submenu-popup").should('be.visible');
    this.editButton.click();
    cy.get("div.ant-modal-content").should('be.visible');
    }

    verifyPartnerName(name){
        this.partnerName.should('have.text', name);
    }
}

export default new PartnerDetailsPage();