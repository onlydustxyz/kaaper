import * as fs from "fs";
import FunctionSignatureRegexParser from "../lib/parser/function-signature/regex";
import FunctionCommentDescParser from "../lib/parser/function-comment/desc";
import FunctionCommentImplicitArgsParser from "./parser/function-comment/implicit-args";
import { BaseCommentParser } from "./parser/interfaces/function-comment";
import FunctionCommentExplicitArgsParser from "./parser/function-comment/explicit-args";

// TODO: refactor this
let map = new Map();
map.set("constructor", /@constructor\s[\w\s\{\}\:\*\,\(\)\#\->\#\^]+\s/gm);

export default class CairoParser {
  // public supportedComments: Map<string, BaseCommentParser>;
  public supportedScopes: Array<string>;
  public supportedComments: Array<BaseCommentParser>;

  constructor() {
    this.supportedScopes = ["constructor"];
    this.supportedComments = [new FunctionCommentDescParser()];
  }
  static getRegex(name: string): RegExp {
    return map.get(name);
  }

  static parseFunctionScope(filePath: string, name: string): string {
    const text = fs.readFileSync(filePath, "utf8");
    const result = text.match(this.getRegex(name));
    if (result) {
      return result[0];
    }
    return "";
  }

  static parseCommentLines(line: string): RegExpMatchArray | null {
    const comments = line.match(/#\s+(.+)/gm);
    return comments;
  }

  // TODO: parse whole file and return parsed outputs
}
