import * as assert from "assert";
import * as path from "path";
import CLI from "../../lib/cli";

suite("generateContractsDocs", () => {
  test("without comment", () => {
    const cli = new CLI("testAssets")

    cli.generateContractsDocs("docs/ERC20/", false);
  });

  test("library", () => {})
    
});
