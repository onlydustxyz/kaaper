import {BaseCommentParser, NatspecCommentParser} from "../../interfaces/function-comment";
import {FunctionComment, MultiLineFunctionComment} from "../../../types";

export default class NatspecCommentParamsParser extends NatspecCommentParser {
  constructor(functionCommentText: string | null) {
    super(functionCommentText);
    this.name = "@param";
    this.startScopeRegexp = /\/\/\s+(@param)(.*)/;
    this.endScopeRegexp = /\/\/\s+@(?!param)(.*)/g;
    this.regex = /\/\/(\s+)(@param)(\s\w*\s?)(.*)/gm
  }
  parseCommentLine(line: string): MultiLineFunctionComment | null {
    const lineCommentInsideScope = this.isInsideScope(line, this.regex);
    if (lineCommentInsideScope) {
      const startLineIndex = lineCommentInsideScope.index!;
      // startLineIndex + 2 because the startline would be the the space after the // (2 character)
      const startDescIndex = startLineIndex + 2 + lineCommentInsideScope.slice(1,4).join("").length
      const matchInterface = {
        name: lineCommentInsideScope[3].trim(),
        type: '',
        desc: lineCommentInsideScope[4].trim(),
        charIndex: {
          start: startDescIndex,
          end: startDescIndex + lineCommentInsideScope[4].length,
        },
      };

      const isTagInComment = lineCommentInsideScope[2] === (this.name);
      return {isMultiLine:!isTagInComment, functionComment: matchInterface};

    }
    return null;
  }
}
