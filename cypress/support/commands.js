
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (nome, sobrenome, email, texto) => {
    cy.get('#firstName').type(nome);
    cy.get('#lastName').type(sobrenome);
    cy.get('#email').type(email);
    cy.get('#open-text-area').type(texto);

    cy.get('button[type="submit"]').click();
});
