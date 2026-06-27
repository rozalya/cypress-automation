import { generatePartner } from '../../support/factories/partner';

class PartnersPage {
    // Дефиниране на селектори (getters)
    get newPartnerButton() { return cy.get('[id^="new-"]'); }
    get partnerName() { return cy.get('#name-field'); }
    get partnerTypeField() { return cy.get('#partner-type-field'); }
    get partnerTypeOptions() { return cy.get('.ant-select-item-option'); }
    get serviceTypeField() { return cy.get('#service-types-field'); }
    get serviceTypeOptions() { return cy.get('.ant-select-item-option-content'); }
    get subscriptionTypeField() { return cy.get('#subscription-tier-field'); }
    //get ssubscriptionTypeOptions() { return cy.get('.ant-select-item-option'); }
    get addressField() { return cy.get('#address-field'); }
    get phoneField() { return cy.get('#phone-field'); }
    get contactPersonField() { return cy.get('#contact-person-field'); }
    get descriptionField() { return cy.get('#description-field'); }
    get attachFileField() { return cy.get('input[type="file"]'); }
    get saveButton() { return cy.get('#save-button'); }

    // Методи за действия
    CreateNewPartner() {
        const partner = generatePartner();
        
        this.newPartnerButton.click();
        cy.get("div.ant-modal-content").should('be.visible');
        this.partnerName.type(partner.name);
        this.partnerTypeField.click();
        this.partnerTypeOptions.eq(0).click();
        this.serviceTypeField.click();
        this.serviceTypeOptions.eq(3).click();
        cy.get('body').type('{esc}');
        this.subscriptionTypeField.click();
        this.selectSubscritpionOption();
        this.typeAddress();
        this.phoneField.type(partner.phone);
        this.contactPersonField.type(partner.contact);
        this.descriptionField.type(partner.description);
        this.attachFile();
        this.saveButton.click();

        return partner;
    }

    selectSubscritpionOption(){
         cy.get('body').find('.ant-select-dropdown').not('.ant-select-dropdown-hidden')
        .find('.ant-select-item-option')
        .contains('Automation Subscription')
        .click();
    }
     typeAddress(){
         this.addressField.should('be.visible')
         .type('Manastirski Livadi, blvd. "Bulgaria" 69, 1404 Sofia, Bulgaria');
          cy.get('.pac-container').should('be.visible').find('.pac-item').first().click();
    }
    attachFile(){
        this.attachFileField.selectFile('cypress/fixtures/bird.jpg', { force: true });
        cy.contains('.ant-modal', 'Edit photo').should('be.visible')
        .within(() => {
        cy.contains('button', 'Save')
        .scrollIntoView()
        .click({ force: true })
        });
    }
    verifyPartnerExists(partnerName){
    cy.get('#search-partners').type(partnerName);
    cy.get('tbody tr').should('have.length.greaterThan', 0)
    cy.get('tr[data-row-key]').first().find('td.testid-requestNumberColumn').should('contain.text', partnerName);
    }
}

export default new PartnersPage(); // Експортираме инстанция на класа