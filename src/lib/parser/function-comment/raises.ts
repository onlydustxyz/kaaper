import { BaseCommentParser } from "../interfaces/function-comment";

export default class FunctionCommentRaisesParser extends BaseCommentParser {
  constructor() {
    super();
    this.name = "Raises";
  }

  parseCommentLine(line: string): FunctionComment | null {
    if (this.runningScope === true && this.startLine !== line) {
      const matchCommentLines = line.match(/#\s+(.+)/);

      if (matchCommentLines) {
        if (matchCommentLines[1] === "None") {
          return { name: "", type: "", desc: "None" };
        }
        const matchInterface = line.match(/(\w+):\s*([\w\s\^]+)$/);
        if (matchInterface) {
          return {
            name: matchInterface[1],
            type: "",
            desc: matchInterface[2],
          };
        }
      }
    }
    return null;
  }

}
