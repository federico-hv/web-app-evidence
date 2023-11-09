import '../../styles.css'
import { mount } from "cypress/react18";
import { EditorProps } from "../../../a/types";
import Editor from "../../../a";

const EDITOR_DELAY = 50;

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountEditor(editorProps?: EditorProps): Chainable<JQuery<Element>>;
      getEditor(): Chainable<JQuery<Element>>;
      editorContains(text: string, not?: string): Chainable<JQuery<Element>>;
      editorType(
        text: string,
        options?: Partial<Cypress.TypeOptions>
      ): Chainable<void>;
      getSelectedOption(): Chainable<JQuery<Element>>;
    }
  }
}

Cypress.Keyboard.defaults({
  keystrokeDelay: EDITOR_DELAY,
});

Cypress.Commands.add("mount", (component, options) => {
  return mount(component, options);
});

Cypress.Commands.add("mountEditor", (editorProps?: EditorProps) => {
  mount(<Editor {...editorProps} />);
  return cy.getEditor();
});

Cypress.Commands.add("getEditor", () => {
  return cy.get("[data-cy='editor']");
});

Cypress.Commands.add("editorContains", (text: string, not = "") => {
  return cy.getEditor().should(not + "have.text", text);
});

Cypress.Commands.add("editorType", (text: string, options?) => {
  cy.getEditor().type(text, options);
});

Cypress.Commands.add("getSelectedOption", () => {
  return cy.getEditor().get("#selected-option");
});
