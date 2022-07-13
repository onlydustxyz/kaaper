import CLI from "../../lib/cli";

suite("generateContractsDocs", () => {
  test("dump all", () => {
    const cli = new CLI("testContracts/ERC20Compliant");

    cli.generateContractsDocs("docs/ERC20/", false);
  });

  test("only comment", () => {
    const cli = new CLI("testContracts/ERC20Compliant");

    cli.generateContractsDocs("docs/ERC20_comment_only/", true);
  });
    
});
