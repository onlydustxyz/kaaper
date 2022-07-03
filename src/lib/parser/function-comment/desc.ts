export default class FunctionCommentDescParser {
  constructor() {}

  isStartScope(line: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] === "Desc") {
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

  returnOutput(line: string): string {
    if (this.isInsideScope(line)) {
      const match = line.match(/#\s+(.+)/)
        if (match) {
          return match[1]
        }
    }
    return "";
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
