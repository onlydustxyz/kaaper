import { BaseCommentParser } from "../interfaces/function-comment";

export default class FunctionCommentDescParser extends BaseCommentParser {
  constructor() {
    super();
  }

  isStartScope(line: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] === "Desc") {
        return true;
      }
    }
    return false;
  }

  returnOutput(line: string): Map<string, string> | null {
    if (this.isInsideScope(line)) {
      const match = line.match(/#\s+(.+)/);
      if (match) {
        const response = new Map<string, string>();
        response.set("desc", match[1].trim());
        return response;
      }
    }
    return null;
  }

  isEndScope(line: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] !== "Desc") {
        return true;
      }
    }
    return false;
  }
}
