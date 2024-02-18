/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, account-info-guard) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, account-info-guard: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(dataTestId: string): Chainable<JQuery<HTMLElement>>;
      getByRole(role: string): Chainable<JQuery<HTMLElement>>;

      checkByTestIdHasText(dataTestId: string, textId: string): void;

      checkTestIdNotExist(dataTestId: string): void;
      checkTestIdsNotExist(dataTestIds: string[]): void;
      checkTestIdExistsAndVisible(dataTestId: string): void;
      checkTestIdsExistAndVisible(dataTestIds: string[]): void;
    }
  }
}

export const sample = {};

// Gets elements whose data-testid is equal to dataTestId
Cypress.Commands.add('getByTestId', (dataTestId: string) => {
  return cy.get(`[data-testid="${dataTestId}"]`);
});

// Gets elements whose role is equal to given role
Cypress.Commands.add('getByRole', (role: string) => {
  return cy.get(`[role="${role}"]`);
});

// Checks if an element with given dataTestId has the given text
Cypress.Commands.add(
  'checkByTestIdHasText',
  (dataTestId: string, text: string) => {
    cy.get(`[data-testid="${dataTestId}"]`).should('have.text', text);
  },
);

// Checks if an element with given dataTestId exists and is visible
Cypress.Commands.add(
  'checkTestIdExistsAndVisible',
  (dataTestId: string) => {
    cy.get(`[data-testid="${dataTestId}"]`)
      .should('exist')
      .and('be.visible');
  },
);

// Checks if elements with given dataTestIds exist and is visible
Cypress.Commands.add(
  'checkTestIdsExistAndVisible',
  (dataTestIds: string[]) => {
    dataTestIds.map((dataTestId) => {
      cy.get(`[data-testid="${dataTestId}"]`)
        .should('exist')
        .and('be.visible');
    });
  },
);

// Checks if an element with given dataTestId does not exist
Cypress.Commands.add('checkTestIdNotExist', (dataTestId: string) => {
  cy.get(`[data-testid="${dataTestId}"]`).should('not.exist');
});

// Checks if elements with given dataTestIds does not exist
Cypress.Commands.add('checkTestIdsNotExist', (dataTestIds: string[]) => {
  dataTestIds.map((dataTestId) => {
    cy.get(`[data-testid="${dataTestId}"]`).should('not.exist');
  });
});
