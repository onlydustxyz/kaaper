import { BaseCommentParser } from "../interfaces/function-comment";
import { FunctionComment } from "../../types";

export default class FunctionCommentRaisesParser extends BaseCommentParser {
  constructor(functionCommentText: string | null) {
    super(functionCommentText);
    this.name = "Raises";
    this.regex = /(\w+):\s*([\w\s\^]+)$/gm;
  }

  parseCommentLine(line: string): FunctionComment | null {
    const lineCommentInsideScope = this.isInsideScope(line, this.regex);
    if (lineCommentInsideScope) {
      const start = lineCommentInsideScope.index!;
      const matchInterface = {
        name: lineCommentInsideScope[1].trim(),
        type: "",
        desc: lineCommentInsideScope[2].trim(),
        charIndex: {
          start: start,
          end: start + lineCommentInsideScope[0].length,
        },
      };
      return matchInterface;
    }

    return null;
  }
}
