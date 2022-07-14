import CLI from "../../lib/cli";

suite("generateContractsDocs", () => {
  test("dump all", () => {
    const cli = new CLI("testContracts/");

    cli.generateContractsDocs("docs/all/", false);
  });

  test("only comment", () => {
    const cli = new CLI("testContracts/");

    cli.generateContractsDocs("docs/comment_only/", true);
  });
});
