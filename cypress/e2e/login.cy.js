describe('Login', () =>{

    const email = `teste${Date.now()}@gmail.com`;
    const senha = '@Teste123456';

    it('Realizar cadastro com sucesso', () =>{
            
        //Arrang
            cy.visit('https://agendamento.quarkclinic.com.br/index/363622206');
        //Act
            cy.get('[data-cy="btn-cadastro"]').click();
            cy.get('[data-cy="campo-nome-input"]').type('Teste');
            cy.get('[data-cy="campo-telefone-input"]').type('(44) 4444-4444');
            cy.get('[data-cy="campo-sexo-select"]').select('MASCULINO');
            cy.get('[data-cy="campo-data-nascimento-input"]').type('10/10/2010');
            cy.get('input[placeholder="Email"]').type(email);
            cy.get('[data-cy="campo-tipo-documento-select"]').select('CPF');
            cy.get('[data-cy="campo-numero-documento-input"]').type('111.444.777-35');
            cy.get('#senha').type(senha);
            cy.get('[data-cy="campo-confirmar-senha-input"]').type(senha);
            cy.get('[data-cy="checkbox-aceita-politicas-cadastro"] ').click();
            cy.get('[data-cy="btn-criar-conta"]').click();
        //Assert
            
            cy.contains('button', 'Bem-vindo(a), Teste').should('be.visible');
    })

    it('Realizar Login com Sucesso', () =>{
        cy.intercept('POST', '**/login').as('LoginRequest');
        //Arrang
            cy.visit('https://agendamento.quarkclinic.com.br/index/363622206');
        //Act
            cy.get('[data-cy="btn-login"]').click();
            cy.get('[data-cy="campo-usuario-input"]').type(email);
            cy.get('[name="password"]').type(senha);
            cy.get('[data-cy="checkbox-aceita-politicas"]').click();
            cy.get('[data-cy="btn-submit-login"]').click();  
        //Assert
            cy.wait('@LoginRequest')
            .its('response.statusCode')
            .should('eq', 200);
            cy.contains('button', 'Bem-vindo(a), Teste').should('be.visible');
    })

    it('Agenda', () => {


        //Arrang
            cy.visit('https://agendamento.quarkclinic.com.br/index/363622206');
            cy.get('[data-cy="btn-login"]').click();
            cy.get('[data-cy="campo-usuario-input"]').type(email);
            cy.get('[name="password"]').type(senha);
            cy.get('[data-cy="checkbox-aceita-politicas"]').click();
            cy.get('[data-cy="btn-submit-login"]').click(); 
            cy.contains('button', 'Bem-vindo(a), Teste').should('be.visible');
        //Act
            cy.get('[data-cy="btn-consulta-presencial"]').click();
            cy.get('[data-cy="convenio-label-148"]').click();
            cy.get('[data-cy="convenio-radio-148"]').check();
            cy.get('[data-cy^="agenda-item-horario-texto"]').first().click();
            cy.get('[data-cy="paciente-card-radio-label"]').click();
            cy.get('[data-cy="confirmacao-paciente"]').should('contain','Teste');
            cy.get('[data-cy="confirmacao-especialidade"]').should('contain','CARDIOLOGIA');
            cy.get('[data-cy="confirmacao-profissional"]').should('contain','Dr. Profissional de Saude Cypress');
            cy.get('[data-cy="confirmacao-btn-confirmar"]').click();
        //Assert
            
            cy.get('[data-cy="finalizacao-msg-sucesso"]').should('be.visible');
    })
});
