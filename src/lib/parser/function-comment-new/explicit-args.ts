import { BaseCommentParser } from "../interfaces/function-comment-new";
import { FunctionCommentNew } from "../../types";

export default class FunctionCommentExplicitArgsParser extends BaseCommentParser {
  constructor(functionComment: string) {
    super(functionComment);
    this.name = "Explicit args";
  }

  parseCommentLine(line: string): FunctionCommentNew | null {
    if (this.runningScope === true && this.startLine !== line) {
      const regexp = new RegExp(`${line}`, "gm");
      const functionComments = [...this.functionComment.matchAll(regexp)];

      if (functionComments.length > 0) {
        const functionComment = line.match(/(\w+)(\((\w+)\)):(.*)/);
        const start = functionComments[0].index!;
        if (functionComment) {
          return {
            name: functionComment[1],
            type: functionComment[3],
            desc: functionComment[4].trim(),
            charIndex: {
              start: start,
              end: start + line.length,
            },
          };
        }
        return null;
      }
      return null;
    }
    return null;
  }
}
