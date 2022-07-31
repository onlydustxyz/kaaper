import { BaseCommentParser } from "../interfaces/function-comment";
import { FunctionComment } from "../../types";

export default class FunctionCommentRaisesParser extends BaseCommentParser {
  constructor(functionCommentText: string) {
    super(functionCommentText);
    this.name = "Raises";
  }

  parseCommentLine(line: string): FunctionComment | null {
    if (this.runningScope === true && this.startLine !== line) {
      if (line.includes("None")) {
        return null;
      }
      const regexp = /(\w+):\s*([\w\s\^]+)$/gm;
      const functionComments = [...this.functionCommentText.matchAll(regexp)];
      for (var functionComment of functionComments) {
        const commentLine = [...line.matchAll(regexp)];
        if (functionComment[0] === commentLine![0][0]) {
          const start = functionComment.index!;
          const matchInterface = {
            name: functionComment[1].trim(),
            type: "",
            desc: functionComment[2].trim(),
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
