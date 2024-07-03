Cypress.Commands.add('removeFactor', (name: string) => {
  cy.contains(name)
    .parent()
    .within(() => {
      cy.get('a[data-testid=delete-factor]').click()
    })
})

declare global {
  namespace Cypress {
    interface Chainable {
      removeFactor(name: string): Chainable<void>
    }
  }
}
