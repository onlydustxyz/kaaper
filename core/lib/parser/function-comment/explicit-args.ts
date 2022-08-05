import { BaseCommentParser } from "../interfaces/function-comment";
import { FunctionComment } from "../../types";

export default class FunctionCommentExplicitArgsParser extends BaseCommentParser {
  constructor(functionCommentText: string | null) {
    super(functionCommentText);
    this.name = "Explicit args";
    this.regex = /(\w+)(\((\w+)\)):(.*)/gm;
  }
  parseCommentLine(line: string): FunctionComment | null {
    const lineCommentInsideScope = this.isInsideScope(line, this.regex);
    if (lineCommentInsideScope) {
      const start = lineCommentInsideScope.index!;
      const matchInterface = {
        name: lineCommentInsideScope[1].trim(),
        type: lineCommentInsideScope[3].trim(),
        desc: lineCommentInsideScope[4].trim(),
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
