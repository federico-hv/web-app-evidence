import { GenericOption } from "../../../a/plugins/mentions/types";

type State<T> = {
  [K in keyof T]: T[K];
} & GenericState;

export type GenericState = {
  message: string;
};

export interface HashtagState extends State<{ hashtags: string[] }> {}

export interface MessageState extends State<{ mentions: string[] }> {}

export interface DummyData extends GenericOption {
  key: string;
}
