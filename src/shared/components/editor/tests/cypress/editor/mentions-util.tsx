import { ReactElement } from "react";
import { DummyData } from "./types";
import MentionsPlugin from "../../../a/plugins/mentions/mentions-plugin";
import { EditorProps, EditorTheme } from "../../../a/types";
import { Klass, LexicalNode } from "lexical";

export function setPlugins(basicProps: EditorProps, plugins: ReactElement[]) {
  basicProps.plugins = plugins;
}

export function createMentionsPlugin() {
  return (
    <MentionsPlugin<DummyData>
      dataFetcher={dummyService}
      renderItem={dummyRenderer}
      keyExtractor={dummyKeyExtractor}
    />
  );
}

export function setConfig(basicProps: EditorProps, nodes: Klass<LexicalNode>[], theme?: EditorTheme) {
  basicProps.config = {
    ...basicProps.config,
    theme: theme,
    nodes: nodes,
  };
}

// basic dummy functions that MentionsPlugin requires
let data: DummyData[];

export function dummyKeyExtractor(data: DummyData): string {
  return data.key;
}

export function dummyRenderer(data: DummyData): ReactElement {
  return <span>{data.name}</span>;
}

export function setData(jsonData: DummyData[]) {
  data = jsonData;
}

export function dummyService(queryString: string): DummyData[] {
  return data.filter((data) => {
    return data.name.startsWith(queryString);
  });
}
