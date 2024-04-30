declare namespace Cypress {
  interface Chainable {
    makeReservation(coopId: string, startTime: string, endTime: string): void;
  }
}

Cypress.Commands.add('makeReservation', (coopId, startTime, endTime) => {
  cy.visit('/reservation')
  cy.get('#coop').parent().click().get(`ul>li[data-value="${coopId}"]`).click()
  cy.get('th[id="startTime"]').click().type(startTime)
  cy.get('th[id="endTime"]').click().type(endTime)
  cy.wait(500)
  cy.get('button:contains("Reserve")').click()
})

beforeEach('login as a premium and make 3 reservations', () => {
  cy.visit('/api/auth/signin')
  cy.get('input[name=email]').type('premium@gmail.com')
  cy.get('input[name=password]').type('123456')
  cy.get('button').click()
})

describe('Acceptance criteria 1', () => {
  it('premium user should be able to make more than 3 reservations', () => {
    const reservations = [
      { coopId:'65ff29c83f7aed7f4618707b'},
      { coopId:'65ff29ec3f7aed7f4618707e'},
      { coopId:'65ff2a053f7aed7f46187081'}
    ]
    reservations.forEach(reservation => {
      cy.makeReservation(reservation.coopId, '050420241200PM', '050420240200PM')
      cy.wait(1000)
    })
    
    cy.makeReservation('65ff2b793f7aed7f4618708a', '050620240100PM', '050620240300PM')
    cy.get('div[id="reserveStatus"]').should('contain.text', 'Reserving...')
    cy.wait(500)
    cy.get('div[id="reserveStatus"]').should('contain.text', 'Waiting for payment')

    cy.makeReservation('65ff2b793f7aed7f4618708a', '050620240100PM', '050620240300PM')
    cy.get('div[id="reserveStatus"]').should('contain.text', 'Reserving...')
    cy.wait(500)
    cy.get('div[id="reserveStatus"]').should('contain.text', 'Waiting for payment')
  })
})

describe('Acceptance criteria 2', () => {
  it('premium user should not be able to make more than 5 reservations', () => {
    cy.makeReservation('65ff2b793f7aed7f4618708a', '050620240100PM', '050620240300PM')
    cy.get('div[id="reserveStatus"]').should('contain.text', 'Reserving...')
    cy.wait(500)
    cy.get('div[id="reserveStatus"]').should('contain.text', 'The user has already made 5 reservations')
    cy.get('div[id="reserveStatus"]').should('not.contain.text', 'Waiting for payment')
  })
})

after('delete all reservations', () => {
  cy.visit('/myreservation', {failOnStatusCode: false}).then(() => { cy.wait(500) })
  for (let i = 0; i < 5; i++) {    
    cy.get('img[id="deleteIcon"]').first().click()
    cy.get('button:contains("Remove")').click().then(() => { cy.wait(4000) })
  }
})
