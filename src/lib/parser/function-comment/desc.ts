import { BaseCommentParser } from "../interfaces/function-comment";

export default class FunctionCommentDescParser extends BaseCommentParser {
  constructor() {
    super();
    this.name = "Desc";
  }

  parseCommentLine(line: string): FunctionComment | null {
    if (this.runningScope === true && this.startLine !== line) {
      const matchCommentLines = line.match(/#\s+(.+)/);
      if (matchCommentLines) {
        const matchInterface = { name: "", type: "", desc: matchCommentLines[1] };
        return matchInterface;
      }
    }
    return null;
  }



}
