import {FunctionComment, MultiLineFunctionComment} from "../../types";

export abstract class BaseCommentParser {
  public startLine: string;
  public runningScope: boolean;
  public endScope: boolean;
  public startEndScopeRegexp: RegExp;
  public name: string;
  public functionCommentText: string | null;
  public regex: RegExp;

  constructor(functionCommentText: string | null) {
    this.startLine = "";
    this.runningScope = false;
    this.endScope = false;
    this.startEndScopeRegexp = /\/\/\s?(\w+\s?\w+)/;
    this.name = "";
    this.regex = /""/;
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
      // const result = line.match(this.endScopeRegexp);
      // if (result && !this.runningScope) {
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

  /*
    * Parse a line of comment text and check if it's inside a scope, in this case explicit args
    * For example, in the following scope
    * ```
    // Desc: 
    //   Returns the amount of tokens owned by an account
    // Explicit args:
    //   account(felt): The address of the account
    // Returns:
    //   balance(Uint256): The amount of tokens owned by an account
    ```

    Since this is explicit args scope, we only want these lines to be parsed
    account(felt): The address of the account

    Then return this line as RegExpMatchArray
    */

  isInsideScope(line: string, regexp: RegExp): RegExpMatchArray | null {
    const isNone = line.match(/\/\/\s*None$/);
    if (isNone) {
      return null;
    }
    if (
      this.functionCommentText &&
      this.runningScope === true &&
      this.startLine !== line
    ) {
      const functionComments = [...this.functionCommentText.matchAll(regexp)];
      for (var functionComment of functionComments) {
        /* without // or anything else, just pure content
        e.g name(felt): The name of the token instead of
        // name(felt): The name of the token */
        const commentLine = [...line.matchAll(regexp)];
        if (functionComment[0] === commentLine![0][0]) {
          return functionComment;
        }
      }
    }
    return null;
  }


  parseCommentLine(line: string, text: string): FunctionComment | null {
    throw new Error("NOT IMPLEMENTED!");
  }

  parseCommentLines(
    lines: RegExpMatchArray | null
  ): Array<FunctionComment> | null {
    var result: Array<FunctionComment> = [];
    if (lines && this.functionCommentText) {
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

export abstract class NatspecCommentParser {
  public startLine: string;
  public runningScope: boolean;
  public endScope: boolean;
  public name: string;
  public functionCommentText: string | null;
  public regex: RegExp;
  public startScopeRegexp: RegExp;
  public endScopeRegexp: RegExp;
  public currentScope: string;

  constructor(functionCommentText: string | null) {
    this.startLine = "";
    this.runningScope = false;
    this.endScope = false;
    this.startScopeRegexp = /""/; // Child class should override this
    this.endScopeRegexp = /""/;
    this.currentScope = "";
    this.name = "";
    this.regex = /""/;
    this.functionCommentText = functionCommentText;
  }

  isStartScope(line: string): boolean {
    const result = line.match(this.startScopeRegexp);
    if (result) {
      if (result[1] === this.name && this.name !== this.currentScope) {
        return true;
      }
    }
    return false;
  }

  isInsideScope(line: string | undefined, regexp: RegExp): RegExpMatchArray | null {
    const isNone = line?.match(/\/\/\s*None$/) || !line;
    if (isNone) {
      return null;
    }
    if (
      this.functionCommentText &&
      this.runningScope === true
    ) {
      const functionComments = [...this.functionCommentText.matchAll(regexp)];
      for (var functionComment of functionComments) {
        /* without // or anything else, just pure content
        e.g name(felt): The name of the token instead of
        // name(felt): The name of the token */
        const commentLine = [...line.matchAll(regexp)];
        if (functionComment[0] === commentLine![0][0]) {
          return functionComment;
        }
      }
    }
    return null;
  }


  setStartScope(line: string) {
    if (this.isStartScope(line) === true) {
      this.runningScope = true;
      this.currentScope = this.name;
      this.startLine = line;
    }
  }

  isEndScope(line: string | undefined): boolean {
    if (!line) return true;
    const result = line.match(this.endScopeRegexp);
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

  parseCommentLine(line: string, text: string): MultiLineFunctionComment | null {
    throw new Error("NOT IMPLEMENTED!");
  }

  /**
   * Modified version that takes into account multi-line documentation for a single tag.
   * @param lines
   */
  parseCommentLines(
    lines: RegExpMatchArray | null
  ): Array<FunctionComment> | null {
    const commentLines: Array<MultiLineFunctionComment> = [];
    const result: Array<FunctionComment> = [];
    if (lines && this.functionCommentText) {
      for (const line of lines) {
        this.setStartScope(line);
        this.setEndScope(line);
        const functionComment = this.parseCommentLine(
          line,
          this.functionCommentText
        );
        if (functionComment) {
          commentLines.push(functionComment);
        }
      }
      if (commentLines.length > 0) {
        commentLines.forEach((documentationLine) => {
          const functionComment = documentationLine.functionComment;
          // If the current comment is multiline, we need to merge it with the last element of the array.
          // Otherwise, we push the new element to the array.
          if (documentationLine.isMultiLine) {
            const lastComment = result[result.length - 1];
            lastComment.desc += `\n${functionComment.desc}`;
            lastComment.charIndex.end = functionComment.charIndex.end;
          } else {
            result.push(functionComment);
          }
        });
        return result;
      }
      return null;
    }
    return null;
  }
}