import {BaseCommentParser, NatspecCommentParser} from "../../interfaces/function-comment";
import {FunctionComment, MultiLineFunctionComment} from "../../../types";

export default class NatspecCommentNoticeParser extends NatspecCommentParser {
  constructor(functionCommentText: string | null) {
    super(functionCommentText);
    this.name = "@notice";
    this.startScopeRegexp = /\/\/\s+(@notice)(.*)/;
    this.endScopeRegexp = /\/\/\s+@(?!notice)(.*)/g; //Only a single notice tag - the scope ends at the next tag.
    this.regex = /\/\/(\s+)(@notice)?(\s?)(.*)/g
  }

  parseCommentLine(line: string): MultiLineFunctionComment | null {
    const lineCommentInsideScope = this.isInsideScope(line, this.regex);
    if (lineCommentInsideScope) {
      const isTagInComment = lineCommentInsideScope[2] === (this.name);
      const startLineIndex = lineCommentInsideScope.index!;
      const startDescIndex = startLineIndex + 2 + lineCommentInsideScope.slice(1,4).join("").length
      const matchInterface = {
        name: "",
        type: "",
        desc: lineCommentInsideScope[4].trim(),
        charIndex: {
          start: startDescIndex,
          end: startDescIndex + lineCommentInsideScope[4].length,
        },
      };
      return {isMultiLine:!isTagInComment, functionComment: matchInterface};
    }
    return null;
  }
}
