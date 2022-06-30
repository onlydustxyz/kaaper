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
    ];
  }

  private _getMappingResult(line: string): Map<string, string> {
    const map = new Map();
    const mappingResult = line.split(",");
    // create a map of the implicit args
    mappingResult.forEach((element) => {
      const [key, value] = element.split(":");
      try {
        map.set(key.trim(), value.trim());
      } catch (e: any) {
        map.set(key.trim(), "");
      }
    }, this);
    return map;
  }

  getComments(line: string): RegExpMatchArray | null {
    const comments = line.match(/#\s+[\w\(\)\s\:\*]+/gm);
    return comments;
  }

  parseAttribute(): string {
    const result = this.text.match(this.regex);
    if (result) {
      return result[0];
    }
    return "";
  }

  getAttributeName(line: string): string {
    const result = line.match(/@(\w+)/);
    if (result) {
      return result[1];
    }
    return "";
  }

  getFunctionName(line: string): string {
    const result = line.match(/func (\w+)/);
    if (result) {
      return result[1];
    }
    return "";
  }

  getImplicitArgs(line: string): Map<string, string> {
    const result = line.match(/{([\w\s\:\*\,]+)}/);
    const map = new Map();

    if (result) {
      const map = this._getMappingResult(result[1]);
      return map;
    }
    return map;
  }

  getExplicitArgs(line: string): Map<string, string> {
    const result = line.match(/\(\s+([\w\s\:\,]+)\):/);
    const map = new Map();

    if (result) {
      const map = this._getMappingResult(result[1]);
      return map;
    }
    return map;
  }

  isStartNode(line: string, keyword: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] === keyword) {
        this.supportedComments = this.supportedComments.filter(item => item !== keyword)
        return true;
      }
      
    }
    return false;
  }


  isEndNode(line: string, keyword: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (this.supportedComments.includes(result[1])) {
        return true
      }
    }
    return false;
  }



  

}
