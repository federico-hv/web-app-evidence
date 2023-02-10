describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('contains default "Marketplace" Homepage', () => {
    cy.contains('Marketplace Homepage');
  });
});

export {};
