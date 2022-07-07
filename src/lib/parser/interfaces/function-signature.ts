export abstract class BaseFunctionSignatureParser {
  constructor() {}

  getMappingResult(line: string): Array<FunctionSignature> {
    // create new array
    var outputResult: Array<FunctionSignature> = [];
    const mappingResult = line.split(",");

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

  getAttributeName(line: string): string {
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
    const matchResult = line.match(/\(\s+([\w\s\:\,]+)\):/);

    if (matchResult) {
      const result = this.getMappingResult(matchResult[1]);
      return result;
    }
    return null;
  }
}
