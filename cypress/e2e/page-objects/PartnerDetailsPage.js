import { generatePartner } from '../../support/factories/partner';

class PartnerDetailsPage {
    get partnerDetalsCard() { return cy.get('#partner-details-card'); }
    get actionButton() { return cy.get('#action-button'); }
    get editButton() { return cy.get('#edit-button'); }
    get partnerName() { return cy.get('#partner-name-value'); }
    get contactPerson() { return cy.get('#user-name-value'); }
    get description() { return cy.get('#description-value'); }



    openEditPartnerScreen(){
    this.partnerDetalsCard.should('be.visible');
    this.actionButton.click();
    cy.get(".ant-menu-submenu-popup").should('be.visible');
    this.editButton.click();
    cy.get("div.ant-modal-content").should('be.visible');
    }

    verifyPartnerData(editPartner){
        this.partnerName.should('have.text', editPartner.name);
        this.contactPerson.should('have.text', editPartner.contact);
        this.description.should('have.text', editPartner.description);
    }
}

export default new PartnerDetailsPage();