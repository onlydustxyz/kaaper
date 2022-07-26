import { BaseCommentParser } from "../interfaces/function-comment";
import { FunctionComment } from "../../types";

export default class FunctionCommentReturnsParser extends BaseCommentParser {
  constructor() {
    super();
    this.name = "Returns";
  }

  parseCommentLine(line: string): FunctionComment | null {
    if (this.runningScope === true && this.startLine !== line) {
      const matchCommentLines = line.match(/#\s+(.+)/);

      if (matchCommentLines) {
        if (matchCommentLines[1] === "None") {
          return null;
        }
        const matchInterface = line.match(/(\w+)(\((\w+)\)):(.*)/);
        if (matchInterface) {
          return {
            name: matchInterface[1],
            type: matchInterface[3],
            desc: matchInterface[4].trim(),
          };
        }
      }
    }
    return null;
  }
}
