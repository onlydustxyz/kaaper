import * as path from "path";
import * as fs from "fs";
import * as assert from "assert";
import CairoParser from "../../../lib/CairoParser";

suite("parseCommentLines: emptyComment/library.cairo", () => {
  test("Should get null for the function comment in `_mint`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/emptyComment/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 0;
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);
    const functionScope = functionScopes![scopeNumber];

    const functionComment = CairoParser.parseCommentLines(functionScope, true);

    assert(functionComment === null);
  });
});
