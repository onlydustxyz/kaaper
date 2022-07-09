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
map.set("view", /@view\s[\w\s\{\}\:\*\,\(\)\#\->\#\^]+\s/gm);

export default class CairoParser {
  constructor() {}

  static getRegex(name: string): RegExp {
    return map.get(name);
  }

  // parse whole scope
  static parseFunctionScope(
    filePath: string,
    name: string
  ): RegExpMatchArray | null {
    const text = fs.readFileSync(filePath, "utf8");
    const result = text.match(this.getRegex(name));
    if (result) {
      return result;
    }
    return null;
  }

  // parse only commented lines
  // run this after parsing the whole scope using parseFunctionScope
  static parseCommentLines(line: string): RegExpMatchArray | null {
    const comments = line.match(/#\s+(.+)/gm);
    return comments;
  }

  // parse whole scope and return appropiate data structure
  static getScopeParsingResult(
    filePath: string,
    name: string
  ): ParsingResult[] | null {
    const functionScopeLines = CairoParser.parseFunctionScope(filePath, name);

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    var parsingOutputs = [];

    // parse comment lines
    if (functionScopeLines) {
      for (var functionScope of functionScopeLines) {
        console.log(functionScope);
        const commentLines = CairoParser.parseCommentLines(functionScope);

        const functionCommentDescParser = new FunctionCommentDescParser();
        const functionCommentImplicitArgsParser =
          new FunctionCommentImplicitArgsParser();
        const functionCommentExplicitArgsParser =
          new FunctionCommentExplicitArgsParser();
        const functionCommentReturnsParser = new FunctionCommentReturnsParser();
        const functionCommentRaisesParser = new FunctionCommentRaisesParser();

        const parsingOutput = {
          attributeName:
            functionSignatureParser.getAttributeName(functionScope),
          functionName: functionSignatureParser.getFunctionName(functionScope),
          functionSignature: {
            implicitArgs:
              functionSignatureParser.getImplicitArgs(functionScope),
            explicitArgs:
              functionSignatureParser.getExplicitArgs(functionScope),
            returns: functionSignatureParser.getReturns(functionScope),
          },
          functionComment: {
            desc: functionCommentDescParser.parseCommentLines(commentLines!),
            implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
              commentLines!
            ),
            explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
              commentLines!
            ),
            returns: functionCommentReturnsParser.parseCommentLines(
              commentLines!
            ),
            raises: functionCommentRaisesParser.parseCommentLines(
              commentLines!
            ),
          },
        };

        parsingOutputs.push(parsingOutput);
      }

      return parsingOutputs;
    }
    return null;
  }

  // TODO: dump all parsed data to a file
  // https://github.com/onlydustxyz/kaaper/issues/6

  // TODO: check if there's mismatch between function signature and comment
  // https://github.com/onlydustxyz/kaaper/issues/7

  // TODO: parse all files under a directory
}
