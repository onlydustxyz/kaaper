import {
  FunctionCommentScope,
  FunctionCommentNew,
  CharIndex,
} from "../../types";

export abstract class BaseCommentParser {
  public startLine: string;
  public runningScope: boolean;
  public endScope: boolean;
  public startEndScopeRegexp: RegExp;
  public name: string;
  public functionCommentText: string;
  // public functionCommentScope: FunctionCommentScope;

  constructor(functionCommentText: string) {
    this.startLine = "";
    this.runningScope = false;
    this.endScope = false;
    this.startEndScopeRegexp = /#\s?(\w+\s?\w+)/;
    this.name = "";
    this.functionCommentText = functionCommentText;
  }

  isStartScope(line: string): boolean {
    const result = line.match(this.startEndScopeRegexp);
    if (result) {
      if (result[1] === this.name) {
        return true;
      }
    }
    return false;
  }

  setStartScope(line: string) {
    if (this.isStartScope(line) === true) {
      this.runningScope = true;
      this.startLine = line;
    }
  }

  isEndScope(line: string): boolean {
    const result = line.match(this.startEndScopeRegexp);
    if (result) {
      if (result[1] !== this.name) {
        return true;
      }
    }
    return false;
  }

  setEndScope(line: string) {
    if (this.isEndScope(line)) {
      this.runningScope = false;
      this.endScope = true;
    }
  }

  parseCommentLine(line: string, text: string): FunctionCommentNew | null {
    throw new Error("NOT IMPLEMENTED!");
  }

  parseCommentLines(
    lines: RegExpMatchArray | null
  ): Array<FunctionCommentNew> | null {
    var result: Array<FunctionCommentNew> = [];
    if (lines) {
      for (const line of lines) {
        this.setStartScope(line);
        this.setEndScope(line);
        const functionComment = this.parseCommentLine(
          line,
          this.functionCommentText
        );
        if (functionComment) {
          result.push(functionComment);
        }
      }
      if (result.length > 0) {
        return result;
      }
      return null;
    }
    return null;
  }
}
