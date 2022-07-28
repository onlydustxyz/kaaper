import { BaseCommentParser } from "../interfaces/function-comment-new";
import { FunctionCommentNew } from "../../types";

export default class FunctionCommentExplicitArgsParser extends BaseCommentParser {
  constructor(functionComment: string) {
    super(functionComment);
    this.name = "Explicit args";
  }

  parseCommentLine(line: string): FunctionCommentNew | null {
    if (this.runningScope === true && this.startLine !== line) {
      const regexp = /(\w+)(\((\w+)\)):(.*)/gm;
      const functionComments = [...this.functionComment.matchAll(regexp)];
      for (var functionComment of functionComments) {
        // without # or anything else, just pure content
        // e.g name(felt): The name of the token instead of
        // # name(felt): The name of the token
        const commentContentOnly = line.match(regexp);
        if (functionComment[0] === commentContentOnly![0]) {
          const start = functionComment.index!;
          const matchInterface = {
            name: functionComment[1].trim(),
            type: functionComment[3].trim(),
            desc: functionComment[4].trim(),
            charIndex: {
              start: start,
              end: start + functionComment[0].length,
            },
          };
          return matchInterface;
        }
      }
      return null;
    }
    return null;
  }
}
