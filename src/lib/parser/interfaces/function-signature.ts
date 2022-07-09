export abstract class BaseFunctionSignatureParser {
  constructor() {}

  getFunctionSignatureLines(wholeScope: string): string {
    // iterate wholeScope and for each iteration, check if it is a function signature
    // if it is, return the line
    var functionSignatureLines = [];
    const lines = wholeScope.split("\n");
    for (var line of lines) {
      if (line.trim().startsWith("#")) {
        break;
      }
      functionSignatureLines.push(line);
    }
  // join from array into string

  return functionSignatureLines.join("\n");
}

  getMappingResult(line: string): Array<FunctionSignature> | null {
    // create new array
    var outputResult: Array<FunctionSignature> = [];
    if (line.length !== 0) {
      const mappingResult = line.split(",");

    if (mappingResult) {
      mappingResult.forEach((element) => {
        const [key, value] = element.split(":");
        try {
          const map = { name: key.trim(), type: value.trim() };
          outputResult.push(map);
        } catch (e: any) {
          const map = { name: key.trim(), type: "" };
          outputResult.push(map);
        }
      }, this);
      return outputResult;
    }

    }
    
    return null

    
  }

  getAttributeName(line: string): string {
    throw new Error ("Not implemented");
  }

  getFunctionName(line: string): string {
    throw new Error ("Not implemented");
  }

  getImplicitArgs(line: string): Array<FunctionSignature> | null {
    throw new Error ("Not implemented");
  }

  getExplicitArgs(line: string): Array<FunctionSignature> | null {
    throw new Error ("Not implemented");
  }

  getReturns(line: string): Array<FunctionSignature> | null {
    throw new Error ("Not implemented");

  }
}
