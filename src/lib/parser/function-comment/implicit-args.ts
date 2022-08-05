import { BaseCommentParser } from "../interfaces/function-comment";
import { FunctionComment } from "../../types";

export default class FunctionCommentImplicitArgsParser extends BaseCommentParser {
  constructor(functionCommentText: string | null) {
    super(functionCommentText);
    this.name = "Implicit args";
    this.regex = /((\w+)(\(?([\w\*]+)\))?)$/gm;
  }

  parseCommentLine(line: string | null): FunctionComment | null {
    if (line === null) {
      return null;
    }
    const lineCommentInsideScope = this.isInsideScope(line, this.regex);
    if (lineCommentInsideScope) {
      const start = lineCommentInsideScope.index!;
      const type = lineCommentInsideScope[4]
        ? lineCommentInsideScope[4].trim()
        : "";
      const matchInterface = {
        name: lineCommentInsideScope[2].trim(),
        type: type,
        desc: "",
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
