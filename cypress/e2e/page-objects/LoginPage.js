
class LoginPage {

    get usernameInput() { return cy.get('#basic input[autocomplete="email"]'); }
    get passwordInput() { return cy.get('#basic input[autocomplete="current-password"]'); }
    get loginButton() { return cy.get('#basic button[type="submit"]'); }


    login(username, password) {
        this.usernameInput.type(username);
        this.passwordInput.type(password);
        this.loginButton.click();
        cy.url().should('include', '/requests');
    }
}

export default new LoginPage(); 