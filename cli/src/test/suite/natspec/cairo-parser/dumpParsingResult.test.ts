import * as path from "path";
import * as fs from "fs";
import * as assert from "assert";
import {CairoNatspecParser} from "../../../../../../core/lib/CairoParser";

suite("Natspec - dumpParsingResult", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  test("ERC20: should dump all", () => {


    const parsingOutput = CairoNatspecParser.getFileParsingResult(pathFile);
    console.log(parsingOutput![0].functionComment)

    CairoNatspecParser.dumpParsingResult(parsingOutput, "docs/Natspec/ERC20");

    const generatedYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../../docs/Natspec/ERC20.yaml"), "utf8");
    const targetYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../../testGeneratedDocs/Natspec/ERC20.yaml"), "utf8");
    assert.equal(generatedYAMLFile, targetYAMLFile);
  });

  test("ERC20: should dump comment only", () => {
    // parse whole scope
    const parsingOutput = CairoNatspecParser.getFileParsingResult(pathFile);

    CairoNatspecParser.dumpParsingResult(
      parsingOutput,
      "docs/Natspec/comment_only/ERC20",
      true
    );
    // read yaml file
    const generatedYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../../docs/Natspec/comment_only/ERC20.yaml"), "utf8");
    const targetYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../../testGeneratedDocs/Natspec/comment_only/ERC20.yaml"), "utf8");
    assert.equal(generatedYAMLFile, targetYAMLFile);
  });

  // TODO parse libraries
  // test("library: should dump all", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../../testContracts/ERC20Compliant/library.cairo"
  //   );
  //
  //   // parse whole scope
  //   const parsingOutput = CairoNatspecParser.getFileParsingResult(pathFile);
  //
  //   CairoNatspecParser.dumpParsingResult(parsingOutput, "docs/library-test");
  //   const generatedYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../docs/library-test.yaml"), "utf8");
  //   const targetYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../testGeneratedDocs/library.yaml"), "utf8");
  //   assert.equal(generatedYAMLFile, targetYAMLFile);
  // });
  //
  // test("library: should comment only", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../../testContracts/ERC20Compliant/library.cairo"
  //   );
  //
  //   // parse whole scope
  //   const parsingOutput = CairoNatspecParser.getFileParsingResult(pathFile);
  //
  //   CairoNatspecParser.dumpParsingResult(
  //     parsingOutput,
  //     "docs/library_comment_only",
  //     true
  //   );
  //
  //   const generatedYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../docs/library_comment_only.yaml"), "utf8");
  //   const targetYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../testGeneratedDocs/library_comment_only.yaml"), "utf8");
  //   assert.equal(generatedYAMLFile, targetYAMLFile);
  // });
  //
  // test("should not get any comments in from library.cairo", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../../testContracts/emptyComment/library.cairo"
  //   );
  //
  //   // parse whole scope
  //   const parsingOutput = CairoNatspecParser.getFileParsingResult(pathFile);
  //
  //   CairoNatspecParser.dumpParsingResult(parsingOutput, "docs/library");
  //   CairoNatspecParser.dumpParsingResult(
  //     parsingOutput,
  //     "docs/library_without_comment",
  //     true
  //   );
  //   const generatedYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../docs/library_without_comment.yaml"), "utf8");
  //   const targetYAMLFile = fs.readFileSync(path.resolve(__dirname, "../../../../../../testGeneratedDocs/library_without_comment.yaml"), "utf8");
  //   assert.equal(generatedYAMLFile, targetYAMLFile);
  // });
});
