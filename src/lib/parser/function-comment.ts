export default class FunctionCommentParser {
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


  isEndScope(line: string): boolean {
    const result = line.match(/#\s?(\w+\s?\w+)/);
    if (result) {
      if (result[1] !== this.keyword) {
        return true
      }
    }
    return false;
  }
}
