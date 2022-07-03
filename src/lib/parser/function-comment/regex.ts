export default class FunctionCommentRegexParser {
  public keyword: string;

  constructor(keyword: string) {
    this.keyword = keyword;
  }

  isStartScope(line: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] === this.keyword) {
        return true;
      }
    }
    return false;
  }

  postProcess(line: string): Map<string, string> | null {
    // initialize map
    const match = line.match(/#\s+[\w]+[\s\w\(\)\:\*]+/)
    if (match) {
      if (line.startsWith("#")) {
        const result = new Map<string, string>();
        result.set('name', 'name');
        result.set('type', 'type');
        result.set('description', 'description');
        return result
    }
    }
    return null;


    
    
  }


  isEndScope(line: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] !== this.keyword) {
        return true;
      }
    }
    return false;
  }
}
