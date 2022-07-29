import { BaseCommentParser } from "../interfaces/function-comment-new";
import { FunctionCommentNew, FunctionCommentScope } from "../../types";

export default class FunctionCommentReturnsParser extends BaseCommentParser {
  constructor(functionCommentScope: FunctionCommentScope) {
    super(functionCommentScope);
    this.name = "Returns";
  }

  parseCommentLine(line: string): FunctionCommentNew | null {
    if (this.runningScope === true && this.startLine !== line) {
      if (line.includes("None")) {
        return null;
      }
      // console.log('wefhsjdhfskhfkjs')
      // console.log(line)
      const regexp = /(\w+)(\((\w+)\)):(.*)/gm;
      const functionComments = [...line.matchAll(regexp)];
      for (var functionComment of functionComments) {
        const commentLine = [...line.matchAll(regexp)];
        if (functionComment[0] === commentLine![0][0]) {
          const start = functionComment.index!;
          // if (this.)
          console.log(functionComment[0]);
          console.log(commentLine[0][0]);

          console.log(start!);
          // console.log(`name: ${functionComment[1]}`);
          // console.log(`type: ${functionComment[3]}`);
          // console.log(`desc: ${functionComment[4]}`);
          const matchInterface = {
            name: functionComment[1].trim(),
            type: functionComment[3].trim(),
            desc: functionComment[4].trim(),
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
