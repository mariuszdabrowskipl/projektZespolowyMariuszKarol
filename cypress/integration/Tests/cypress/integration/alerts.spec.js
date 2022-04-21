describe('Alerts', () => {
    beforeEach(() => {
        cy.visit("https://demoqa.com/")

        cy.get('.card-body').contains("Alerts, Frame & Windows").click()

        cy.get('.main-header').should('be.visible')

        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
    });

    it('Simple Alert', () => {
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-1').click()

        cy.get('#alertButton').click()
        cy.on('window:alert', (str) => {
          expect(str).to.equal('You clicked a button')
        })
        cy.on('window:confirm', () => true)
    });

    it('Confirm Alert', () => {
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-1').click()

        cy.get('#confirmButton').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(`Do you confirm action?`)
          })
        cy.on('window:confirm', () => true)
        cy.get('#confirmResult').should('have.text', 'You selected Ok')

    });

    it('Prompt Alert', () => {
        cy.get(':nth-child(3) > .element-list > .menu-list > #item-1').click()

        cy.window().then(($win) => {
            cy.stub($win, 'prompt').returns('Test text')
            cy.get('#promtButton').click()
          })
          cy.get('#promptResult').should('have.text', 'You entered Test text')
        });
});