export default class FunctionSignatureParser {
  constructor() {}

  private _getMappingResult(line: string): Map<string, string> {
    const map = new Map();
    const mappingResult = line.split(",");

    mappingResult.forEach((element) => {
      const [key, value] = element.split(":");
      try {
        map.set(key.trim(), value.trim());
      } catch (e: any) {
        map.set(key.trim(), "");
      }
    }, this);
    return map;
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

  getImplicitArgs(line: string): Map<string, string> {
    const result = line.match(/{([\w\s\:\*\,]+)}/);
    const map = new Map();

    if (result) {
      const map = this._getMappingResult(result[1]);
      return map;
    }
    return map;
  }

  getExplicitArgs(line: string): Map<string, string> {
    const result = line.match(/\(\s+([\w\s\:\,]+)\):/);
    const map = new Map();

    if (result) {
      const map = this._getMappingResult(result[1]);
      return map;
    }
    return map;
  }
}
