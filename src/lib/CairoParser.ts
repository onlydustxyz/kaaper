import * as fs from "fs";

import FunctionSignatureRegexParser from "./parser/function-signature/regex";
import FunctionCommentDescParser from "./parser/function-comment/desc";
import FunctionCommentImplicitArgsParser from "./parser/function-comment/implicit-args";
import FunctionCommentExplicitArgsParser from "./parser/function-comment/explicit-args";
import FunctionCommentReturnsParser from "./parser/function-comment/returns";
import FunctionCommentRaisesParser from "./parser/function-comment/raises";
import {
  FunctionSignature,
  FunctionComment,
  ParsingResult,
  FunctionCommentValidity,
  Namespace,
} from "./types";

const lodash = require("lodash");
const yaml = require("js-yaml");

// TODO: refactor this
let map = new Map();
map.set("constructor", /@constructor\s[\w\s\{\}\:\*\,\(\)\#\->\#\^]+\s/gm);
map.set("view", /@view\s[\w\s\{\}\:\*\,\(\)\#\->\#\^]+\s/gm);
map.set("external", /@external\s[\w\s\{\}\:\*\,\(\)\#\->\#\^]+\s/gm);
map.set("event", /@event\s[\w\s\{\}\:\*\,\(\)\#\->\#\^]+\send/gm);
map.set("storage_var", /@storage_var\s[\w\s\{\}\:\*\,\(\)\#\->\#\^]+\send/gm);
map.set("namespace", /namespace\s+(\w+):/);
map.set(
  "function",
  /func\s+\w+{[\w\s:*,]*}\([\w\s:*,]*\)\s*-?>?\s*\(?[\w\s:*,]*\)?:\s+[#\s\w:,\(\)*]+/gm
);
// func\s[\w\s\{\}\:\*\,\(\)\#\->\#\^]+\s^

export default class CairoParser {
  constructor() {}

  static getRegex(name: string): RegExp {
    return map.get(name);
  }

  static getNamespaceScopes(text: string): Namespace[] | null {
    const lines = text.split("\n");
    var namespaces: Namespace[] = [];
    var attributeName: string = "";
    var startLineNumber = 0;
    var lineCount = 0;
    var runningScope = false;
    var texts: string = "";

    for (var line of lines) {
      // console.log(line)
      lineCount += 1;

      if (runningScope === true) {
        // console.log(line)
        texts += line + "\n";
      }

      if (line.startsWith("namespace")) {
        attributeName = `namespace ${line.split(" ")[1].split(":")[0]}`;
        startLineNumber = lineCount;
        runningScope = true;
        texts += line + "\n";
      }
      if (line === "end" && runningScope === true) {
        const namespace = {
          namespace: attributeName,
          startLineNumber: startLineNumber,
          endLineNumber: lineCount,
          text: texts.trim(),
        };
        // console.log(texts.trim())

        texts = "";
        attributeName = "";
        runningScope = false;
        namespaces.push(namespace);
      }
    }
    if (namespaces.length === 0) {
      return null;
    }
    return namespaces;
  }

  static parseNamespaceScopes(text: string): string[] | null {
    const namespaces = CairoParser.getNamespaceScopes(text);
    var namespaceScopes: string[] = [];
    for (var namespace of namespaces!) {
      const text = namespace.text;
      const namespaceName = namespace.namespace;
      const matches = text!.match(this.getRegex("function"));
      if (matches) {
        for (var match of matches) {
          const namespaceScope = `@${namespaceName}\n${match}`;
          namespaceScopes.push(namespaceScope);
        }
      }
    }
    if (namespaceScopes.length === 0) {
      return null;
    }
    return namespaceScopes;
  }

  // parse whole scope
  static parseFunctionScope(
    text: string,
    name: string
  ): RegExpMatchArray | null {
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

  // parse whole scope except for namespace
  // for namespace, use getNamespaceScopeParsingResult
  static getScopeParsingResult(
    text: string,
    name: string
  ): ParsingResult[] | null {
    const functionScopeLines = CairoParser.parseFunctionScope(text, name);

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    var parsingOutputs = [];

    // parse comment lines
    if (functionScopeLines) {
      for (var functionScope of functionScopeLines) {
        const commentLines = CairoParser.parseCommentLines(functionScope);

        const functionCommentDescParser = new FunctionCommentDescParser();
        const functionCommentImplicitArgsParser =
          new FunctionCommentImplicitArgsParser();
        const functionCommentExplicitArgsParser =
          new FunctionCommentExplicitArgsParser();
        const functionCommentReturnsParser = new FunctionCommentReturnsParser();
        const functionCommentRaisesParser = new FunctionCommentRaisesParser();

        const parsingOutput = {
          attributeName: functionSignatureParser.getAttributeName(
            functionScope!
          ),
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

  // parse only namespace scope, because it have different structure than the rest
  // e.g. without (@)
  // TODO: refactor this to use getScopeParsingResult
  static getNamespaceScopeParsingResult(text: string): ParsingResult[] | null {
    const namespaceScopes = CairoParser.getNamespaceScopes(text);
    var parsingOutputs = [];
    for (var namespaceScope of namespaceScopes!) {
      const text = namespaceScope.text;
      const matches = text!.match(this.getRegex("function"));
      for (var match of matches!) {
        const commentLines = CairoParser.parseCommentLines(match);
        const functionSignatureParser = new FunctionSignatureRegexParser();
        const functionCommentDescParser = new FunctionCommentDescParser();

        const functionCommentImplicitArgsParser =
          new FunctionCommentImplicitArgsParser();
        const functionCommentExplicitArgsParser =
          new FunctionCommentExplicitArgsParser();
        const functionCommentReturnsParser = new FunctionCommentReturnsParser();
        const functionCommentRaisesParser = new FunctionCommentRaisesParser();

        const parsingOutput = {
          attributeName: functionSignatureParser.getAttributeName(
            match!,
            namespaceScope.namespace
          ),
          functionName: functionSignatureParser.getFunctionName(match),
          functionSignature: {
            implicitArgs: functionSignatureParser.getImplicitArgs(match),
            explicitArgs: functionSignatureParser.getExplicitArgs(match),
            returns: functionSignatureParser.getReturns(match),
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
    }
    if (parsingOutputs.length === 0) {
      return null;
    }

    return parsingOutputs;
  }

  // TODO: refactor this
  static getFileParsingResult(filePath: string): ParsingResult[] | null {
    const text = fs.readFileSync(filePath, "utf8");
    const constructorParsingResult = CairoParser.getScopeParsingResult(
      text,
      "constructor"
    );
    const viewParsingResult = CairoParser.getScopeParsingResult(text, "view");
    const externalParsingResult = CairoParser.getScopeParsingResult(
      text,
      "external"
    );

    const eventParsingResult = CairoParser.getScopeParsingResult(text, "event");

    const storageVarParsingResult = CairoParser.getScopeParsingResult(
      text,
      "storage_var"
    );

    var allParsingResult: ParsingResult[] = [];
    // combine all scopes
    // TODO: refactor this
    if (constructorParsingResult) {
      allParsingResult = allParsingResult.concat(constructorParsingResult);
    }
    if (viewParsingResult) {
      allParsingResult = allParsingResult.concat(viewParsingResult);
    }
    if (externalParsingResult) {
      allParsingResult = allParsingResult.concat(externalParsingResult);
    }
    if (eventParsingResult) {
      allParsingResult = allParsingResult.concat(eventParsingResult);
    }
    if (storageVarParsingResult) {
      allParsingResult = allParsingResult.concat(storageVarParsingResult);
    }

    if (allParsingResult.length > 0) {
      return allParsingResult;
    }

    return null;
  }

  private static _isValidFunctionComment(
    functionSignature: FunctionSignature[] | null,
    functionComment: FunctionComment[] | null
  ): boolean {
    if (functionSignature === null || functionComment === null) {
      const isImplicitArgsEqual = lodash.isEqual(
        functionSignature,
        functionComment
      );
      if (isImplicitArgsEqual === false) {
        return false;
      }
    } else {
      const isImplicitArgsEqual = lodash.isEqual(
        functionSignature,
        functionComment?.map((obj) => ({ name: obj.name, type: obj.type }))
      );
      if (isImplicitArgsEqual === false) {
        return false;
      }
    }

    return true;
  }

  static isValidFunctionComment(
    parsingResult: ParsingResult
  ): FunctionCommentValidity {
    const functionSignature = parsingResult.functionSignature;
    const functionComment = parsingResult.functionComment;

    var errorSource: string[] = [];
    const isImplicitArgsEqual = this._isValidFunctionComment(
      functionSignature.implicitArgs,
      functionComment.implicitArgs
    );
    if (isImplicitArgsEqual === false) {
      errorSource.push("implicitArgs");
    }

    const isExplicitArgsEqual = this._isValidFunctionComment(
      functionSignature.explicitArgs,
      functionComment.explicitArgs
    );
    if (isExplicitArgsEqual === false) {
      errorSource.push("explicitArgs");
    }

    const isReturnsEqual = this._isValidFunctionComment(
      functionSignature.returns,
      functionComment.returns
    );
    if (isReturnsEqual === false) {
      errorSource.push("returns");
    }
    if (errorSource.length === 0) {
      return {
        isValid: true,
        errorSource: null,
      };
    }

    if (errorSource.length === 1) {
      return {
        isValid: false,
        errorSource: errorSource[0],
      };
    }

    return { isValid: false, errorSource: errorSource };
  }

  static dumpParsingResult(
    parsingResult: ParsingResult[] | null,
    outPath: string,
    dumpCommentOnly: boolean = false
  ): void {
    if (dumpCommentOnly === true) {
      const commentOnlyParsingResult = parsingResult?.map((obj) => ({
        attributeName: obj.attributeName,
        functionName: obj.functionName,
        functionComment: obj.functionComment,
      }));
      fs.writeFileSync(`${outPath}.yaml`, yaml.dump(commentOnlyParsingResult));
    } else {
      fs.writeFileSync(`${outPath}.yaml`, yaml.dump(parsingResult));
    }
  }
}
