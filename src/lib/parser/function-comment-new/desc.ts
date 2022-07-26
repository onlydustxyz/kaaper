import { BaseCommentParser } from "../interfaces/function-comment-new";
import { FunctionCommentNew } from "../../types";

export default class FunctionCommentDescParser extends BaseCommentParser {
  constructor(functionComment: string) {
    super(functionComment);
    this.name = "Desc";
  }

  parseCommentLine(line: string): FunctionCommentNew | null {
    if (this.runningScope === true && this.startLine !== line) {
      const regexp = new RegExp(`${line}`, "gm");
      const functionComments = [...this.functionComment.matchAll(regexp)];
      if (functionComments.length > 0) {
        // functionComments[0] is equal to line
        const start = functionComments[0].index!;
        const desc: string = line.match(/#\s+(.+)/)![1];
        const matchInterface = {
          name: "",
          type: "",
          desc: desc,
          charIndex: {
            start: start,
            end: start + line.length,
          },
        };
        return matchInterface;
      }
      return null;
    }
    return null;
  }
}
