#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");

import CLI from "./lib/cli";

clear();
console.log(chalk.red(figlet.textSync("kaaper", { horizontalLayout: "full" })));

program
  .name("kaaper")
  .description("CLI to help cairo developers")
  .version("0.0.2");

program
  .command("generate")
  .description("Generate contract docs")
  .argument("<rootdir>", "root directory of contracts")
  .argument(["outdir"], "output directory")
  .option("--comment", "dump comment only")
  .action((rootdir: string, outdir: string, options: any) => {
    const cli = new CLI(rootdir);
    const commentOnly = options.comment ? true : false;
    cli.generateContractsDocs(outdir, commentOnly);
    console.log("documents generated at:", outdir);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
