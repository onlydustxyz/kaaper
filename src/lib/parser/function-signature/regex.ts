import { BaseFunctionSignatureParser } from "../interfaces/function-signature";
import { FunctionSignature } from "../../types";

export default class FunctionSignatureRegexParser extends BaseFunctionSignatureParser {
  constructor() {
    super();
  }

  getAttributeName(line: string, namespace: string | null = null): string {
    if (namespace) {
      return namespace;
    }
    const result = line.match(/@(\w+)/);
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

  getImplicitArgs(line: string): Array<FunctionSignature> | null {
    const matchResult = line.match(/{([\w\s\:\*\,]+)}/);

    if (matchResult) {
      const result = this.getMappingResult(matchResult[1]);
      return result;
    }
    return null;
  }

  getExplicitArgs(line: string): Array<FunctionSignature> | null {
    const matchResult = line.match(
      /\(([\w\s\:\,]*)\):?\s*-?>?\s\(?([\w\s\:,]*)/
    );

    const result = this.getMappingResult(matchResult![1]);
    return result;
  }

  getReturns(line: string): Array<FunctionSignature> | null {
    const matchResult = line.match(
      /\(([\w\s\:\,]*)\):?\s*-?>?\s\(?([\w\s\:,]*)/
    );

    if (matchResult) {
      const result = this.getMappingResult(matchResult[2]);
      return result;
    }
    return null;
  }
}
