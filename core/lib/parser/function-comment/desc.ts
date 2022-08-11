import { BaseCommentParser } from "../interfaces/function-comment";
import { FunctionComment } from "../../types";

export default class FunctionCommentDescParser extends BaseCommentParser {
  constructor(functionCommentText: string | null) {
    super(functionCommentText);
    this.name = "Desc";
    this.regex = /#(\s+)(.+)/gm;
  }
  parseCommentLine(line: string): FunctionComment | null {
    const lineCommentInsideScope = this.isInsideScope(line, this.regex);
    if (lineCommentInsideScope) {
      const startLineIndex = lineCommentInsideScope.index!;
      // startLineIndex + 1 because the startline would be the the space after the #(1 character)
      const startDescIndex =
        startLineIndex + 1 + lineCommentInsideScope[1].length;
      const desc = lineCommentInsideScope[2];
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
    return null;
  }
}
