// cypress/e2e/page-objects/LoginPage.js

class LoginPage {
    // Дефиниране на селектори (getters)
    get usernameInput() { return cy.get('#basic input[autocomplete="email"]'); }
    get passwordInput() { return cy.get('#basic input[autocomplete="current-password"]'); }
    get loginButton() { return cy.get('#basic button[type="submit"]'); }

    // Методи за действия
    login(username, password) {
        this.usernameInput.type(username);
        this.passwordInput.type(password);
        this.loginButton.click();
        cy.url().should('include', '/requests');
    }
}

export default new LoginPage(); // Експортираме инстанция на класа