describe('Forms', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080)
    });

    it('Practice Form', () => {
        cy.visit("https://demoqa.com/")

        cy.get('.card-body').contains("Forms").click()

        cy.get('.main-header').should('be.visible')

        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })

        cy.get(':nth-child(2) > .element-list > .menu-list > #item-0').click()

        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('#userEmail').type('johndoe@mail.com')
        cy.get('.custom-control-label').contains('Male').click()
        cy.get('#userNumber').type('0123456789')
        cy.get('.custom-control-label').contains('Sports').click()
        cy.get('#currentAddress').type('ul. Nowa 15, 54-333 Wrocław')

        cy.get('#submit').click()
        cy.get('#closeLargeModal').click()

        
    });

    it('Practice Form - negative', () => {
        cy.visit("https://demoqa.com/")

        cy.get('.card-body').contains("Forms").click()

        cy.get('.main-header').should('be.visible')

        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })

        cy.get(':nth-child(2) > .element-list > .menu-list > #item-0').click()

        cy.get('#lastName').type('Doe')
        cy.get('#userEmail').type('johndoe@mail.com')
        cy.get('.custom-control-label').contains('Male').click()
        cy.get('#userNumber').type('0123456789')
        cy.get('.custom-control-label').contains('Sports').click()
        cy.get('#currentAddress').type('ul. Nowa 15, 54-333 Wrocław')

        cy.get('#submit').click()

        
    });
});