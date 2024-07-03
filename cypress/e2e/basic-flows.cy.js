describe('Factors', () => {
  it('should contain investment as default', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Investment 2%')
  })

  it('should add new factors', () => {
    cy.visit('http://localhost:3000/')
    cy.get('textarea').type('Ich verdiene 2000 Euro monatlich')
    cy.contains('Vorstellung hinzufügen').click()
    cy.contains('mein mock einkommen')
    cy.contains('mein mock auskommen')
    cy.contains('mein mock jahresverbrauch')
    cy.contains('mein mock jahreseinkommen')
    cy.get('[data-chart-result="428497.88119870017"]')
  })

  it('should remove factors', () => {
    cy.visit('http://localhost:3000/')
    cy.removeFactor('Investment 2%')
    cy.get('[data-chart-result="50000"]')
  })

  it('should show reductions', () => {
    cy.visit('http://localhost:3000/')
    cy.get('textarea').type('Ich verdiene 2000 Euro monatlich')
    cy.contains('Vorstellung hinzufügen').click()
    cy.contains('mein mock einkommen')
      .parents()
      .find('[data-testid="show-reductions"]')
      .click()
    cy.contains('2033 - 2037: 50%')
  })
})
