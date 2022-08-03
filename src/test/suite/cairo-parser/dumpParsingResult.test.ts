import * as path from "path";
import CairoParser from "../../../lib/CairoParser";

suite("dumpParsingResult", () => {
  test("ERC20", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    CairoParser.dumpParsingResult(parsingOutput, "docs/ERC20");
    CairoParser.dumpParsingResult(
      parsingOutput,
      "docs/ERC20_comment_only",
      true
    );
  });

  test("library", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    CairoParser.dumpParsingResult(parsingOutput, "docs/library");
    CairoParser.dumpParsingResult(
      parsingOutput,
      "docs/library_comment_only",
      true
    );
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
  });
});
