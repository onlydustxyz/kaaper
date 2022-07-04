export default class FunctionCommentImplicitArgsParser {
  constructor() {}

  isStartScope(line: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] === "Implicit args") {
        return true;
      }
    }
    return false;
  }

  isInsideScope(line: string): boolean {
    if (!this.isStartScope(line)) {
      if (!this.isEndScope(line)) {
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
        const result = match[1].split("(");
        response.set("name", result[0]);
        try {
          response.set("type", result[1].split(")")[0]);
        } catch (e) {
          response.set("type", "");
        }

        return response;
      }
    }
    return null;
  }

  isEndScope(line: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] !== "Implicit args") {
        return true;
      }
    }
    return false;
  }
}
