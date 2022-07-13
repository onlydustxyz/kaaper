import * as assert from "assert";
import * as path from "path";
import CLI from "../../lib/cli";

suite("generateContractsDocs", () => {
  test("dump all", () => {
    const cli = new CLI("testAssets")

    cli.generateContractsDocs("docs/ERC20/", false);
  });

  test("only comment", () => {
    const cli = new CLI("testAssets")

    cli.generateContractsDocs("docs/ERC20_comment_only/", true);
  });
    
});
