describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    // const longText = Cypress._.repeat('testetestetesteteste', 10) // gera um texto longo

    cy.get('.field input[name="firstName"]').as('firstName').should('be.visible').type('Gabriel')
    cy.get('@firstName').should('have.value', 'Gabriel')

    cy.get('.field input[name="lastName"]').as('lastName').should('be.visible').type('Cláudio da Silva Brito')
    cy.get('@lastName').should('have.value', 'Cláudio da Silva Brito')

    cy.get('.field input[name="email"]').as('email').should('be.visible').type('gabriel@email.com')
    cy.get('@email').should('have.value', 'gabriel@email.com')

    cy.get('.field input[name="phone"]').as('phone').should('be.visible').type('19986116158')
    cy.get('@phone').should('have.value', '19986116158')

    cy.get('.field textarea[name="open-text-area"]').as('textArea').should('be.visible').type('Tudo perfeito!', { delay: 0 })
    cy.get('@textArea').should('have.value', 'Tudo perfeito!')

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
  })

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    const longText = Cypress._.repeat('testetestetesteteste', 10) // gera um texto longo
    cy.get('.field input[name="firstName"]').as('firstName').should('be.visible').type('Gabriel')
    cy.get('.field input[name="lastName"]').as('lastName').should('be.visible').type('Cláudio da Silva Brito')
    cy.get('.field input[name="email"]').as('email').should('be.visible').type('email-teste.com')
    cy.get('.field input[name="phone"]').as('phone').should('be.visible').type('19986116158')
    cy.get('.field textarea[name="open-text-area"]').as('textArea').should('be.visible').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it("campo telefone continua vazio quando preenchido com um valor não numérico", () => {
    cy.get('.field input[name="phone"]').as('phone').should('be.visible').type('abc123')

    cy.get('@phone').should('have.value', '123')
  })

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    const longText = Cypress._.repeat('testetestetesteteste', 10) // gera um texto longo
    cy.get('.field input[name="firstName"]').as('firstName').should('be.visible').type('Gabriel')
    cy.get('.field input[name="lastName"]').as('lastName').should('be.visible').type('Cláudio da Silva Brito')
    cy.get('.field input[name="email"]').as('email').should('be.visible').type('email-teste.com')
    cy.get('.field textarea[name="open-text-area"]').as('textArea').should('be.visible').type(longText, { delay: 0 })
    cy.get('#check input[type="checkbox"][name="phone"]').should('be.visible').check()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get('.field input[name="firstName"]').as('firstName').should('be.visible').type('Gabriel')
    cy.get('.field input[name="lastName"]').as('lastName').should('be.visible').type('Cláudio da Silva Brito')
    cy.get('.field input[name="email"]').as('email').should('be.visible').type('gabriel@email.com')
    cy.get('.field input[name="phone"]').as('phone').should('be.visible').type('19986116158')

    cy.get('@firstName').should('have.value', 'Gabriel')
    cy.get('@lastName').should('have.value', 'Cláudio da Silva Brito')
    cy.get('@email').should('have.value', 'gabriel@email.com')
    cy.get('@phone').should('have.value', '19986116158')

    cy.get('@firstName').clear()
    cy.get('@lastName').clear()
    cy.get('@email').clear()
    cy.get('@phone').clear()

    cy.get('@firstName').should('have.value', '')
    cy.get('@lastName').should('have.value', '')
    cy.get('@email').should('have.value', '')
    cy.get('@phone').should('have.value', '')
  })

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it("envia o formuário com sucesso usando um comando customizado", () => {
    // const data = {
    //   firstName: 'Gabriel',
    //   lastName: 'Cláudio da Silva Brito',
    //   email: 'gabriel@email.com',
    //   phone: '19986116158',
    //   text: 'Tudo perfeito!'
    // }
    // Aceita um objeto com os dados do formulário, se não for passado, usa um objeto da função com dados padrão

    cy.fillMandatoryFieldsAndSubmit(/*data*/)

    cy.get('.success').should('be.visible')
  })

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get('select#product').select('YouTube').should('have.value', 'youtube')
  })

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get('select#product').select('mentoria').should('have.value', 'mentoria')
  })

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get('select#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').as('feedback').check()
    cy.get('@feedback').should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(($radio) => {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check().should('be.checked')
      .last().uncheck().should('not.be.checked')
  })

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  

})
