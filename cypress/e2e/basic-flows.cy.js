describe('Factors', () => {
  afterEach(() => {
    cy.mocksRestoreRouteVariants()
  })

  it('should contain investment as default', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Investment 2%')
  })

  it('should add new factors', () => {
    cy.mocksUseRouteVariant('get-tool-calls:addFactors')
    cy.visit('http://localhost:3000/')
    cy.get('textarea').type('Ich verdiene 2000 Euro monatlich')
    cy.contains('Vorstellung hinzufügen').click()
    cy.contains('mein mock einkommen')
    cy.contains('mein mock auskommen')
    cy.contains('mein mock jahresverbrauch')
    cy.contains('mein mock jahreseinkommen')
    cy.get('[data-chart-result="428498"]')
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

  it('should be able to change the start volume with AI', () => {
    cy.mocksUseRouteVariant('get-tool-calls:changeStartVolume')
    cy.visit('http://localhost:3000/')
    cy.get('textarea').type('Ich habe derzeit 10000 Euro')
    cy.contains('Vorstellung hinzufügen').click()
    cy.get('[data-chart-result="19999"]')
  })

  //TODO: Add income changes as well

  it('should change the outcome with AI', () => {
    cy.visit('http://localhost:3000/')
    cy.get('textarea').type('Anything')
    cy.contains('Vorstellung hinzufügen').click()
    cy.contains('7777 / Monat').should('not.exist')
    cy.mocksUseRouteVariant('get-tool-calls:changeOutcome')
    cy.get('textarea').type('Mein Auskommen beträgt doch nur 7777 Euro')
    cy.contains('Vorstellung hinzufügen').click()
    cy.contains('7777 / Monat')
  })
})
