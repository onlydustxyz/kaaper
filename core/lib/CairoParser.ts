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
  FunctionCommentScope,
  NamespaceScope,
} from "./types";
import NatspecCommentNoticeParser from "./parser/function-comment/natspec/notice";
import NatspecCommentParamsParser from "./parser/function-comment/natspec/params";
import NatspecCommentReturnsParser from "./parser/function-comment/natspec/returns";

const lodash = require("lodash");
const yaml = require("js-yaml");

// TODO: refactor this
let map = new Map();
map.set("constructor", /@constructor\s[\/\w\s\->{}:*,()^]+\s/gm);
map.set("view", /@view\s[\/\w\s\->{}:*,()^]+\s/gm);
map.set("external", /@external\s[\/\w\s\->{}:*,()^]+\s/gm);
map.set("event", /@event\s[\/\w\s\->{}:*,()^]+\s}/gm);
map.set("storage_var", /@storage_var\s[\/\w\s\->{}:*,()^]+\s}/gm);
map.set("namespace", /namespace\s+(\w+)\s?{/gm);
map.set(
  "function",
  /func\s+\w+{[\w\s:*,^]*}\([\w\s:*,^]*\)\s*-?>?\s*\(?[\w\s:*,^]*\)?\s?{?\s+[\/\s\w:,()*^]+/gm
);
map.set("comment", /\s*\/\/\s*(.+)/gm);

export default class CairoParser {
  constructor() {
  }

  static getRegex(name: string): RegExp {
    return map.get(name);
  }

  static getNamespaceScopes(text: string): NamespaceScope[] | null {
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
      if (line === "}" && runningScope === true) {
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

  static parseNamespaceScopes(text: string): FunctionScope[] | null {
    const namespaces = CairoParser.getNamespaceScopes(text);
    var namespaceScopes: FunctionScope[] = [];
    if (namespaces) {
      for (var namespace of namespaces) {
        const namespaceText = namespace.text;
        const namespaceName = namespace.namespace;
        const matches = this.parseFunctionScope(namespaceText!, "function");
        if (matches) {
          for (var match of matches) {
            const functionScope = {
              text: `@${namespaceName}\n${match.text}`,
              start: namespace.start! + match.start,
              startLine: text.substring(0, namespace.start! + match.start).split("\n").length,
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

  static parseFunctionScope(
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
        startLine: text.substring(0, startIndex).split("\n").length,
        end: startIndex + match[0].length,
      };
      functionScopes.push(functionScope);
    }

    if (functionScopes.length > 0) {
      return functionScopes;
    }
    return null;
  }

  // parse only commented lines
  // run this after parsing the whole scope using parseFunctionScope
  static parseCommentLines(
    scope: FunctionScope,
    isNamespace: boolean = false,
    text?: string
  ): FunctionCommentScope | null {
    const regexp = this.getRegex("comment");
    const commentLinesText = scope.text.match(regexp);

    if (scope && commentLinesText) {
      const scopeLineStart = scope.start;
      const scopeText =
        isNamespace === true
          ? scope.text
            .split("\n")
            .slice(1, scope.text.split("\n").length) // remove the amended line `@namespace name` when parsing comment lines
            .join("\n")
          : scope.text;

      const commentLines = [...scopeText.matchAll(regexp)];
      const commentLineStart = scopeLineStart! + commentLines[0].index!;

      const commentLineEnd =
        scopeLineStart! +
        commentLines[commentLines.length - 1].index! +
        commentLines[commentLines.length - 1][0].length;

      const commentLineRange = {
        text: commentLinesText,
        start: commentLineStart,
        end: commentLineEnd,
      };
      return commentLineRange;
    }
    return null;
  }


  static getScopeParsingResult(
    text: string,
    name: string
  ): ParsingResult[] | null {
    const functionScopes =
      name === "namespace"
        ? CairoParser.parseNamespaceScopes(text)
        : CairoParser.parseFunctionScope(text, name);

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    var parsingOutputs = [];

    // parse comment lines
    if (functionScopes) {
      for (var functionScope of functionScopes) {
        const commentLines =
          name === "namespace"
            ? CairoParser.parseCommentLines(functionScope, true)
            : CairoParser.parseCommentLines(functionScope, false);
        const functionCommentText = commentLines
          ? commentLines.text.join("")
          : null;

        const functionCommentDescParser = new FunctionCommentDescParser(
          functionCommentText
        );
        const functionCommentImplicitArgsParser =
          new FunctionCommentImplicitArgsParser(functionCommentText);
        const functionCommentExplicitArgsParser =
          new FunctionCommentExplicitArgsParser(functionCommentText);
        const functionCommentReturnsParser = new FunctionCommentReturnsParser(
          functionCommentText
        );
        const functionCommentRaisesParser = new FunctionCommentRaisesParser(
          functionCommentText
        );

        const functionCommentScope = commentLines ? commentLines.text : null;
        const functionCommentCharIndexStart = commentLines
          ? commentLines.start
          : 0;
        const functionCommentCharIndexEnd = commentLines ? commentLines.end : 0;

        const isNamespaceScope = name === "namespace" ? true : false;

        const parsingOutput = {
          attributeName: functionSignatureParser.getAttributeName(
            functionScope!.text
          ),
          functionName: {
            name: functionSignatureParser.getFunctionName(functionScope!.text),
            charIndex: functionSignatureParser.getFunctionNameCharIndex(
              functionScope,
              isNamespaceScope
            ),
          },
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
              functionCommentScope
            ),
            implicitArgs:
              functionCommentImplicitArgsParser.parseCommentLines(
                functionCommentScope
              ),
            explicitArgs:
              functionCommentExplicitArgsParser.parseCommentLines(
                functionCommentScope
              ),
            returns:
              functionCommentReturnsParser.parseCommentLines(
                functionCommentScope
              ),
            raises:
              functionCommentRaisesParser.parseCommentLines(
                functionCommentScope
              ),
            charIndex: {
              start: functionCommentCharIndexStart,
              end: functionCommentCharIndexEnd,
            },
          },
        };

        parsingOutputs.push(parsingOutput);
      }

      return parsingOutputs;
    }
    return null;
  }

  static getFileParsingResult(
    filePathOrBuffer: string,
    isFilePath: boolean = true
  ): ParsingResult[] | null {
    const text =
      isFilePath === true
        ? fs.readFileSync(filePathOrBuffer, "utf8")
        : filePathOrBuffer;
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

  protected static _isValidFunctionComment(
    functionSignature: FunctionSignature[] | null,
    functionComment: FunctionComment[] | null
  ): boolean {
    if (functionSignature === null || functionComment === null) {
      const isCommentValid = lodash.isEqual(
        functionSignature,
        functionComment
      );
      return isCommentValid;
    } else {
      const isCommentValid = lodash.isEqual(
        functionSignature,
        functionComment?.map((obj) => ({name: obj.name, type: obj.type}))
      );
      return isCommentValid;
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

    return {isValid: false, errorSource: errorSource};
  }

  static dumpParsingResult(
    parsingResult: ParsingResult[] | null,
    outPath: string,
    dumpCommentOnly: boolean = false
  ): void {

    // if outPath contains .cairo extension, remove it
    const outFile = outPath.endsWith(".cairo") ? outPath = outPath.slice(0, -6) : outPath;

    if (dumpCommentOnly === true) {
      const commentOnlyParsingResult = parsingResult?.map((obj) => ({
        attributeName: obj.attributeName,
        functionName: obj.functionName,
        functionComment: obj.functionComment,
      }));
      fs.writeFileSync(`${outFile}.yaml`, yaml.dump(commentOnlyParsingResult));
    } else {
      fs.writeFileSync(`${outFile}.yaml`, yaml.dump(parsingResult));
    }
  }
}

export class CairoNatspecParser extends CairoParser {
  // parse only commented lines on top of a function declaration
  // run this after parsing the whole scope using parseFunctionScope
  static parseCommentLines(
    scope: FunctionScope,
    isNamespace: boolean = false,
    text: string
  ): FunctionCommentScope | null {
    const regexp = this.getRegex("comment");

    const lines = text.split("\n");

    const natspecDocLines = []
    for (let i = scope.startLine - 1; i >= 0; i--) {
      if (lines[i].startsWith("@")) {
        // Natspec documentation comes one line above the function decorator, if there's one.
        i--;
      }
      const line = lines[i];
      if (line.match(regexp)) {
        natspecDocLines.push(line);
      } else {
        break;
      }
    }
    const commentLines = natspecDocLines.reverse().join("\n");
    const commentLinesText = commentLines.match(regexp);
    const commentLinesEnd = scope.start - 1;
    const commentLinesStart = commentLinesEnd - commentLines.length;


    if (scope && commentLinesText) {
      const commentLineRange = {
        text: commentLinesText,
        start: commentLinesStart,
        end: commentLinesEnd,
      }

      return commentLineRange;
    }
    return null;
  }

  static getScopeParsingResult(
    text: string,
    name: string
  ): ParsingResult[] | null {
    const functionScopes =
      name === "namespace"
        ? CairoParser.parseNamespaceScopes(text)
        : CairoParser.parseFunctionScope(text, name);

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    var parsingOutputs = [];

    // parse comment lines
    if (functionScopes) {
      for (var functionScope of functionScopes) {
        const commentLines = CairoNatspecParser.parseCommentLines(functionScope, false, text)
        const natspecFunctionCommentText = commentLines
          ? commentLines.text.join("")
          : null;

        const nastpecFunctionCommentNoticeParser = new NatspecCommentNoticeParser(
          natspecFunctionCommentText
        );

        const nastpecFunctionCommentParamsParser = new NatspecCommentParamsParser(
          natspecFunctionCommentText
        );
        const natspecFunctionCommentReturnsParser = new NatspecCommentReturnsParser(
          natspecFunctionCommentText
        );

        // TODO @custom tag

        const functionCommentScope = commentLines ? commentLines.text : null;

        const functionCommentCharIndexStart = commentLines
          ? commentLines.start
          : 0;
        const functionCommentCharIndexEnd = commentLines ? commentLines.end : 0;

        const isNamespaceScope = name === "namespace" ? true : false;

        const parsingOutput = {
          attributeName: functionSignatureParser.getAttributeName(
            functionScope!.text
          ),
          functionName: {
            name: functionSignatureParser.getFunctionName(functionScope!.text),
            charIndex: functionSignatureParser.getFunctionNameCharIndex(
              functionScope,
              isNamespaceScope
            ),
          },
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
            desc: nastpecFunctionCommentNoticeParser.parseCommentLines(functionCommentScope),
            implicitArgs:null,
            explicitArgs:
              nastpecFunctionCommentParamsParser.parseCommentLines(functionCommentScope),
            returns:
              natspecFunctionCommentReturnsParser.parseCommentLines(functionCommentScope),
            raises: null,
            charIndex: {
              start: functionCommentCharIndexStart,
              end: functionCommentCharIndexEnd,
            },
          },
        };

        parsingOutputs.push(parsingOutput);
      }

      return parsingOutputs;
    }
    return null;
  }

  static getFileParsingResult(
    filePathOrBuffer: string,
    isFilePath: boolean = true
  ): ParsingResult[] | null {
    const text =
      isFilePath === true
        ? fs.readFileSync(filePathOrBuffer, "utf8")
        : filePathOrBuffer;
    const constructorParsingResult = CairoNatspecParser.getScopeParsingResult(
      text,
      "constructor"
    );
    const viewParsingResult = CairoNatspecParser.getScopeParsingResult(text, "view");
    const externalParsingResult = CairoNatspecParser.getScopeParsingResult(
      text,
      "external"
    );

    const eventParsingResult = CairoNatspecParser.getScopeParsingResult(text, "event");

    const storageVarParsingResult = CairoNatspecParser.getScopeParsingResult(
      text,
      "storage_var"
    );

    const namespaceParsingResult = CairoNatspecParser.getScopeParsingResult(
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

  /**
   * Here, we don't check for implicit arguments
   * @param parsingResult
   */
  static isValidFunctionComment(
    parsingResult: ParsingResult
  ): FunctionCommentValidity {
    const functionSignature = parsingResult.functionSignature;
    const functionComment = parsingResult.functionComment;

    var errorSource: string[] = [];

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

    return {isValid: false, errorSource: errorSource};
  }

  /**
   * We don't check comment type.
   * @param functionSignature
   * @param functionComment
   * @protected
   */
  protected static _isValidFunctionComment(
    functionSignature: FunctionSignature[] | null,
    functionComment: FunctionComment[] | null
  ): boolean {
    if (functionSignature === null || functionComment === null) {
      const isCommentValid = lodash.isEqual(
        functionSignature,
        functionComment
      );
      return isCommentValid;
    } else {
      const isCommentValid = lodash.isEqual(
        functionSignature?.map((obj) => ({name: obj.name})),
        functionComment?.map((obj) => ({name: obj.name}))
      );
      return isCommentValid;
    }

    return true;
  }
}