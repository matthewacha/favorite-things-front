// https://docs.cypress.io/api/introduction/api.html

describe('Tests login page', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('div', 'Login to follow your favorite things');
  });

  it('logs in user', () => {
    cy.visit('/');
    cy.get('input#login-input') // 2.
      .type('Irene');
    cy.get('form#form-name').submit();
    // cy.stub({},'post').returns({})
    // cy.get('button').click()
  });
});
