const defaultApiUrl = Cypress.env("apiUrl") || "http://localhost:3001";
Cypress.env("apiUrl", defaultApiUrl);
