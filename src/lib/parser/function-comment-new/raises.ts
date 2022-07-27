import { BaseCommentParser } from "../interfaces/function-comment-new";
import { FunctionCommentNew } from "../../types";

export default class FunctionCommentRaisesParser extends BaseCommentParser {
  constructor(functionComment: string) {
    super(functionComment);
    this.name = "Raises";
  }

  www(line: string): FunctionCommentNew | null {
    if (this.runningScope === true && this.startLine !== line) {
      const regexp = /((\w+)(\(?([\w\*]+)\))?)$/gm;
      const functionComments = [...this.functionComment.matchAll(regexp)];
      for (var functionComment of functionComments) {
        // without # or anything else, just pure content
        // e.g `pedersen_ptr(HashBuiltin*)` instead of
        // #     pedersen_ptr(HashBuiltin*)
        const commentLine = [...line.matchAll(regexp)];
        if (functionComment[0] === commentLine![0][0]) {
          const start = functionComment.index!;
          const type = functionComment[4] ? functionComment[4].trim() : "";
          const matchInterface = {
            name: functionComment[2].trim(),
            type: type,
            desc: "",
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

  parseCommentLine(line: string): FunctionCommentNew | null {
    if (this.runningScope === true && this.startLine !== line) {
      if (line.includes("None")) {
        return null;
      }
      const regexp = /(\w+):\s*([\w\s\^]+)$/gm;
      const functionComments = [...this.functionComment.matchAll(regexp)];
      for (var functionComment of functionComments) {
        // without # or anything else, just pure content
        // e.g `pedersen_ptr(HashBuiltin*)` instead of
        // #     pedersen_ptr(HashBuiltin*)
        const commentLine = [...line.matchAll(regexp)];
        if (functionComment[0] === commentLine![0][0]) {
          const start = functionComment.index!;
          const type = functionComment[2] ? functionComment[2].trim() : "";
          const matchInterface = {
            name: functionComment[1].trim(),
            type: type,
            desc: "",
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
