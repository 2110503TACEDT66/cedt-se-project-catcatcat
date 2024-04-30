describe('Acceptance criteria 1', () => {
  it('correct cost', () => {

    cy.visit('/api/auth/signin')

    cy.get('#input-email-for-credentials-provider').type('PremiumCypress@gmail.com');
    cy.get('#input-password-for-credentials-provider').type('123456');
    cy.get('button[type="submit"]').click();

    cy.visit('/reservation')
    //select coop
    cy.get('#coop').click();
    cy.get('.MuiMenu-list').children().first().click();

    //  select time
    cy.get('tr:contains("Start time")').find('input').type('05/05/2024 01:00 PM');
    // Select End time
    cy.get('tr:contains("End time")').find('input').type('05/05/2024 01:05 PM');

    cy.contains('#Cost', '180 Baht (from 200)')
    .should('be.visible')
  })
});

describe('Acceptance criteria 2', () => {
  it('reserve success', () => {
    cy.visit('http://localhost:3000/')

    cy.visit('/api/auth/signin')

    cy.get('#input-email-for-credentials-provider').type('PremiumCypress@gmail.com');
    cy.get('#input-password-for-credentials-provider').type('123456');
    cy.get('button[type="submit"]').click();

    cy.visit('/reservation')
    //select coop
    cy.get('#coop').click();
    cy.wait(500)
    cy.get('.MuiMenu-list').children().first().click();

    //  select time
    cy.get('tr:contains("Start time")').find('input').type('05/05/2024 01:00 PM');
    // Select End time
    cy.get('tr:contains("End time")').find('input').type('05/05/2024 01:05 PM');
    
    // Click Reserve button
    cy.get('button').contains('Reserve').click();
    //click confirm payment 
    cy.contains('Confirm Payment').click();
    cy.get('select').select('Kbank');
    cy.get("[type='file']").selectFile('cypress/images/us2-3slippremium.jpg', {force: true});
    cy.wait(7000);
    cy.contains('Confirm Payment').click().then(()=> {
      cy.wait(7000);
    })
    cy.visit('http://localhost:3000/myreservation', { failOnStatusCode: false });
    cy.wait(1000);
    cy.contains('Pending Approval');

    // Check if the URL changes to myreservation page
    cy.url().should('include', '/myreservation');
  }); 

  it('admin confirm', () => {
    cy.visit('/api/auth/signout');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    //login admin
    cy.visit('/api/auth/signin')
    cy.wait(1000);
    cy.get('#input-email-for-credentials-provider').type('admin@gmail.com');
    cy.get('#input-password-for-credentials-provider').type('123456');
    cy.get('button[type="submit"]').click();
    
  
    //ไปที่ /myreservation
    cy.visit('http://localhost:3000/myreservation', { failOnStatusCode: false });
    cy.get('button:contains("View")').first().click().then(()=> {
      cy.wait(3000)
    })
    cy.contains('Confirm').click({force: true});
    //delay 
    cy.wait(3000);
    //cy.get('.mt-4 px-4 py-2 bg-green-500 text-white rounded-lg').eq(1).trigger('click');
    cy.get('.space-x-4 > .bg-green-500').click({force: true});
    cy.wait(4000);

    //logout
    cy.visit('/api/auth/signout');
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
  });

  it('status is success', () => {
    //login as user
    cy.visit('/api/auth/signin')

    cy.get('#input-email-for-credentials-provider').type('PremiumCypress@gmail.com');
    cy.get('#input-password-for-credentials-provider').type('123456');
    cy.get('button[type="submit"]').click();
    cy.visit('http://localhost:3000/myreservation', { failOnStatusCode: false });
    cy.contains('Success');
  });
});