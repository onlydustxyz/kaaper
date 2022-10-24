import {BaseCommentParser, NatspecCommentParser} from "../../interfaces/function-comment";
import {FunctionComment, MultiLineFunctionComment} from "../../../types";

export default class NatspecCommentNoticeParser extends NatspecCommentParser {
  constructor(functionCommentText: string | null) {
    super(functionCommentText);
    this.name = "@notice";
    this.startScopeRegexp = /\/\/\s+(@notice)(.*)/m;
    this.endScopeRegexp = /\/\/\s+(?!@notice)(.*)/m;
    this.regex = /\/\/(\s+)(.+)/gm;
  }

  parseCommentLine(line: string): MultiLineFunctionComment | null {
    const lineCommentInsideScope = this.isInsideScope(line, this.regex);
    if (lineCommentInsideScope) {

      const comment = lineCommentInsideScope[2];
      const isTagInComment = comment.includes(this.name);
      const startLineIndex = lineCommentInsideScope.index!;
      const offset = 2 + lineCommentInsideScope[1].length + (isTagInComment ? this.name.length+1 : 0);
      // startLineIndex + 2 because the startline would be the the space after the // (2 character)
      const startDescIndex =
        startLineIndex + offset

      const desc = comment.includes(this.name) ? comment.split(this.name)[1] : comment;
      const matchInterface = {
        name: "",
        type: "",
        desc: desc.trim(),
        charIndex: {
          start: startDescIndex,
          end: startDescIndex + desc.length,
        },
      };
      return {isMultiLine:!isTagInComment, functionComment: matchInterface};
    }
    return null;
  }
}
