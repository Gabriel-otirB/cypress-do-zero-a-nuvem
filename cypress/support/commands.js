Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (data = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@test.com',
  text: 'John Doe is the best'
}) => {
  cy.get('.field input[name="firstName"]').type(data.firstName)
  cy.get('.field input[name="lastName"]').type(data.lastName)
  cy.get('.field input[name="email"]').type(data.email)
  cy.get('.field textarea[name="open-text-area"]').type(data.text)
  cy.contains('button', 'Enviar').click()
})