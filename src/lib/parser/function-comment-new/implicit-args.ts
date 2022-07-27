import { BaseCommentParser } from "../interfaces/function-comment-new";
import { FunctionCommentNew } from "../../types";

export default class FunctionCommentImplicitArgsParser extends BaseCommentParser {
  constructor(functionComment: string) {
    super(functionComment);
    this.name = "Implicit args";
  }

  parseCommentLine(line: string): FunctionCommentNew | null {
    if (this.runningScope === true && this.startLine !== line) {
      const regexp = /((\w+)(\(?([\w\*]+)\))?)$/gm;
      const functionComments = [...this.functionComment.matchAll(regexp)];
      for (var functionComment of functionComments) {
        // without # or anything else, just pure content
        // e.g pedersen_ptr(HashBuiltin*) instead of
        // #     pedersen_ptr(HashBuiltin*)
        const commentLine = [...line.matchAll(regexp)];
        if (functionComment[0] === commentLine![0][0]) {
          const start = functionComment.index!;
          const matchInterface = {
            name: functionComment[2].trim(),
            type: functionComment[4].trim(),
            desc: "",
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
