import { BaseCommentParser } from "../interfaces/function-comment-new";
import { FunctionCommentNew } from "../../types";

export default class FunctionCommentImplicitArgsParser extends BaseCommentParser {
  constructor(functionComment: string) {
    super(functionComment);
    this.name = "Implicit args";
  }

  parseCommentLine(line: string): FunctionCommentNew | null {
    if (this.runningScope === true && this.startLine !== line) {
      const regexp = /#\s+((\w+)(\(?([\w\*]+)\))?)$/gm;
      const functionComments = [...this.functionComment.matchAll(regexp)];
      for (var functionComment of functionComments) {
        // match the comment line
        // # name(felt): The name of the token
        const commentLine = line.match(regexp);
        if (functionComment[0] === commentLine![0]) {
          const start = functionComment.index!;
          const matchInterface = {
            name: functionComment[2].trim(),
            type: functionComment[4].trim(),
            desc: "",
            charIndex: {
              start: start,
              end: start + line.length,
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
