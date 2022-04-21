describe('Elements', () => {
    
    beforeEach(() => {
        cy.visit("https://demoqa.com/")

        cy.get('.card-body').contains("Elements").click()

        cy.get('.main-header').should('be.visible')

        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })
    });
    
    it('Text Box', () => {
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-0').click()      

        cy.get('#item-0').click()

        cy.get('#userName').type('testUserName')
        cy.get('#userEmail').type('test@gmail.com')
        cy.get('#currentAddress').type('test current address')
        cy.get('#permanentAddress').type('test permanent address')

        cy.get('#submit').click()

        cy.get('.border').should('be.visible')

    });

    it('Check Box', () => {
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-1').click()

        cy.get('.rct-collapse > .rct-icon').click()
        cy.get('.rct-node-expanded > ol > :nth-child(1) > .rct-text > .rct-collapse > .rct-icon').click()
        cy.get('#tree-node > :nth-child(2) > :nth-child(1) > :nth-child(2) > .rct-node-expanded > ol > :nth-child(1) > .rct-text > label > .rct-checkbox > .rct-icon').click()

        cy.get('.text-success').contains('notes').should('be.visible')
    });

    it('Radio Button', () => {
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-2').click()
        
        cy.get('.custom-control-label').contains('Yes').click()

        cy.get('.text-success').contains('Yes').should('be.visible')
    });

    it('Web Tables', () => {
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-3').click()

        cy.get('#addNewRecordButton').click()

        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('#userEmail').type('johndoe@test.mail')
        cy.get('#age').type('55')
        cy.get('#salary').type('20000')
        cy.get('#department').type('IT')

        cy.get('#submit').click()

        cy.get(':nth-child(4) > .rt-tr > :nth-child(1)').contains('John').should('be.visible')
    });

    it('Web Tables - negative', () => {
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-3').click()

        cy.get('#addNewRecordButton').click()

        cy.get('#lastName').type('Doe')
        cy.get('#userEmail').type('johndoe@test.mail')
        cy.get('#age').type('55')
        cy.get('#salary').type('20000')
        cy.get('#department').type('IT')

        cy.get('#submit').click()
        cy.get('.close').click()

        cy.get(':nth-child(4) > .rt-tr > :nth-child(1)').contains('Doe').should('not.exist')
    });

    it('Buttons', () => {
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-4').click()

        cy.get('#doubleClickBtn').dblclick()
        cy.get('#rightClickBtn').rightclick()
        cy.get('.btn.btn-primary').last().click()

        cy.get('#doubleClickMessage').should('be.visible')
        cy.get('#rightClickMessage').should('be.visible')
        cy.get('#dynamicClickMessage').should('be.visible')
    });

    it('Buttons - negative', () => {
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-4').click()

        cy.get('#doubleClickBtn').rightclick();
        cy.get('#rightClickBtn').dblclick()
        cy.get('.btn.btn-primary').last().rightclick()

        cy.get('#doubleClickMessage').should('not.exist')
        cy.get('#rightClickMessage').should('not.exist')
        cy.get('#dynamicClickMessage').should('not.exist')
    });

    it('Simple link', () => {
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-5').click()

        cy.get('#simpleLink').should($a => {
            expect($a.attr('href'), 'href').to.equal('https://demoqa.com')
            expect($a.attr('target'), 'target').to.equal('_blank')
            $a.attr('target', '_self')
          }).click()
          cy.location('pathname').should('equal', '/')
    });

    it('Dynamic link', () => {
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-5').click()

        cy.get('#dynamicLink').should($a => {
            expect($a.attr('href'), 'href').to.equal('https://demoqa.com')
            expect($a.attr('target'), 'target').to.equal('_blank')
            $a.attr('target', '_self')
          }).click()
          cy.location('pathname').should('equal', '/')
    });

    it('Api Calls', () => {
        cy.get(':nth-child(1) > .element-list > .menu-list > #item-5').click()

        cy.get('#created').click()
        cy.get('#linkResponse').contains('Link has responded with staus 201 and status text Created').should('be.visible')

        cy.get('#no-content').click()
        cy.get('#linkResponse').contains('Link has responded with staus 204 and status text No Content').should('be.visible')

        cy.get('#moved').click()
        cy.get('#linkResponse').contains('Link has responded with staus 301 and status text Moved Permanently').should('be.visible')

        cy.get('#bad-request').click()
        cy.get('#linkResponse').contains('Link has responded with staus 400 and status text Bad Request').should('be.visible')

        cy.get('#unauthorized').click()
        cy.get('#linkResponse').contains('Link has responded with staus 401 and status text Unauthorized').should('be.visible')

        cy.get('#forbidden').click()
        cy.get('#linkResponse').contains('Link has responded with staus 403 and status text Forbidden').should('be.visible')

        cy.get('#invalid-url').click()
        cy.get('#linkResponse').contains('Link has responded with staus 404 and status text Not Found').should('be.visible')
    });    
});