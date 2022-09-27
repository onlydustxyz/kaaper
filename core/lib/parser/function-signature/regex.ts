import { BaseFunctionSignatureParser } from "../interfaces/function-signature";
import { FunctionSignature, CharIndex, FunctionScope } from "../../types";

export default class FunctionSignatureRegexParser extends BaseFunctionSignatureParser {
  constructor() {
    super();
  }

  getAttributeName(line: string): string {
    const result = line.match(/@(.+)/);
    if (result) {
      return result[1];
    }
    return "";
  }

  getFunctionName(line: string): string {
    const result = line.match(/func (\w+)/);
    if (result) {
      return result[1];
    }
    return "";
  }

  getFunctionNameCharIndex(
    functionScope: FunctionScope,
    isNamespace: boolean = false
  ): CharIndex {
    const functionScopeText =
      isNamespace === true
        ? functionScope.text
          .split("\n")
          .slice(1, functionScope.text.split("\n").length)
          .join("\n")
        : functionScope.text;
    const regexp = /func(\s*)(\w+)/gm;
    const matchAgainstScope = [...functionScopeText.matchAll(regexp)];
    const scopeStartIndex = matchAgainstScope[0].index!;
    const spaceLength = matchAgainstScope[0][1].length;
    const functionNameStartIndex = scopeStartIndex + 4 + spaceLength;
    const charIndex: CharIndex = {
      start: functionScope.start + functionNameStartIndex,
      end:
        functionScope.start +
        functionNameStartIndex +
        matchAgainstScope[0][2].length,
    };
    return charIndex;
  }

  getImplicitArgs(line: string): Array<FunctionSignature> | null {
    const matchResult = line.match(/{([\w\s:,*]+)}/);

    if (matchResult) {
      const result = this.getMappingResult(matchResult[1]);
      return result;
    }
    return null;
  }

  getExplicitArgs(line: string): Array<FunctionSignature> | null {
    const matchResult = line.match(
      /\(([\w\s:,*]*)\)\s*-?>?\s\(?([\w\s:,*]*)/
    );
    if (matchResult) {
      const result = this.getMappingResult(matchResult![1]);
      return result;
    }
    return null;
  }

  getReturns(line: string): Array<FunctionSignature> | null {
    const matchResult = line.match(
      /\(([\w\s\:\,\*]*)\)\s*-?>?\s\(?([\w\s\:\,\*]*)/
    );

    if (matchResult) {
      const result = this.getMappingResult(matchResult[2]);
      return result;
    }
    return null;
  }
}
