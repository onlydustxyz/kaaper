import * as path from "path";
import * as fs from "fs";
import * as assert from "assert";
import CairoParser from "../../../lib/CairoParser";
import { Console } from "console";

suite("parseCommentLines Using Match All", () => {
  test("Namespace: 0 ", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 0;
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopesWithMatchAll(text);
    const functionScope = functionScopes![scopeNumber];

    const functionComment = CairoParser.parseCommentLinesWithMatchAll(
      functionScope,
      true
    );
    const start = functionComment!.start;
    const end = functionComment!.end;

    var functionCommentText = "";
    for (let i = start; i < end; i++) {
      functionCommentText += text.at(i);
    }
    assert.equal([...functionComment!.text].join(""), functionCommentText);
  });

  test("Namespace: 1 ", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 1;
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopesWithMatchAll(text);
    const functionScope = functionScopes![scopeNumber];

    const functionComment = CairoParser.parseCommentLinesWithMatchAll(
      functionScope,
      true
    );
    const start = functionComment!.start;
    const end = functionComment!.end;

    var functionCommentText = "";
    for (let i = start; i < end; i++) {
      functionCommentText += text.at(i);
    }
    assert.equal([...functionComment!.text].join(""), functionCommentText);
  });
});
