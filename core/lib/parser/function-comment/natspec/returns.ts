import { BaseCommentParser, NatspecCommentParser } from "../../interfaces/function-comment";
import { FunctionComment, MultiLineFunctionComment } from "../../../types";

export default class NatspecCommentReturnsParser extends NatspecCommentParser {
  constructor(functionCommentText: string | null) {
    super(functionCommentText);
    this.name = "@return";
    this.startScopeRegexp = /\/\/\s+(@return)(.*)/;
    this.endScopeRegexp = /\/\/\s+@(?!return)(.*)/g;
    this.regex = /\/\/(\s+)(@return)?(\s\w*\s?)?(\s?)(.*)/gm
  }

  parseCommentLine(line: string): MultiLineFunctionComment | null {
    const lineCommentInsideScope = this.isInsideScope(line, this.regex);
    if (lineCommentInsideScope) {
      const isTagInComment = lineCommentInsideScope[2] === (this.name);
      const startLineIndex = lineCommentInsideScope.index!;
      const startDescIndex = startLineIndex + 2 + lineCommentInsideScope.slice(1, 4).join("").length
      const matchInterface = {
        name: lineCommentInsideScope[3]?.trim() || '',
        type: "",
        desc: lineCommentInsideScope[5].trim(),
        charIndex: {
          start: startDescIndex,
          end: startDescIndex + lineCommentInsideScope[5].length,
        },
      };
      return { isMultiLine: !isTagInComment, functionComment: matchInterface };
    }
    return null;
  }
}
