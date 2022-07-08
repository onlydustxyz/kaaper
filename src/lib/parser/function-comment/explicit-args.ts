import { BaseCommentParser } from "../interfaces/function-comment";

export default class FunctionCommentExplicitArgsParser extends BaseCommentParser {
  constructor() {
    super();
    this.name = "Explicit args";
  }

  parseCommentLine(line: string): FunctionComment | null {
    if (this.runningScope === true && this.startLine !== line) {
      const matchCommentLines = line.match(/#\s+(.+)/);

      if (matchCommentLines) {
        const matchInterface = line.match(/(\w+)(\((\w+)\)):(.*)/);
        if (matchInterface) {
          return {
            name: matchInterface[1],
            type: matchInterface[3],
            desc: matchInterface[4].trim(),
          };
        }
      }
    }
    return null;
  }
}
