import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { EditorProps } from "../../../a/types";
import { DummyData, GenericState, HashtagState, MessageState } from "./types";
import { HashtagNode } from "@lexical/hashtag";
import MentionsPlugin from "../../../a/plugins/mentions/mentions-plugin";
import { MentionNode } from "../../../a/nodes/mention/mention-node";
import Editor from "../../../a";

import {
  createMentionsPlugin,
  dummyKeyExtractor,
  dummyRenderer,
  dummyService,
  setConfig,
  setData,
  setPlugins,
} from "./mentions-util";

describe("Editor", () => {
  it("should mount correctly", () => {
    cy.mountEditor();
  });

  describe("Editor Functionality", () => {
    beforeEach(() => {
      cy.mountEditor();
    });
    it("should allow for text to be entered", () => {
      cy.editorType("test");
      cy.editorContains("test");
    });

    it("should have allow for text to be deleted using backspace", () => {
      cy.editorType("{backspace}");
    });

    it("should allow for users to undo typing", () => {
      cy.editorType("a").should("contain.text", "a");

      // double check if meta works on all platforms
      cy.editorType("{meta+z}");
      cy.editorContains("Write...");
    });

    it("should allow for users to redo typing", () => {
      cy.editorType("ab").should("contain.text", "a");

      // meta again
      cy.editorType("{meta+z}");
      cy.editorType("{meta+shift+z}");
      cy.editorContains("ab");
    });
  });

  describe("Default Value", () => {
    it("should have correct empty default value", () => {
      cy.mountEditor({ Placeholder: null });
      cy.editorContains("");
    });

    it("should allow for custom default messages", () => {
      cy.mountEditor({ Placeholder: <div>test placeholder</div> }).should(
        "have.text",
        "test placeholder"
      );
    });

    it("should display Write... when not provided a default message", () => {
      cy.mountEditor().should("have.text", "Write...");
    });
  });

  describe("onChange Functionality", () => {
    it("should call onChange when a user types", () => {
      const text = "testing spy";
      const onChangeSpy = cy.spy((state: any) =>
        expect(text).to.contain(state.message)
      );

      cy.mountEditor({ onChange: onChangeSpy })
        .type(text)
        .then(() => {
          expect(onChangeSpy).to.be.called;
        });
    });

    it("should result in onChange updating a state when a user types", () => {
      const setState = (current: GenericState) => (state = current);
      const text = "testing state";
      let state: GenericState = { message: "" };

      cy.mountEditor({ onChange: setState })
        .editorType(text)
        .then(() => {
          expect(state.message).to.equal(text);
        });
    });
  });

  describe("Plugins and Nodes Functionality", () => {
    let basicProps: EditorProps;

    beforeEach(() => {
      basicProps = {
        config: {
          namespace: "editor",
          onError: (e: Error) => console.error(e),
        },
      };
    });

    describe("Hashtag", () => {
      beforeEach(() => {
        basicProps.plugins = [<HashtagPlugin />];
        basicProps.config = {
          ...basicProps.config,
          theme: {
            hashtag: "hashtag",
          },
          nodes: [HashtagNode],
        };
      });

      it("should mount correctly", () => {
        cy.mountEditor(basicProps);
        cy.getEditor().should("exist");
      });

      it("should allow a user to type a hashtag", () => {
        cy.mountEditor(basicProps);
        cy.editorType("#test");
        cy.editorContains("#test");
      });

      it("should allow a user to type multiple hashtags", () => {
        cy.mountEditor(basicProps);
        cy.editorType("#test #second");
        cy.editorContains("#test #second");
      });

      it("should update state correctly with a single hashtag", () => {
        let state: HashtagState = { message: "", hashtags: [] };
        basicProps.onChange = (current: HashtagState) => (state = current);
        const hashtag = "#test";

        cy.mountEditor(basicProps)
          .editorType(hashtag)
          .then(() => {
            expect(state.message).to.equal(hashtag);
            expect(state.hashtags).to.deep.equal([hashtag]);
          });
      });

      it("should update state correctly with multiple hashtags entered", () => {
        let state: HashtagState = { message: "", hashtags: [] };
        basicProps.onChange = (current: HashtagState) => (state = current);
        const hashtags = ["#test", "#secondtag", "#thirdtag"];

        cy.mountEditor(basicProps)
          .editorType(hashtags.join(" "))
          .then(() => {
            expect(state.message).to.equal(hashtags.join(" "));
            expect(state.hashtags).to.deep.equal(hashtags);
          });
      });

      it("should not create a hashtag if it is preceded directly by text", () => {
        let state: HashtagState = { message: "", hashtags: [] };
        basicProps.onChange = (current: HashtagState) => (state = current);
        const hashtag = "#test";

        cy.mountEditor(basicProps)
          .editorType("A" + hashtag)
          .then(() => {
            expect(state.message).to.equal("A" + hashtag);
            expect(state.hashtags).not.exist;
          });
      });

      it("should allow a user to type both hashtags and text", () => {
        let state: HashtagState = { message: "", hashtags: [] };
        basicProps.onChange = (current: HashtagState) => (state = current);
        const hashtags = ["#test", "#secondtag", "#thirdtag"];
        const message =
          "this is a " +
          hashtags[0] +
          " of hashtags " +
          hashtags[1] +
          " " +
          hashtags[2];

        cy.mountEditor(basicProps)
          .editorType(message)
          .then(() => {
            expect(state.message).to.equal(message);
            expect(state.hashtags).to.deep.equal(hashtags);
          });
      });
    });

    describe("Mentions", () => {
      before(() => {
        cy.fixture("dummydata").then((data) => {
          setData(data.data);
        });
      });

      beforeEach(() => {
        basicProps.plugins = [
          <MentionsPlugin<DummyData>
            dataFetcher={dummyService}
            renderItem={dummyRenderer}
            keyExtractor={dummyKeyExtractor}
          />,
        ];
        basicProps.config = {
          ...basicProps.config,
          theme: {
            mention: "mention",
          },
          nodes: [MentionNode],
        };
      });

      it("should mount correctly", () => {
        cy.mountEditor(basicProps);
      });

      it("should allow a user to type a mention", () => {
        cy.mountEditor(basicProps);
        cy.editorType("@Bob");
        cy.editorContains("@Bob");
      });

      it("should not create a user if directly preceded by text", () => {
        cy.mountEditor(basicProps)
          .editorType("P@Bo")
          .editorContains("@Bob", "not.")
          .getSelectedOption()
          .should("not.exist");
      });
      it("should default to selecting the first mentions option", () => {
        cy.mountEditor(basicProps)
          .editorType("@S")
          .getSelectedOption()
          .should("have.text", "Steve");
      });

      it("should allow a user to type a mention and select it by clicking", () => {
        cy.mountEditor(basicProps)
          .editorType("@Bo")
          .getSelectedOption()
          .click()
          .editorContains("@Bob");
      });

      it("should allow a user to type a mention and select it by pressing enter", () => {
        cy.mountEditor(basicProps);
        cy.editorType("@S{enter}");
        cy.editorContains("@Steve");
      });

      it("should allow a user to delete a mention by pressing backspace once", () => {
        cy.mountEditor(basicProps)
          .editorType("@S{enter}")
          .editorContains("@Steve")
          .editorType("{backspace}")
          .editorContains("Write...");
      });

      it("should hide options menu when escape is pressed", () => {
        cy.mountEditor(basicProps)
          .type("@S{esc}")
          .getSelectedOption()
          .should("not.exist")
          .editorContains("@S");
      });

      it("should show options when editor is clicked again", () => {
        cy.mountEditor(basicProps)
          .type("@S{esc}")
          .getEditor()
          .click()
          .getSelectedOption()
          .should("have.text", "Steve")
          .editorContains("@S");
      });

      it("should hide options menu when editor is clicked off", () => {
        cy.mount(
          <div>
            <Editor {...basicProps} />
            <h1> Very Large Heading</h1>
          </div>
        )
          .getEditor()
          .type("@S")
          .get("h1")
          .click()
          .getSelectedOption()
          .should("not.exist")
          .editorContains("@S");
      });

      it("should allow for a user to select a different mention using down arrow key", () => {
        cy.mountEditor(basicProps)
          .editorType("@S")
          .getSelectedOption()
          .should("have.text", "Steve")
          .editorType("{downArrow}")
          .getSelectedOption()
          .should("have.text", "Samuel")
          .editorType("{downArrow}")
          .getSelectedOption()
          .should("have.text", "Sophia")
          .editorType("{downArrow}")
          .getSelectedOption()
          .should("have.text", "Steve");
      });

      it("should allow for a user to select a different option using up arrow key", () => {
        cy.mountEditor(basicProps)
          .editorType("@S")
          .getSelectedOption()
          .should("have.text", "Steve")
          .editorType("{upArrow}")
          .getSelectedOption()
          .should("have.text", "Sophia")
          .editorType("{upArrow}")
          .getSelectedOption()
          .should("have.text", "Samuel")
          .editorType("{upArrow}")
          .getSelectedOption()
          .should("have.text", "Steve");
      });

      it("should allow for user to use both arrow keys", () => {
        cy.mountEditor(basicProps)
          .editorType("@S")
          .getSelectedOption()
          .should("have.text", "Steve")
          .editorType("{upArrow}")
          .getSelectedOption()
          .should("have.text", "Sophia")
          .editorType("{upArrow}")
          .getSelectedOption()
          .should("have.text", "Samuel")
          .editorType("{downArrow}")
          .getSelectedOption()
          .should("have.text", "Sophia");
      });

      it("should select correct option when using arrow keys", () => {
        cy.mountEditor(basicProps)
          .editorType("@S")
          .getSelectedOption()
          .should("have.text", "Steve")
          .editorType("{upArrow}")
          .getSelectedOption()
          .should("have.text", "Sophia")
          .editorType("{upArrow}")
          .editorType("{enter}")
          .editorContains("@Samuel");
      });

      it("should not display options menu when cursor is not over @", () => {
        cy.mountEditor(basicProps);
        cy.editorType("@S{leftarrow}");
        cy.getSelectedOption().should("not.exist");
      });

      it("should not select an option when user inputs a space", () => {
        cy.mountEditor(basicProps)
          .editorType("@Samue ")
          .getSelectedOption()
          .should("not.exist")
          .editorContains("@Samuel", "not.");
      });

      it("should display options menu when leaving and returning to the not completed mention", () => {
        cy.mountEditor(basicProps)
          .editorType("@Samue {leftArrow}")
          .getSelectedOption()
          .should("have.text", "Samuel");
      });

      it("should properly select option when leaving and returning to not completed mention", () => {
        cy.mountEditor(basicProps)
          .editorType("@Samue {leftArrow}")
          .editorType("{enter}{rightArrow}{backspace}")
          .getSelectedOption()
          .should("not.exist")
          .editorContains("@Samuel");
      });

      it("should properly add user to mentions list", () => {
        let state: MessageState = { message: "", mentions: [] };
        basicProps.onChange = (current: MessageState) => (state = current);

        cy.mountEditor(basicProps)
          .editorType("@Sam{enter}")
          .then(() => {
            expect(state.message).to.equal("$0");
            expect(state.mentions).to.deep.equal(["Samuel"]);
          })
          .editorContains("@Samuel");
      });

      it("should properly add multiple users to mentions list", () => {
        let state: MessageState = { message: "", mentions: [] };
        basicProps.onChange = (current: MessageState) => (state = current);

        cy.mountEditor(basicProps)
          .editorType("@Sam{enter} @Bo{enter}")
          .then(() => {
            expect(state.message).to.equal("$0 $1");
            expect(state.mentions).to.deep.equal(["Samuel", "Bob"]);
          })
          .editorContains("@Samuel @Bob");
      });

      it("should properly update state with multiple users and text", () => {
        let state: MessageState = { message: "", mentions: [] };
        basicProps.onChange = (current: MessageState) => (state = current);

        cy.mountEditor(basicProps)
          .editorType("@Sam{enter} and @Sop{enter} are good friends.")
          .then(() => {
            expect(state.message).to.equal("$0 and $1 are good friends.");
            expect(state.mentions).to.deep.equal(["Samuel", "Sophia"]);
          })
          .editorContains("@Samuel and @Sophia are good friends.");
      });
    });

    describe("Mentions and Hashtags", () => {
      it("should work correctly with a single Hashtag and Mention", () => {
        // read dummydata
        cy.fixture("dummydata").then((data) => {
          setData(data.data);
        });

        // setup props
        setPlugins(basicProps, [<HashtagPlugin />, createMentionsPlugin()]);
        setConfig(basicProps, [MentionNode, HashtagNode], {
          mention: "mention",
          hashtag: "hashtag",
        });

        // setup empty state
        let state: MessageState & HashtagState = {
          message: "",
          mentions: [],
          hashtags: [],
        };

        basicProps.onChange = (current: MessageState & HashtagState) =>
          (state = current);

        cy.mountEditor(basicProps)
          .editorType("#test @Bo{enter}")
          .then(() => {
            expect(state.hashtags).to.deep.equal(["#test"]);
            expect(state.mentions).to.deep.equal(["Bob"]);
          });
      });

      it("should work correctly with multiple Hashtags and Mentions", () => {
        // read dummydata
        cy.fixture("dummydata").then((data) => {
          setData(data.data);
        });

        // setup props
        setPlugins(basicProps, [<HashtagPlugin />, createMentionsPlugin()]);
        setConfig(basicProps, [MentionNode, HashtagNode], {
          mention: "mention",
          hashtag: "hashtag",
        });

        // setup empty state
        let state: MessageState & HashtagState = {
          message: "",
          mentions: [],
          hashtags: [],
        };

        basicProps.onChange = (current: MessageState & HashtagState) =>
          (state = current);

        cy.mountEditor(basicProps)
          .editorType("#test")
          .then(() => {
            expect(state.hashtags).to.deep.equal(["#test"]);
            expect(state.message).to.equal("#test");
          })
          .type(" test message, hello @Bo{enter} and @Sa{enter}")
          .then(() => {
            expect(state.hashtags).to.deep.equal(["#test"]);
            expect(state.mentions).to.deep.equal(["Bob", "Samuel"]);
            expect(state.message).to.equal(
              "#test test message, hello $0 and $1"
            );
          })
          .editorType(" #anothertag")
          .then(() => {
            expect(state.hashtags).to.deep.equal(["#test", "#anothertag"]);
            expect(state.mentions).to.deep.equal(["Bob", "Samuel"]);
            expect(state.message).to.equal(
              "#test test message, hello $0 and $1 #anothertag"
            );
          });
      });
    });
  });
});
