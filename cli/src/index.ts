#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");

import { exit } from "process";
import CLI from "../../core/lib/CLI";

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
  .option("--standard [standard]", "documentation standard")
  .option("--comment", "dump comment only")
  .action((rootdir: string, outdir: string, options: any) => {
    const cli = new CLI(rootdir);
    const commentOnly = options.comment ? true : false;
    const validStandards = ["kaaper","natspec"]
    const standard = options.standard ? options.standard : "kaaper";
    if (!validStandards.includes(standard)) {
      console.log(chalk.red(`Invalid standard: ${standard}`));
      exit(1);
    }
    cli.generateContractsDocs(outdir, commentOnly,standard);
    console.log("documents generated at:", outdir);
  });

program
  .command("check-compliance")
  .description("Check comment compliance of contracts")
  .argument("<rootdir>", "root directory of contracts")
  .action((rootdir: string) => {
    const cli = new CLI(rootdir);
    const result = cli.getNonCompliantCommentFunction();
    if (result !== null) {
      console.log("comment not compliant, check the following functions:");
      console.log(result);
      exit(1);
    }
    console.log("comment compliant");
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
