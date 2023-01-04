/// <reference types="Cypress" />
beforeEach(() => {
    cy.visit('./src/index.html');
});

describe('Central de Atendimento ao Cliente TAT', function () {
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Felipe');
        cy.get('#lastName').type('Santos');
        cy.get('#email').type('felipeslopes2010@hotmail.com');
        cy.get('#phone').type('12999999999')
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Felipe');
        cy.get('#lastName').type('Santos');
        cy.get('#email').type('felipeslopes2010.hotmail.com');
        cy.get('#phone').type('12999999999')
        cy.get('#open-text-area').type('Preciso de ajuda!');
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    });

    it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone').type('abcdefghij').should('have.value', '');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Felipe');
        cy.get('#lastName').type('Santos');
        cy.get('#email').type('felipeslopes2010@hotmail.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('Preciso de ajuda!');
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    });

    it('preenche os campos, depois os limpa e tenta enviar com os dados vazios', () => {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Felipe').should('have.value', 'Felipe').clear().should('have.value', '');
        cy.get('#lastName').type('Santos').should('have.value', 'Santos').clear().should('have.value', '');
        cy.get('#email').type('felipeslopes2010@hotmail.com').should('have.value', 'felipeslopes2010@hotmail.com').clear().should('have.value', '');
        cy.get('#phone').type('12999999999').should('have.value', '12999999999').clear().should('have.value', '');
        cy.get('#open-text-area').type(longText, { delay: 0 }).should('have.value', 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste').clear().should('have.value', '');
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit('Felipe', 'Santos', 'felipeslopes2010@hotmail.com', 'Preciso de Ajuda!');

        cy.get('.success').should('be.visible');
    });

    it('envia formulario utilizando contains', () => {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Felipe');
        cy.get('#lastName').type('Santos');
        cy.get('#email').type('felipeslopes2010@hotmail.com');
        cy.get('#phone').type('12999999999')
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.contains('button', 'Enviar').click();

        cy.get('.success').should('be.visible');
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube');
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback');
    });

        it('marca cada tipo de atendimento', () => {
            cy.get('input[type="radio"]')
                .should('have.length', 3)
                .each(function ($radio) {
                    cy.wrap($radio).check();
                    cy.get($radio).should('be.checked');
                });
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .check()
            .first()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked');
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json'); 
            });
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('arquivoSelecionado')
        cy.get('input[type="file"]')
            .selectFile('@arquivoSelecionado')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json');
            });
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank');
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click();
            
        cy.contains('Talking About Testing').should('be.visible');
    });
    
});