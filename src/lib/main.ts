import * as fs from "fs";

// TODO: refactor this
let map = new Map();
map.set("constructor", /@constructor\s[\w\s\{\}\:\*\,\(\)\#\->\#]+\s/gm);

export default class CairoParser {
  public text: string;
  public regex: RegExp;
  public supportedComments: Array<string>;


  constructor(public filePath: string, name: string) {
    this.filePath = filePath;
    this.text = fs.readFileSync(filePath, "utf8");
    this.regex = map.get(name);
    this.supportedComments = [
      "Desc",
      "Implicit args",
      "Explicit args",
      "Returns",
      "Raises",
    ];
  }

  parseFunctionScope(): string {
    const result = this.text.match(this.regex);
    if (result) {
      return result[0];
    }
    return "";
  }

  parseComments(line: string): RegExpMatchArray | null {
    const comments = line.match(/#\s+[\w\(\)\s\:\*]+/gm);
    return comments;
  }
  

  // TODO: running parser on the whole scope

  // TODO: output the parsing result into a proper data structure

}
