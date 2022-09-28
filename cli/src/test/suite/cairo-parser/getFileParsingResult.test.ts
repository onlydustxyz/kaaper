import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser from "../../../../../core/lib/CairoParser";

suite("getFileParsingResult", () => {
  test("should get all parsing result in `ERC20.cairo`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);
    CairoParser.dumpParsingResult(parsingOutput, "docs/parse_erc20");

    const generatedYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../docs/parse_erc20.yaml"), "utf8");
    const targetYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../testGeneratedDocs/parse_erc20.yaml"), "utf8");
    assert.equal(generatedYAMLFile, targetYAMLFile, "failed parsing whole scope");



  });

  test("should get all parsing result in `library.cairo`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../testContracts/ERC20Compliant/library.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);
    CairoParser.dumpParsingResult(parsingOutput, "docs/parse_library");

    const generatedYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../docs/parse_library.yaml"), "utf8");
    const targetYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../testGeneratedDocs/parse_library.yaml"), "utf8");
    assert.equal(generatedYAMLFile, targetYAMLFile, "failed parsing whole scope");
  });
});
