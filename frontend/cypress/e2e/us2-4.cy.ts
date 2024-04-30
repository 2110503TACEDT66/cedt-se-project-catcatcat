describe('Acceptance criteria 1', () => {
    it('show this user roles user', () => {
        cy.visit('/api/auth/signin')
        cy.get('#input-email-for-credentials-provider').type('testcypress@gmail.com');
        cy.get('#input-password-for-credentials-provider').type('12345678');
        cy.get('button[type="submit"]').click();
    
        cy.visit('/reservation')
        cy.get('#role').should('have.value', 'user');

        cy.visit('/premium/payment/individual-month')
        cy.contains('Confirm Payment').click();
        cy.get('select').select('Kbank');
        cy.get("[type='file']").selectFile('cypress/images/us2-3slippremium.jpg', {force: true});
        cy.wait(7000);
        cy.contains('Confirm Payment').click().then(()=> {
            cy.wait(7000);
        })

        cy.visit('/api/auth/signout');
        cy.get('button[type="submit"]').click();
        
    })

    it('admin approve premium', () => {
        cy.visit('/api/auth/signin')
        cy.get('#input-email-for-credentials-provider').type('admin@gmail.com');
        cy.get('#input-password-for-credentials-provider').type('123456');
        cy.get('button[type="submit"]').click();

        cy.visit('/mypremium', { failOnStatusCode: false });
        cy.get('button:contains("View")').first().click().then(()=> {
            cy.wait(5000)
        })
        cy.contains('Confirm').click({force: true});
        cy.get('.space-x-4 > .bg-green-500').click({force: true});
        cy.wait(4000);

        cy.visit('/api/auth/signout');
        cy.get('button[type="submit"]').click();
    })

    it('user become premuim', () => {
        cy.visit('/api/auth/signin')
        cy.get('#input-email-for-credentials-provider').type('testcypress@gmail.com');
        cy.get('#input-password-for-credentials-provider').type('12345678');
        cy.get('button[type="submit"]').click();
    
        cy.visit('/reservation')
        cy.get('#role').should('have.value', 'premium');
    })
});

describe('Acceptance criteria 2', () => {
    it('show this premium user expire date', () => {
        cy.visit('/api/auth/signin')
        cy.get('#input-email-for-credentials-provider').type('testcypress@gmail.com');
        cy.get('#input-password-for-credentials-provider').type('12345678');
        cy.get('button[type="submit"]').click();
    
        cy.visit('/reservation')
        cy.get('#expire').should('have.value', '31/05/2024');

        cy.visit('/premium/payment/individual-month')
        cy.contains('Confirm Payment').click();
        cy.get('select').select('Kbank');
        cy.get("[type='file']").selectFile('cypress/images/us2-3slippremium.jpg', {force: true});
        cy.wait(7000);
        cy.contains('Confirm Payment').click().then(()=> {
            cy.wait(7000);
        })

        cy.visit('/api/auth/signout');
        cy.get('button[type="submit"]').click();
        
    })

    it('admin approve premium', () => {
        cy.visit('/api/auth/signin')
        cy.get('#input-email-for-credentials-provider').type('admin@gmail.com');
        cy.get('#input-password-for-credentials-provider').type('123456');
        cy.get('button[type="submit"]').click();

        cy.visit('/mypremium', { failOnStatusCode: false });
        cy.get('button:contains("View")').first().click().then(()=> {
            cy.wait(5000)
        })
        cy.contains('Confirm').click({force: true});
        cy.get('.space-x-4 > .bg-green-500').click({force: true});
        cy.wait(4000);

        cy.visit('/api/auth/signout');
        cy.get('button[type="submit"]').click();
    })

    it('user become premuim', () => {
        cy.visit('/api/auth/signin')
        cy.get('#input-email-for-credentials-provider').type('testcypress@gmail.com');
        cy.get('#input-password-for-credentials-provider').type('12345678');
        cy.get('button[type="submit"]').click();
    
        cy.visit('/reservation')
        cy.get('#expire').should('have.value', '30/06/2024');
    })
});