import * as path from "path";
import * as fs from "fs";
import * as assert from "assert";
import CairoParser from "../../../lib/CairoParser";

suite("parseNamespaceScopes", () => {
  test("scopeNumber: 0", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 0;
    // parse whole scope
    const parsingOutput = CairoParser.parseNamespaceScopes(text);
    assert.equal(
      "@namespace ERC20",
      parsingOutput![scopeNumber].split("\n")[0]
    );
  });
  test("scopeNumber: 1", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 1;
    // parse whole scope
    const parsingOutput = CairoParser.parseNamespaceScopes(text);
    assert.equal(
      "@namespace ERC20",
      parsingOutput![scopeNumber].split("\n")[0]
    );
  });
  test("scopeNumber: 2", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 2;
    // parse whole scope
    const parsingOutput = CairoParser.parseNamespaceScopes(text);
    assert.equal(
      "@namespace ERC20",
      parsingOutput![scopeNumber].split("\n")[0]
    );
  });
  test("scopeNumber: 3", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 3;
    // parse whole scope
    const parsingOutput = CairoParser.parseNamespaceScopes(text);
    assert.equal(
      "@namespace internal",
      parsingOutput![scopeNumber].split("\n")[0]
    );
  });

  test("scopeNumber: 4", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 4;
    // parse whole scope
    const parsingOutput = CairoParser.parseNamespaceScopes(text);
    assert.equal(
      "@namespace internal",
      parsingOutput![scopeNumber].split("\n")[0]
    );
  });
});
