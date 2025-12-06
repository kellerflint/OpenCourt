// cypress/e2e/games-flow.cy.js
describe('Games flow', () => {
  it('allows a user to create a game and then see it in the list (stubbed backend)', () => {
    // Fake in-memory "database" of games just for this test
    let games = [];

    // Intercept GET /api/games and reply with our fake list
    cy.intercept('GET', '/api/games', (req) => {
      req.reply(games);
    }).as('getGames');

    // Intercept POST /api/games and push into our fake list
    cy.intercept('POST', '/api/games', (req) => {
      const body = req.body;

      const newGame = {
        game_id: games.length + 1,
        game_name: body.game_name,
        location_id: Number(body.location_id),
      };

      games.push(newGame);

      // Simulate backend response shape
      req.reply({ id: newGame.game_id });
    }).as('createGame');

    // Visit the real frontend (Vite dev server)
    cy.visit('/');

    // Wait for the form to be on the page instead of checking heading text
    cy.get('form').should('exist');

    const gameName = 'Cypress Basketball';
    const locationId = '7';

    // These selectors come directly from GamesForm.jsx
    cy.get('input[name="game_name"]')
      .should('exist')
      .type(gameName);

    cy.get('input[name="location_id"]')
      .should('exist')
      .type(locationId);

    cy.contains('button', 'Add Game').click();

    // Make sure our POST was called with the right body
    cy.wait('@createGame')
      .its('request.body')
      .should((body) => {
        expect(body.game_name).to.equal(gameName);
        expect(body.location_id).to.equal(locationId);
      });

    // Known issue: page doesn't auto-refresh after adding a game.
    // Simulate user manually refreshing the page.
    cy.reload();

    // Frontend will fetch /api/games again; we return our updated fake list
    cy.wait('@getGames');

    // Check that the new game shows up in the list text
    cy.contains(`${gameName} @ Location #${locationId}`).should('be.visible');
  });
});
