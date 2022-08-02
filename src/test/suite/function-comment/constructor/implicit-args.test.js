"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const path = require("path");
const fs = require("fs");
const implicit_args_1 = require("../../../../lib/parser/function-comment/implicit-args");
const CairoParser_1 = require("../../../../lib/CairoParser");
suite("function-comment: constructor: implicit-args", () => {
    test("parse line 2", () => {
        const pathFile = path.resolve(__dirname, "../../../../../testContracts/ERC20Compliant/ERC20.cairo");
        const text = fs.readFileSync(pathFile, "utf8");
        const functionScopes = CairoParser_1.default.parseFunctionScope(text, "constructor");
        const functionScope = functionScopes[0];
        const functionCommentScope = CairoParser_1.default.parseCommentLines(functionScope).text;
        const functionCommentText = functionCommentScope.join("");
        const implicitArgsParser = new implicit_args_1.default(functionCommentText);
        const line = 2;
        assert.equal("# Implicit args:", functionCommentScope[line].trim(), `check line ${line}`);
        implicitArgsParser.setStartScope(functionCommentScope[line]);
        assert.equal(functionCommentScope[line], implicitArgsParser.startLine);
        const resultLineParsing = implicitArgsParser.parseCommentLine(functionCommentScope[line]);
        const isEndScope = implicitArgsParser.isEndScope(functionCommentScope[line]);
        assert.equal(true, implicitArgsParser.runningScope, `failed to get running scope line ${line}`);
        assert.equal(false, isEndScope, `failed to get end scope line ${line}`);
        assert.equal(null, resultLineParsing, `failed to get resultLineParsing line ${line}`);
    });
    test("parse line 3", () => {
        const pathFile = path.resolve(__dirname, "../../../../../testContracts/ERC20Compliant/ERC20.cairo");
        const text = fs.readFileSync(pathFile, "utf8");
        const functionScopes = CairoParser_1.default.parseFunctionScope(text, "constructor");
        const functionCommentScope = CairoParser_1.default.parseCommentLines(functionScopes[0]);
        const functionCommentText = functionCommentScope.text.join("");
        const implicitArgsParser = new implicit_args_1.default(functionCommentText);
        implicitArgsParser.setStartScope(functionCommentScope.text[2]);
        const line = 3;
        const functionCommentLine = functionCommentScope.text[line];
        assert.equal("#   syscall_ptr(felt*)", functionCommentLine.trim(), `check line ${line}`);
        assert.notEqual(functionCommentLine, implicitArgsParser.startLine);
        assert.equal(true, implicitArgsParser.runningScope, `failed to get running scope line ${line}`);
        const resultLineParsing = implicitArgsParser.parseCommentLine(functionCommentLine);
        const targetLineParsing = {
            name: "syscall_ptr",
            type: "felt*",
            desc: "",
            charIndex: { start: 74, end: 92 },
        };
        assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
        assert.equal(false, implicitArgsParser.isEndScope(functionCommentLine), `failed to get end scope line ${line}`);
        var functionCommentReference = "";
        const explicitArgsCommentStart = resultLineParsing.charIndex.start;
        const explicitArgsCommentEnd = resultLineParsing.charIndex.end;
        for (var i = explicitArgsCommentStart; i < explicitArgsCommentEnd; i++) {
            functionCommentReference += functionCommentText[i];
        }
        var wholeFileReference = "";
        const functionCommentStart = functionCommentScope.start;
        for (var i = functionCommentStart + explicitArgsCommentStart; i < functionCommentStart + explicitArgsCommentEnd; i++) {
            wholeFileReference += text[i];
        }
        assert.equal(functionCommentReference, wholeFileReference);
    });
    test("parse line 4", () => {
        const pathFile = path.resolve(__dirname, "../../../../../testContracts/ERC20Compliant/ERC20.cairo");
        const text = fs.readFileSync(pathFile, "utf8");
        const functionScopes = CairoParser_1.default.parseFunctionScope(text, "constructor");
        const functionCommentScope = CairoParser_1.default.parseCommentLines(functionScopes[0]);
        const functionCommentText = functionCommentScope.text.join("");
        const implicitArgsParser = new implicit_args_1.default(functionCommentText);
        implicitArgsParser.setStartScope(functionCommentScope.text[2]);
        const line = 4;
        const functionCommentLine = functionCommentScope.text[line];
        assert.equal("#   pedersen_ptr(HashBuiltin*)", functionCommentLine.trim(), `check line ${line}`);
        assert.notEqual(functionCommentLine, implicitArgsParser.startLine);
        assert.equal(true, implicitArgsParser.runningScope, `failed to get running scope line ${line}`);
        const resultLineParsing = implicitArgsParser.parseCommentLine(functionCommentLine);
        const targetLineParsing = {
            name: "pedersen_ptr",
            type: "HashBuiltin*",
            desc: "",
            charIndex: { start: 101, end: 127 },
        };
        assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
        assert.equal(false, implicitArgsParser.isEndScope(functionCommentLine), `failed to get end scope line ${line}`);
        var functionCommentReference = "";
        const explicitArgsCommentStart = resultLineParsing.charIndex.start;
        const explicitArgsCommentEnd = resultLineParsing.charIndex.end;
        for (var i = explicitArgsCommentStart; i < explicitArgsCommentEnd; i++) {
            functionCommentReference += functionCommentText[i];
        }
        var wholeFileReference = "";
        const functionCommentStart = functionCommentScope.start;
        for (var i = functionCommentStart + explicitArgsCommentStart; i < functionCommentStart + explicitArgsCommentEnd; i++) {
            wholeFileReference += text[i];
        }
        assert.equal(functionCommentReference, wholeFileReference);
    });
    test("parse line 5", () => {
        const pathFile = path.resolve(__dirname, "../../../../../testContracts/ERC20Compliant/ERC20.cairo");
        const text = fs.readFileSync(pathFile, "utf8");
        const functionScopes = CairoParser_1.default.parseFunctionScope(text, "constructor");
        const functionCommentScope = CairoParser_1.default.parseCommentLines(functionScopes[0]);
        const functionCommentText = functionCommentScope.text.join("");
        const implicitArgsParser = new implicit_args_1.default(functionCommentText);
        implicitArgsParser.setStartScope(functionCommentScope.text[2]);
        const line = 5;
        const functionCommentLine = functionCommentScope.text[line];
        assert.equal("#   range_check_ptr", functionCommentLine.trim(), `check line ${line}`);
        assert.notEqual(functionCommentLine, implicitArgsParser.startLine);
        assert.equal(true, implicitArgsParser.runningScope, `failed to get running scope line ${line}`);
        const resultLineParsing = implicitArgsParser.parseCommentLine(functionCommentLine);
        const targetLineParsing = {
            name: "range_check_ptr",
            type: "",
            desc: "",
            charIndex: { start: 136, end: 151 },
        };
        assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
        assert.equal(false, implicitArgsParser.isEndScope(functionCommentLine), `failed to get end scope line ${line}`);
        var functionCommentReference = "";
        const explicitArgsCommentStart = resultLineParsing.charIndex.start;
        const explicitArgsCommentEnd = resultLineParsing.charIndex.end;
        for (var i = explicitArgsCommentStart; i < explicitArgsCommentEnd; i++) {
            functionCommentReference += functionCommentText[i];
        }
        var wholeFileReference = "";
        const functionCommentStart = functionCommentScope.start;
        for (var i = functionCommentStart + explicitArgsCommentStart; i < functionCommentStart + explicitArgsCommentEnd; i++) {
            wholeFileReference += text[i];
        }
        assert.equal(functionCommentReference, wholeFileReference);
    });
    test("parse line 6", () => {
        const pathFile = path.resolve(__dirname, "../../../../../testContracts/ERC20Compliant/ERC20.cairo");
        const text = fs.readFileSync(pathFile, "utf8");
        const functionScopes = CairoParser_1.default.parseFunctionScope(text, "constructor");
        const functionCommentScope = CairoParser_1.default.parseCommentLines(functionScopes[0]);
        const functionCommentText = functionCommentScope.text.join("");
        const implicitArgsParser = new implicit_args_1.default(functionCommentText);
        implicitArgsParser.setStartScope(functionCommentScope.text[2]);
        const line = 6;
        const functionCommentLine = functionCommentScope.text[line];
        assert.equal(false, implicitArgsParser.isStartScope(functionCommentLine), `check line ${line}`);
        assert.equal(true, implicitArgsParser.isEndScope(functionCommentLine), `failed to get end scope line ${line}`);
        assert.equal("# Explicit args:", functionCommentLine.trim(), `check line ${line}`);
        assert.notEqual(functionCommentLine, implicitArgsParser.startLine);
        implicitArgsParser.setEndScope(functionCommentLine);
        assert.equal(false, implicitArgsParser.runningScope, `failed to get running scope line ${line}`);
        const resultLineParsing = implicitArgsParser.parseCommentLine(functionCommentLine);
        assert.deepEqual(null, resultLineParsing, `failed to get resultLineParsing line ${line}`);
    });
    test("parse whole scope", () => {
        const pathFile = path.resolve(__dirname, "../../../../../testContracts/ERC20Compliant/ERC20.cairo");
        const text = fs.readFileSync(pathFile, "utf8");
        const functionScopes = CairoParser_1.default.parseFunctionScope(text, "constructor");
        const functionCommentScope = CairoParser_1.default.parseCommentLines(functionScopes[0]);
        const functionCommentText = functionCommentScope.text.join("");
        const implicitArgsParser = new implicit_args_1.default(functionCommentText);
        const targetLineParsing = [
            {
                name: "syscall_ptr",
                type: "felt*",
                desc: "",
                charIndex: { start: 74, end: 92 },
            },
            {
                name: "pedersen_ptr",
                type: "HashBuiltin*",
                desc: "",
                charIndex: { start: 101, end: 127 },
            },
            {
                name: "range_check_ptr",
                type: "",
                desc: "",
                charIndex: { start: 136, end: 151 },
            },
        ];
        const resultLineParsing = implicitArgsParser.parseCommentLines(functionCommentScope.text);
        assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing on whole scope`);
    });
});
//# sourceMappingURL=implicit-args.test.js.map