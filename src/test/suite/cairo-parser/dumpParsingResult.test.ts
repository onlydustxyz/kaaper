import * as path from "path";
import * as assert from "assert";
import * as fs from "fs";
import CairoParser from "../../../lib/CairoParser";

suite("dumpParsingResult", () => {
  test("ERC20: should dump all", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );

    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    CairoParser.dumpParsingResult(parsingOutput, "docs/ERC20");

    const generatedYAMLFile = fs.readFileSync(
      path.resolve(__dirname, "../../../../docs/ERC20.yaml"),
      "utf8"
    );
    const targetYAMLFile = fs.readFileSync(
      path.resolve(__dirname, "../../../../testGeneratedDocs/ERC20.yaml"),
      "utf8"
    );
    assert.equal(generatedYAMLFile, targetYAMLFile);
  });

  test("ERC20: should dump comment only", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    CairoParser.dumpParsingResult(
      parsingOutput,
      "docs/ERC20_comment_only",
      true
    );
    // read yaml file
    const generatedYAMLFile = fs.readFileSync(
      path.resolve(__dirname, "../../../../docs/ERC20_comment_only.yaml"),
      "utf8"
    );
    const targetYAMLFile = fs.readFileSync(
      path.resolve(
        __dirname,
        "../../../../testGeneratedDocs/ERC20_comment_only.yaml"
      ),
      "utf8"
    );
    assert.equal(generatedYAMLFile, targetYAMLFile);
  });

  test("library: should dump all", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    CairoParser.dumpParsingResult(parsingOutput, "docs/library");
    const generatedYAMLFile = fs.readFileSync(
      path.resolve(__dirname, "../../../../docs/library.yaml"),
      "utf8"
    );
    const targetYAMLFile = fs.readFileSync(
      path.resolve(__dirname, "../../../../testGeneratedDocs/library.yaml"),
      "utf8"
    );
    assert.equal(generatedYAMLFile, targetYAMLFile);
  });

  test("library: should comment only", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    CairoParser.dumpParsingResult(
      parsingOutput,
      "docs/library_comment_only",
      true
    );

    const generatedYAMLFile = fs.readFileSync(
      path.resolve(__dirname, "../../../../docs/library_comment_only.yaml"),
      "utf8"
    );
    const targetYAMLFile = fs.readFileSync(
      path.resolve(
        __dirname,
        "../../../../testGeneratedDocs/library_comment_only.yaml"
      ),
      "utf8"
    );
    assert.equal(generatedYAMLFile, targetYAMLFile);
  });

  test("should not get any comments in from library.cairo", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/emptyComment/library.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    CairoParser.dumpParsingResult(parsingOutput, "docs/library");
    CairoParser.dumpParsingResult(
      parsingOutput,
      "docs/library_without_comment",
      true
    );
    const generatedYAMLFile = fs.readFileSync(
      path.resolve(__dirname, "../../../../docs/library_without_comment.yaml"),
      "utf8"
    );
    const targetYAMLFile = fs.readFileSync(
      path.resolve(
        __dirname,
        "../../../../testGeneratedDocs/library_without_comment.yaml"
      ),
      "utf8"
    );
    assert.equal(generatedYAMLFile, targetYAMLFile);
  });
});
