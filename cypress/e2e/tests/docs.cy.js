describe('Docs page', () => {
    beforeEach(() => {
        // Väntar på att seed-routen i backend köras klart först innan sidan laddas.
        // Seed används för att knapparna för 'Update' och 'Delete' visas inte om databasen är tom.
        cy.request('POST', 'http://localhost:3000/test/seed').then(() => {
            // Full baseUrl finns i cypress.config.js
            cy.visit('/')
        })
    })

    it('shows page title', () => {
        cy.get('h1').should('contain', 'Documents')
    })

    it('shows a button with text', () => {
        cy.get('#add-btn').should('have.text', 'Add new')
    })

    it('leads to add form', () => {
        cy.get('#add-btn').click()
        cy.url().should('include', '/add')
    })
})

describe('navigation test', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('navigates through header links', () => {
        // Kontrollerar att nav-fälten finns och leder till rätt sida
        // 'Search' kontrolleras inne i 'Search by ID' kontrollen.
        cy.get('header nav').contains('Documents').click()
        cy.url().should('include', '/')

        cy.get('header nav').contains('Add Document').click()
        cy.url().should('include', '/add')
    })
})

describe('Show docs', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('shows table headers', () => {
        cy.get('table').should('contain.text', 'ID')
        cy.get('table').should('contain.text', 'Title')
        cy.get('table').should('contain.text', 'Content')
    })
})

describe('Search by ID', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('fetches first document ID and searches for it', () => {
            cy.get('header nav').contains('Search').click()
            cy.url().should('include', '/search')
            cy.get('h1').should('have.text', 'Search for a document')
            cy.get('.search-container').should('exist')

            // Kontrollerar att knappen finns.
            cy.get('button').should('have.text', 'Search').click()
        })
    })

describe('Update button', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('shows update button and navigates to update form', () => {
        // Hämtar första raden och texten från första cellen (id).
        // Använder .then() för att spara id och använda det i testet.
        cy.get('table tbody tr').first().find('td').first().invoke('text').then($id => {
            cy.get('table tbody tr').first().find('.update-btn').click()

            // Bör leda till rätt sida med rätt url
            cy.url().should('include', `/update/${$id}`)

            // Verifierar att formuläret och fält finns
            cy.get('.update-container').should('exist')
            cy.get('h2').should('have.text', `Update document ${$id}`)
            cy.get('input').should('exist')
            cy.get('textarea').should('exist')
            cy.get('button').should('exist')

            // Testar att rensa text och fylla i ny text
            cy.get('input').clear().type('Updated title')
            cy.get('textarea').clear().type('Updated content')
            cy.get('button').should('have.text', 'Save').click()
            cy.url().should('include', '/')
        })
    })
})

describe('Delete button', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('shows delete button and deletes first row', () => {
        cy.get('table tbody tr').first().find('.delete-btn')
            .should('have.text', 'Delete')
            .click()
    })
})

describe('Add doc page', () => {
    beforeEach(() => {
        cy.visit('/add')
    })

    it('shows page title', () => {
        cy.get('h1').should('contain', 'Add New Document')
    })

    it('has input and textarea', () => {
        // Verifierar att formuläret och fält finns
        cy.get('.add-container').should('exist')
        cy.get('input[type="text"]').should('exist')
        cy.get('textarea').should('exist')
        cy.get('#submit').should('exist').and('have.text', 'Add')
    })

    it('adds a new document and navigates to main page', () => {
        cy.get('input[type="text"]').type('Test title')
        cy.get('textarea').type('Test content')
        cy.get('#submit').click()
        cy.url().should('include', '/')
    })
})
