describe('Premium page test', () => {
  beforeEach(() => {
    cy.visit('/api/auth/signin')
    cy.get('#input-email-for-credentials-provider').type("user@gmail.com")
    cy.get('#input-password-for-credentials-provider').type("123456")
    cy.get('button').click()
  })

  it('Mypremium button should navigate to premium page', () => {
    cy.contains('More Description').click()
    cy.contains("CATCATCAT Premium").should('exist')
  })

  it('Premium page should show premium cost, premium special privileges, and link navigates to premium registration page', () => {
    cy.visit('/premium')
    cy.contains('● Premium User can reserve 5 reservation● Discount 10% on every reservevation● Borrow Label Printer● Complimentary snacks, tea, coffee, and water are provided for premium users').should('exist')
    cy.contains('฿129/month').should('exist')
    cy.contains('฿199/month').should('exist')
    cy.contains('฿1990/year').should('exist')
    cy.contains('Register').first().click()
    cy.contains('Premium Payment Detail').should('exist')
  })

})


describe('Popup test', () => {
  beforeEach(() => {
    cy.visit('/api/auth/signin')
    cy.get('#input-email-for-credentials-provider').type("popUpTest@gmail.com")
    cy.get('#input-password-for-credentials-provider').type("123456")
    cy.get('button').click()
  })

  it('popup should be visible when premium is about to expire', () => {
    cy.get('#popup').as("popup")
    cy.get('@popup').should('exist')
  })

  it('renew button should take you to the premium page', () => {
    cy.contains('Renew').click()
    cy.contains("CATCATCAT Premium").should('exist')
  })

  it('nevermid button should close the popup', () => {
    cy.get('#popup').as("popup")
    cy.get('@popup').should('exist')
    cy.contains('Nevermind').click()
    cy.get('@popup').should('not.exist')
  })
  
})