import * as path from "path";
import * as fs from "fs";
import * as assert from "assert";
import {CairoNatspecParser} from "../../../../../../core/lib/CairoParser";

suite("parseNamespaceScopes", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../testContracts/ERC20Natspec/library.cairo"
  );
  test("scopeNumber: 0", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 0;
    // parse whole scope
    const parsingOutput = CairoNatspecParser.parseNamespaceScopes(text);
    assert.equal(
      "@namespace ERC20",
      parsingOutput![scopeNumber].text.split("\n")[0]
    );
  });
  test("scopeNumber: 1", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 1;
    // parse whole scope
    const parsingOutput = CairoNatspecParser.parseNamespaceScopes(text);
    assert.equal(
      "@namespace ERC20",
      parsingOutput![scopeNumber].text.split("\n")[0]
    );
  });
  test("scopeNumber: 2", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 2;
    // parse whole scope
    const parsingOutput = CairoNatspecParser.parseNamespaceScopes(text);
    assert.equal(
      "@namespace ERC20",
      parsingOutput![scopeNumber].text.split("\n")[0]
    );
  });
  test("scopeNumber: 3", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 3;
    // parse whole scope
    const parsingOutput = CairoNatspecParser.parseNamespaceScopes(text);
    assert.equal(
      "@namespace internal",
      parsingOutput![scopeNumber].text.split("\n")[0]
    );
  });

  test("scopeNumber: 4", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 4;
    // parse whole scope
    const parsingOutput = CairoNatspecParser.parseNamespaceScopes(text);
    assert.equal(
      "@namespace internal",
      parsingOutput![scopeNumber].text.split("\n")[0]
    );
  });

  test("array length should be 5", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    const parsingOutput = CairoNatspecParser.parseNamespaceScopes(text);
    assert.equal(5, parsingOutput!.length);
  });
});
