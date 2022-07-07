import { BaseCommentParser } from "../interfaces/function-comment";

export default class FunctionCommentImplicitArgsParser extends BaseCommentParser {
  constructor() {
    super();
    this.name = "Implicit args";
  }

  parseCommentLine(line: string): FunctionComment | null {
    if (this.runningScope === true && this.startLine !== line) {
      const matchCommentLines = line.match(/#\s+(.+)/);
      if (matchCommentLines) {
        const matchInterface = line.match(/#\s+(\w+)(\(?([\w\*]+)\))?$/);
        if (matchInterface) {
          if (matchInterface[3]) {
            return {

              name: matchInterface[1],
              type: matchInterface[3],
              desc: "",
            };
          }
          return { name: matchInterface[1], type: "", desc: "" };
        }
      }
    }
    return null;
  }
}
