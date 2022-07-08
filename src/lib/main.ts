import * as fs from "fs";
import { BaseCommentParser } from "./parser/interfaces/function-comment";
import FunctionSignatureRegexParser from "../lib/parser/function-signature/regex";
import FunctionCommentDescParser from "../lib/parser/function-comment/desc";
import FunctionCommentImplicitArgsParser from "./parser/function-comment/implicit-args";
import FunctionCommentExplicitArgsParser from "./parser/function-comment/explicit-args";
import FunctionCommentReturnsParser from "./parser/function-comment/returns";
import FunctionCommentRaisesParser from "./parser/function-comment/raises";

// TODO: refactor this
let map = new Map();
map.set("constructor", /@constructor\s[\w\s\{\}\:\*\,\(\)\#\->\#\^]+\s/gm);

export default class CairoParser {
  // public supportedComments: Map<string, BaseCommentParser>;
  public supportedScopes: Array<string>;
  public supportedComments: Array<BaseCommentParser>;

  constructor() {
    this.supportedScopes = ["constructor"];
    this.supportedComments = [new FunctionCommentDescParser()];
  }
  static getRegex(name: string): RegExp {
    return map.get(name);
  }

  // parse whole scope
  static parseFunctionScope(filePath: string, name: string): string {
    const text = fs.readFileSync(filePath, "utf8");
    const result = text.match(this.getRegex(name));
    if (result) {
      return result[0];
    }
    return "";
  }

  static parseCommentLines(line: string): RegExpMatchArray | null {
    const comments = line.match(/#\s+(.+)/gm);
    return comments;
  }

  // parse whole scope and return appropiate data structure
  static getScopeParsingResult(filePath: string, name: string): parsingResult {
    const functionScopeLines = CairoParser.parseFunctionScope(
      filePath,
      name,
    );

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // parse comment lines
    const commentLines = CairoParser.parseCommentLines(functionScopeLines);

    const functionCommentDescParser = new FunctionCommentDescParser();
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser();
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser();
    const functionCommentReturnsParser = new FunctionCommentReturnsParser();
    const functionCommentRaisesParser = new FunctionCommentRaisesParser();
    
    var parsingOutput = {
      attributeName:
        functionSignatureParser.getAttributeName(functionScopeLines),
      functionName: functionSignatureParser.getFunctionName(functionScopeLines),
      functionSignature: {
        implicitArgs:
          functionSignatureParser.getImplicitArgs(functionScopeLines),
        explicitArgs:
          functionSignatureParser.getExplicitArgs(functionScopeLines),
      },
      functionComment: {
        desc: functionCommentDescParser.parseCommentLines(commentLines!),
        implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
          commentLines!
        ),
        explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
          commentLines!
        ),
        returns: functionCommentReturnsParser.parseCommentLines(commentLines!),
        raises: functionCommentRaisesParser.parseCommentLines(commentLines!),
      },
    }
    return parsingOutput;
  }





  // TODO: parse available scopes from a file

  // TODO: parse all files under a directory

  // TODO: dump all parsed data to a file
}
