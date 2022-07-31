import { BaseCommentParser } from "../interfaces/function-comment";
import { FunctionComment, FunctionCommentScope } from "../../types";

export default class FunctionCommentDescParser extends BaseCommentParser {
  constructor(functionCommentText: string) {
    super(functionCommentText);
    this.name = "Desc";
  }

  parseCommentLine(line: string): FunctionComment | null {
    if (this.runningScope === true && this.startLine !== line) {
      const regexp = /#(\s+)(.+)/gm;
      const functionComments = [...this.functionCommentText.matchAll(regexp)];
      for (var functionComment of functionComments) {
        // without # or anything else, just pure content
        // e.g name(felt): The name of the token, instead of
        // # name(felt): The name of the token
        const commentContentOnly = [...line.matchAll(regexp)];
        if (functionComment[0] === commentContentOnly![0][0]) {
          const startLineIndex = functionComment.index!;
          const startDescIndex = startLineIndex + 1 + functionComment[1].length;
          const desc = functionComment[2];
          const matchInterface = {
            name: "",
            type: "",
            desc: desc.trim(),
            charIndex: {
              start: startDescIndex,
              end: startDescIndex + desc.length,
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
