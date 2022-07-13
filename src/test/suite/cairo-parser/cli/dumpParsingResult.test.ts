import * as assert from "assert";
import * as path from "path";
import CairoParser from "../../../../lib/CairoParser";
import CLI from "../../../../lib/cli";

suite("dumpParsingResult", () => {
  test("ERC20", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testAssets/ERC20.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    CLI.dumpParsingResult(parsingOutput, "docs/ERC20");
    CLI.dumpParsingResult(parsingOutput, "docs/ERC20_comment_only", true);
  });

  test("library", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testAssets/library.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    CLI.dumpParsingResult(parsingOutput, "docs/library");
    CLI.dumpParsingResult(parsingOutput, "docs/library_comment_only", true);
  });

  test("library", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testAssets/library.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    CairoParser.dumpParsingResult(parsingOutput, "docs/library");
    CairoParser.dumpParsingResult(parsingOutput, "docs/library_comment_only", true);
  });
});
