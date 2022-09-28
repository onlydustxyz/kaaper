import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";

import CairoParser from "../../../../../../core/lib/CairoParser";
import {
  yieldFunctionCommentPartsFromCharIndex,
  yieldWholeFunctionCommentStringFromCharIndex,
} from "./utils";

suite("getScopeParsingResult: event", () => {
  test("should get `2` for the length of function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "event");
    assert.equal(functionScopes!.length, 2, "failed to parse");

    const resultScope = CairoParser.getScopeParsingResult(text, "event");
    assert.equal(resultScope!.length, 2);
  });
  test("should get `Transfer` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "event");

    const scopeNumber = 0;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "event",
        functionName: {
          name: "Transfer",
          charIndex: { start: 645, end: 653 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: [
            { name: "from_", type: "felt" },
            { name: "to", type: "felt" },
            { name: "value", type: "Uint256" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Emit event when a transfer is made",
              charIndex: { start: 23, end: 57 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "from_",
              type: "felt",
              desc: "The address of the sender",
              charIndex: { start: 89, end: 127 },
            },
            {
              name: "to",
              type: "felt",
              desc: "The address of the receiver",
              charIndex: { start: 137, end: 174 },
            },
            {
              name: "value",
              type: "Uint256",
              desc: "The amount of tokens transferred",
              charIndex: { start: 184, end: 232 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 694, end: 926 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "event")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Emit event when a transfer is made" },
      { explicitArgs: "from_(felt): The address of the sender" },
      { explicitArgs: "to(felt): The address of the receiver" },
      { explicitArgs: "value(Uint256): The amount of tokens transferred" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Emit event when a transfer is made
    // Explicit args:
    //   from_(felt): The address of the sender
    //   to(felt): The address of the receiver
    //   value(Uint256): The amount of tokens transferred`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });
  test("should get `Approval` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "event");

    // parse comment lines
    const scopeNumber = 1;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "event",
        functionName: {
          name: "Approval",
          charIndex: { start: 942, end: 950 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: [
            { name: "owner", type: "felt" },
            { name: "spender", type: "felt" },
            { name: "value", type: "Uint256" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Emit event when a delegation is made",
              charIndex: { start: 22, end: 58 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "the address of the owner",
              charIndex: { start: 90, end: 127 },
            },
            {
              name: "spender",
              type: "felt",
              desc: "the address of the spender",
              charIndex: { start: 137, end: 178 },
            },
            {
              name: "value",
              type: "Uint256",
              desc: "the amount of tokens approved for the spender",
              charIndex: { start: 188, end: 249 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 996, end: 1245 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "event")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Emit event when a delegation is made" },
      { explicitArgs: "owner(felt): the address of the owner" },
      { explicitArgs: "spender(felt): the address of the spender" },
      {
        explicitArgs:
          "value(Uint256): the amount of tokens approved for the spender",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //  Emit event when a delegation is made
    // Explicit args:
    //   owner(felt): the address of the owner
    //   spender(felt): the address of the spender
    //   value(Uint256): the amount of tokens approved for the spender`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });
});
