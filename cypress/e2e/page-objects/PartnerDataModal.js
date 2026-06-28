import { generatePartner } from '../../support/factories/partner';

class PartnerDataModal {
    get partnerName() { return cy.get('#name-field'); }
    get partnerTypeField() { return cy.get('#partner-type-field').closest('.ant-select'); }
    get partnerTypeOptions() { return cy.get('.ant-select-item-option'); }
    get serviceTypeField() { return cy.get('#service-types-field'); }
    get serviceTypeOptions() { return cy.get('.ant-select-item-option-content'); }
    get subscriptionTypeField() { return cy.get('#subscription-tier-field').closest('.ant-select'); }
    get addressField() { return cy.get('#address-field'); }
    get phoneField() { return cy.get('#phone-field'); }
    get contactPersonField() { return cy.get('#contact-person-field'); }
    get descriptionField() { return cy.get('#description-field'); }
    get attachFileField() { return cy.get('input[type="file"]'); }
    get saveButton() { return cy.get('.ant-btn-primary #save-button'); }


  createNewPartner() {
    const partner = generatePartner();

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

  fillPartnerForm(partner, { clear = true } = {}) {

    const setValue = (field, value) => {
      clear ? field.clear().type(value) : field.type(value);
    };

    setValue(this.partnerName, partner.name);
    this.partnerTypeField.click();
    cy.contains('.ant-select-item-option', 'Service').click();
    this.serviceTypeField.click();
    this.serviceTypeOptions.eq(3).click();
    this.closeDropdown();
    this.subscriptionTypeField.click();
    this.selectSubscriptionOption();
    this.typeAddress();
    setValue(this.phoneField, partner.phone);
    setValue(this.contactPersonField, partner.contact);
    setValue(this.descriptionField, partner.description);
    this.attachFile();
  }

  selectSubscriptionOption(value = 'Automation Subscription') {
    cy.get('.ant-select-dropdown')
      .not('.ant-select-dropdown-hidden')
      .contains('.ant-select-item-option', value)
      .click();
  }
  typeAddress() {
    this.addressField.should('be.visible')
      .type('ж.к. Стрелбище, blvd. "Bulgaria" 69, 1408 Sofia, Bulgaria');
    cy.get('.ant-modal-body', { timeout: 10000 }).should('be.visible')
      .then(($body) => {
        const text = $body.text();

        if (text.includes('New partner')) {
          cy.get('.pac-container', { timeout: 10000 })
            .should('be.visible')
            .find('.pac-item',)
            .first()
            .should('be.visible')
            .click();
        } else {
          cy.get('.ant-modal-body').click(0, 0);
        }
      });
        
    }


  attachFile() {

    cy.get('body').then(($body) => {


      if ($body.find('.ant-modal-body img[alt="edit-icon"]').length > 0) {
        return;
      }


      this.attachFileField.selectFile(
        'cypress/fixtures/bird.jpg',
        { force: true }
      );

      cy.contains('.ant-modal', 'Edit photo')
        .should('be.visible')
        .within(() => {
          cy.contains('button', 'Save')
            .click({ force: true });
        });

    });
  }

  saveData() {
    this.saveButton.click();
  }

  closeDropdown() {
    cy.focused().type('{esc}', { force: true });

  }


}

export default new PartnerDataModal(); 