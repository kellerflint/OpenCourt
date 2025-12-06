describe('Users flow', () => {
  it('allows a user to create a new user and see them in the list', () => {
    // Visit the users page. Adjust the path if your route is different.
    cy.visit('/users');

    // Check that the form header is visible
    cy.contains('Add a User').should('be.visible');

    const userName = 'Bahram E2E';

    // Fill in the user name
    cy.get('input[name="user_name"]').type(userName);

    // Submit the form
    cy.contains('button', 'Add User').click();

    // After submit, the list should include the new user
    cy.contains('Created Users').should('be.visible');
    cy.contains(userName).should('exist');
  });
});
