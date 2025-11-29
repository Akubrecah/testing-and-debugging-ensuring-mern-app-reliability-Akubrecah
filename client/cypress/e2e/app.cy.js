describe('MERN App E2E', () => {
  it('should load the home page', () => {
    cy.visit('/');
    cy.contains('Users');
  });

  it('should display users from API', () => {
    // Mock API response
    cy.intercept('GET', '/api/users', [
      { _id: '1', name: 'E2E User 1', email: 'e2e1@example.com' },
      { _id: '2', name: 'E2E User 2', email: 'e2e2@example.com' }
    ]).as('getUsers');

    cy.visit('/');
    cy.wait('@getUsers');
    
    cy.contains('E2E User 1');
    cy.contains('E2E User 2');
  });
});
