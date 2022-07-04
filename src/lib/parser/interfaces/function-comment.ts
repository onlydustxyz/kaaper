export abstract class BaseCommentParser {
    constructor() {}
  
    isStartScope(line: string): boolean {
        throw new Error("NOT IMPLEMENTED!");
    }
  
    isInsideScope(line: string): boolean {
      if (!this.isStartScope(line)) {
        if (!this.isEndScope(line)) {
          return true;
        }
      }
      return false;
    }
    
    returnOutput(line: string): Map<string, string> | null {
        throw new Error("NOT IMPLEMENTED!");
    }
  
    isEndScope(line: string): boolean {
        throw new Error("NOT IMPLEMENTED!");
    }
  }
  