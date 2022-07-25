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
  FunctionScope,
  CommentScope,
  NamespaceScope,
  ParsingResultNew,
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
map.set("namespace", /namespace\s+(\w+):/gm);
map.set(
  "function",
  /func\s+\w+{[\w\s:*,]*}\([\w\s:*,]*\)\s*-?>?\s*\(?[\w\s:*,]*\)?:\s+[#\s\w:,\(\)*]+/gm
);
map.set("comment", /\s*#\s*(.+)/gm);

export default class CairoParser {
  constructor() {}

  static getRegex(name: string): RegExp {
    return map.get(name);
  }

  static getNamespaceScopes(text: string): NamespaceScope[] | null {
    const lines = text.split("\n");
    var namespaces: NamespaceScope[] = [];
    var attributeName: string = "";
    var startLineNumber = 0;
    var lineCount = 0;
    var runningScope = false;
    var texts: string = "";

    for (var line of lines) {
      lineCount += 1;

      if (runningScope === true) {
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
          start: startLineNumber,
          end: lineCount,
          text: texts.trim(),
        };

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

  static getNamespaceScopesMatchAll(text: string): NamespaceScope[] | null {
    const lines = text.split("\n");
    var namespaces: NamespaceScope[] = [];
    var startLineNumber = 0;
    var attributeName: string = "";
    var lineCount = 0;
    var runningScope = false;
    var texts: string = "";

    const regexp = this.getRegex("namespace");
    const namespaceScopes = [...text.matchAll(regexp)];

    var namespaceCount = 0;
    for (var line of lines) {
      lineCount += 1;

      if (runningScope === true) {
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
          start: namespaceScopes[namespaceCount].index!,
          end: 0,
          text: texts.trim(),
        };

        texts = "";
        attributeName = "";
        runningScope = false;
        namespaceCount += 1;
        namespaces.push(namespace);
      }
    }
    if (namespaces.length === 0) {
      return null;
    }
    return namespaces;
  }

  static parseNamespaceScopesWithMatchAll(
    text: string
  ): FunctionScope[] | null {
    const namespaces = CairoParser.getNamespaceScopesMatchAll(text);
    var namespaceScopes: FunctionScope[] = [];
    if (namespaces) {
      for (var namespace of namespaces) {
        const namespaceText = namespace.text;
        const namespaceName = namespace.namespace;
        const matches = this.parseFunctionScopeWithMatchAll(
          namespaceText!,
          "function"
        );
        if (matches) {
          for (var match of matches) {
            const functionScope = {
              text: `@${namespaceName}\n${match.text}`,
              start: namespace.start! + match.start,
              end: namespace.start! + match.end,
            };
            namespaceScopes.push(functionScope);
          }
        }
      }
      return namespaceScopes;
    }
    return null;
  }

  static parseFunctionScopeWithMatchAll(
    text: string,
    name: string
  ): FunctionScope[] | null {
    const regexp = this.getRegex(name);
    var functionScopes: FunctionScope[] = [];
    const matches = text.matchAll(regexp);
    for (const match of matches) {
      const startIndex = match.index ? match.index : 0;
      const functionScope = {
        text: match[0],
        start: startIndex,
        end: startIndex + match[0].length,
      };
      functionScopes.push(functionScope);
    }

    if (functionScopes.length > 0) {
      return functionScopes;
    }
    return null;
  }

  static parseCommentLinesWithMatchAll(
    scope: FunctionScope,
    isNamespace: boolean = false
  ): CommentScope | null {
    const regexp = this.getRegex("comment");
    const commentLinesText = this.parseCommentLines(scope.text);
    if (scope && commentLinesText) {
      const scopeLineStart = scope.start;
      const scopeText =
        isNamespace === true
          ? scope.text
              .split("\n")
              .slice(1, scope.text.split("\n").length)
              .join("\n")
          : scope.text;
      const commentLines = [...scopeText.matchAll(regexp)];
      const commentLineStart = scopeLineStart! + commentLines[0].index!;

      const commentLineEnd =
        scopeLineStart! +
        commentLines[commentLines.length - 1].index! +
        commentLines[commentLines.length - 1][0].length;

      const commentLineRange = {
        text: commentLinesText.text,
        start: commentLineStart,
        end: commentLineEnd,
      };
      return commentLineRange;
    }
    return null;
  }

  static parseNamespaceScopes(text: string): string[] | null {
    const namespaces = CairoParser.getNamespaceScopes(text);
    var namespaceScopes: string[] = [];
    if (namespaces) {
      for (var namespace of namespaces) {
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
      return namespaceScopes;
    }

    return null;
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
  static parseCommentLines(line: string): CommentScope | null {
    const comments = line.match(this.getRegex("comment"));
    if (comments && comments.length > 0) {
      const matchStart = 0;
      const matchEnd = matchStart! + comments.length;
      const commentLines = {
        text: comments,
        start: matchStart!,
        end: matchEnd!,
      };
      return commentLines;
    }
    return null;
  }

  static getScopeParsingResult(
    text: string,
    name: string
  ): ParsingResult[] | null {
    const functionScopeLines =
      name === "namespace"
        ? CairoParser.parseNamespaceScopes(text)
        : CairoParser.parseFunctionScope(text, name);
    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    var parsingOutputs = [];

    // parse comment lines
    if (functionScopeLines) {
      for (var functionScope of functionScopeLines) {
        const commentLines = CairoParser.parseCommentLines(functionScope)!.text;

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
            desc: functionCommentDescParser.parseCommentLines(commentLines),
            implicitArgs:
              functionCommentImplicitArgsParser.parseCommentLines(commentLines),
            explicitArgs:
              functionCommentExplicitArgsParser.parseCommentLines(commentLines),
            returns:
              functionCommentReturnsParser.parseCommentLines(commentLines),
            raises: functionCommentRaisesParser.parseCommentLines(commentLines),
          },
        };

        parsingOutputs.push(parsingOutput);
      }

      return parsingOutputs;
    }
    return null;
  }

  static getScopeParsingResultMatchAll(
    text: string,
    name: string
  ): ParsingResultNew[] | null {
    const functionScopeLines =
      name === "namespace"
        ? CairoParser.parseNamespaceScopesWithMatchAll(text)
        : CairoParser.parseFunctionScopeWithMatchAll(text, name);

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    var parsingOutputs = [];

    // parse comment lines
    if (functionScopeLines) {
      for (var functionScope of functionScopeLines) {
        const commentLines =
          name === "namespace"
            ? CairoParser.parseCommentLinesWithMatchAll(functionScope, true)
            : CairoParser.parseCommentLinesWithMatchAll(functionScope, false);

        const functionCommentDescParser = new FunctionCommentDescParser();
        const functionCommentImplicitArgsParser =
          new FunctionCommentImplicitArgsParser();
        const functionCommentExplicitArgsParser =
          new FunctionCommentExplicitArgsParser();
        const functionCommentReturnsParser = new FunctionCommentReturnsParser();
        const functionCommentRaisesParser = new FunctionCommentRaisesParser();

        const parsingOutput = {
          attributeName: functionSignatureParser.getAttributeName(
            functionScope!.text
          ),
          functionName: functionSignatureParser.getFunctionName(
            functionScope!.text
          ),
          functionSignature: {
            implicitArgs: functionSignatureParser.getImplicitArgs(
              functionScope!.text
            ),
            explicitArgs: functionSignatureParser.getExplicitArgs(
              functionScope!.text
            ),
            returns: functionSignatureParser.getReturns(functionScope!.text),
          },
          functionComment: {
            desc: functionCommentDescParser.parseCommentLines(
              commentLines!.text
            ),
            implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
              commentLines!.text
            ),
            explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
              commentLines!.text
            ),
            returns: functionCommentReturnsParser.parseCommentLines(
              commentLines!.text
            ),
            raises: functionCommentRaisesParser.parseCommentLines(
              commentLines!.text
            ),
            start: commentLines!.start,
            end: commentLines!.end,
          },
        };

        parsingOutputs.push(parsingOutput);
      }

      return parsingOutputs;
    }
    return null;
  }

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

    const namespaceParsingResult = CairoParser.getScopeParsingResult(
      text,
      "namespace"
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

    if (namespaceParsingResult) {
      allParsingResult = allParsingResult.concat(namespaceParsingResult);
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
