import { BaseCommentParser } from "../interfaces/function-comment";

export default class FunctionCommentExplicitArgsParser extends BaseCommentParser {
  constructor() {
    super();
  }

  isStartScope(line: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] === "Explicit args") {
        return true;
      }
    }
    return false;
  }

  returnOutput(line: string): Map<string, string> | null {
    if (this.isInsideScope(line)) {
      const match = line.match(/#\s+(.+)/);
      if (match) {
        const split = match[1].split(":");
        const left = split[0];
        const right = split[1];
        const response = new Map<string, string>();
        const result = left.split("(");
        response.set("name", result[0]);
        try {
          response.set("type", result[1].split(")")[0]);
        } catch (e) {
          response.set("type", "");
        }
        try {
          response.set("desc", right.trim());
        } catch {
          response.set("desc", "");
        }
        return response;
      }
    }
    return null;
  }

  isEndScope(line: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] !== "Explicit args") {
        return true;
      }
    }
    return false;
  }
}
