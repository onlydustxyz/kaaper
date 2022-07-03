export default class FunctionCommentReturnsParser {
  constructor() {}

  isStartScope(line: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] === "Returns") {
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

  returnOutput(line: string): Map<string,string>|null | string {
    if (this.isInsideScope(line)) {
      
      const match = line.match(/#\s+(.+)/)

        if (match) {
          if (match[1] === "None"){
            return "None";
          }
          const split = match[1].split(":")
          const left = split[0]
          const right = split[1]
          const response = new Map<string, string>();
          const result = left.split("(");
          response.set("name", result[0]);
          try {
            response.set("type", result[1].split(")")[0]);
          } catch (e) {
            response.set("type", "");
          }
          try{
            response.set("desc", right.trim())
          } catch{
            response.set("desc", "")
          }
          return response
        }
    }
    return null;
  }

  isEndScope(line: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] !== "Returns") {
        return true;
      }
    }
    return false;
  }
}
