
class LeftNavigation {
    get leftNavigationMenu() { return cy.get('#leftNavigation'); }
    get partners() { return cy.get('#partners-menu-item'); }

    goToPartners() {
        this.leftNavigationMenu.trigger('mouseover');
        this.partners.should('be.visible').click();
        cy.get('body').click(100, 100); 
        cy.get('[id^="new-"]').should('be.visible');
    }
}

export default new LeftNavigation();