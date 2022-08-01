"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const path = require("path");
const fs = require("fs");
const desc_1 = require("../../../../lib/parser/function-comment/desc");
const CairoParser_1 = require("../../../../lib/CairoParser");
suite("function-comment: constructor: desc", () => {
    test("parse line 0", () => {
        const pathFile = path.resolve(__dirname, "../../../../../testContracts/ERC20Compliant/ERC20.cairo");
        const lineNumber = 0;
        const text = fs.readFileSync(pathFile, "utf8");
        const functionScopes = CairoParser_1.default.parseFunctionScope(text, "constructor");
        const functionScope = functionScopes[lineNumber];
        const functionCommentScope = CairoParser_1.default.parseCommentLines(functionScope);
        const functionCommentLine = functionCommentScope.text[lineNumber];
        const functionCommentText = functionCommentScope.text.join("");
        const descParser = new desc_1.default(functionCommentText);
        const functionCommentLines = descParser.parseCommentLines(functionCommentScope.text);
        assert.equal("# Desc:", functionCommentLine.trim(), `check line ${lineNumber}`);
        descParser.setStartScope(functionCommentLine);
        const functionCommentParsing = descParser.parseCommentLine(functionCommentLine);
        const isEndScope = descParser.isEndScope(functionCommentLine);
        assert.equal(true, descParser.runningScope, `failed to get running scope line ${lineNumber}`);
        assert.equal(false, isEndScope, `failed to get end scope line ${lineNumber}`);
        assert.equal(null, functionCommentParsing, `failed to get functionCommentParsing line ${lineNumber}`);
    });
    test("parse line 1", () => {
        const pathFile = path.resolve(__dirname, "../../../../../testContracts/ERC20Compliant/ERC20.cairo");
        const text = fs.readFileSync(pathFile, "utf8");
        const functionScopes = CairoParser_1.default.parseFunctionScope(text, "constructor");
        const functionScope = functionScopes[0];
        const functionCommentScope = CairoParser_1.default.parseCommentLines(functionScope);
        const lineNumber = 1;
        const functionCommentLine = functionCommentScope.text[lineNumber];
        const functionCommentText = functionCommentScope.text.join("");
        const descParser = new desc_1.default(functionCommentText);
        descParser.setStartScope(functionCommentScope.text[0]);
        assert.equal("#   Initialize the contract", functionCommentLine.trim(), `check line ${lineNumber}`);
        const isEndScope = descParser.isEndScope(functionCommentLine);
        assert.equal(true, descParser.runningScope, `failed to get running scope line ${lineNumber}`);
        assert.equal(false, isEndScope, `failed to get end scope line ${lineNumber}`);
        const functionCommentParsing = descParser.parseCommentLine(functionCommentLine);
        const targetLineParsing = {
            name: "",
            type: "",
            desc: "Initialize the contract",
            charIndex: {
                start: 21,
                end: 44,
            },
        };
        assert.deepEqual(targetLineParsing, functionCommentParsing, `failed to get functionCommentParsing line ${lineNumber}`);
        // this function wil check if the parsed comment line is correct
        // for instance
        // #   Initialize the contract have charIndex start at 21 and end at 44
        // function assertParsedCommentIsCorrect(targetString:string, functionCommentScope: FunctionCommentScope, functionCommentParsing:FunctionComment) {
        //   const functionCommentStart = functionCommentScope!.start;
        //   const descCommentStart = functionCommentParsing!.charIndex.start;
        //   const descCommentEnd = functionCommentParsing!.charIndex.end;
        //   var functionCommentReference = "";
        //   for (let i = descCommentStart; i < descCommentEnd; i++) {
        //     functionCommentReference += functionCommentText.at(i);
        //   }
        //   var wholeFileReference = "";
        //   for (
        //     let i = functionCommentStart + descCommentStart;
        //     i < functionCommentStart + descCommentEnd;
        //     i++
        //   ) {
        //     wholeFileReference += text.at(i);
        //   }
        //   assert.equal(
        //     functionCommentReference,
        //     wholeFileReference,
        //     "failed to get whole file reference"
        //   );
        //   assert.equal(wholeFileReference, targetLineParsing.desc);
        //   assert.equal("Initialize the contract", wholeFileReference);
        // }
    });
    test("parse line 2", () => {
        const pathFile = path.resolve(__dirname, "../../../../../testContracts/ERC20Compliant/ERC20.cairo");
        const text = fs.readFileSync(pathFile, "utf8");
        const functionScopes = CairoParser_1.default.parseFunctionScope(text, "constructor");
        const functionScope = functionScopes[0];
        const functionCommentScope = CairoParser_1.default.parseCommentLines(functionScope);
        const lineNumber = 2;
        const functionCommentLine = functionCommentScope.text[lineNumber];
        const functionCommentText = functionCommentScope.text.join("");
        const descParser = new desc_1.default(functionCommentText);
        descParser.setStartScope(functionCommentScope.text[0]);
        assert.equal("# Implicit args:", functionCommentLine.trim(), `check line ${lineNumber}`);
        assert.equal("\n    # Desc:", descParser.startLine);
        assert.notEqual(lineNumber, descParser.startLine);
        const isEndScope = descParser.isEndScope(functionCommentLine);
        assert.equal(true, isEndScope, `failed to get end scope line ${lineNumber}`);
        descParser.setEndScope(functionCommentLine);
        assert.equal(false, descParser.runningScope, `failed to get running scope line ${lineNumber}`);
        const functionCommentParsing = descParser.parseCommentLine(functionCommentLine);
        assert.deepEqual(null, functionCommentParsing, `failed to get functionCommentParsing line ${lineNumber}`);
    });
    test("parse whole comment", () => {
        const pathFile = path.resolve(__dirname, "../../../../../testContracts/ERC20Compliant/ERC20.cairo");
        const scopeNumber = 0;
        const text = fs.readFileSync(pathFile, "utf8");
        const functionScopes = CairoParser_1.default.parseFunctionScope(text, "constructor");
        const functionScope = functionScopes[scopeNumber];
        const functionCommentScope = CairoParser_1.default.parseCommentLines(functionScope);
        const functionCommentText = functionCommentScope.text.join("");
        const descParser = new desc_1.default(functionCommentText);
        const functionCommentParsing = descParser.parseCommentLines(functionCommentScope.text);
        const targetLineParsing = [
            {
                name: "",
                type: "",
                desc: "Initialize the contract",
                charIndex: { start: 21, end: 44 },
            },
        ];
        assert.deepEqual(targetLineParsing, functionCommentParsing, "failed to get functionCommentParsing");
    });
});
//# sourceMappingURL=desc.test.js.map